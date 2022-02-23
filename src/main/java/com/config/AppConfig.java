package com.config;

import com.filter.GeneralFilter;
import com.filter.SessionFilter;
import com.interceptor.BaseInterceptor;
import com.util.FileDownload;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.xml.SourceHttpMessageConverter;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.BeanNameViewResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import javax.servlet.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

@Slf4j
@Configuration
@EnableWebMvc
@EnableAspectJAutoProxy(proxyTargetClass = true) // for AOP
public class AppConfig implements WebApplicationInitializer, SchedulingConfigurer, WebMvcConfigurer {

    @Override
    public void onStartup(ServletContext container) {
        log.info("WebInitializer : starting");

        // init properties
        container.setInitParameter("contextInitializerClasses", "com.config.PropertyConfig");

        // init dispatcher servlet
        ServletRegistration.Dynamic dispatcher = container.addServlet("dispatcher", new DispatcherServlet());
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/");
        dispatcher.setInitParameter("throwExceptionIfNoHandlerFound", "true");

        // for redirect http => https
//        HttpConstraintElement httpConstraintElement = new HttpConstraintElement(ServletSecurity.TransportGuarantee.CONFIDENTIAL);
//        ServletSecurityElement servletSecurityElement = new ServletSecurityElement(httpConstraintElement);
//        dispatcher.setServletSecurity(servletSecurityElement);

        // root config
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        container.addListener(new ContextLoaderListener(context));

        // 인코딩 필터 적용
        FilterRegistration.Dynamic charaterEncodingFilter = container.addFilter("charaterEncodingFilter", new CharacterEncodingFilter());
        charaterEncodingFilter.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");
        charaterEncodingFilter.setInitParameter("encoding", "UTF-8");
        charaterEncodingFilter.setInitParameter("forceEncoding", "true");

        FilterRegistration.Dynamic generalFilter = container.addFilter("generalFilter", new GeneralFilter()); // general filter 등록
        generalFilter.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "*.do");

        FilterRegistration.Dynamic sessionFilter = container.addFilter("sessionFilter", new SessionFilter()); // session filter 등록
        sessionFilter.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "*.do");

        container.addListener(new SessionConfig());
        log.info("WebInitializer : finished");
    }

    private final int POOL_SIZE = 5;

    @Override
    public void configureTasks(ScheduledTaskRegistrar scheduledTaskRegistrar) {
        log.info("Schedule initializing");
        ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
        threadPoolTaskScheduler.setPoolSize(POOL_SIZE);
        threadPoolTaskScheduler.setThreadNamePrefix("scheduled-task-pool-");
        threadPoolTaskScheduler.initialize();
        scheduledTaskRegistrar.setTaskScheduler(threadPoolTaskScheduler);
        log.info("Schedule initialized");
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        log.info("configureMessageConverters");
        StringHttpMessageConverter stringConverter = new StringHttpMessageConverter();
        stringConverter.setWriteAcceptCharset(true);
        MediaType mediaType = new MediaType("text", "html", StandardCharsets.UTF_8);
        List<MediaType> types = new ArrayList<>();
        types.add(mediaType);
        stringConverter.setSupportedMediaTypes(types);
        converters.add(stringConverter);
        converters.add(new SourceHttpMessageConverter<>());
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
        converter.setPrettyPrint(true);
        converters.add(converter);
    }

    @Bean // view resolver
    public ViewResolver configureViewResolvers() {
        log.info("configureViewResolvers : initializing");
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setPrefix("/WEB-INF/view/");
        viewResolver.setSuffix(".jsp");
        log.info("configureViewResolvers : initialized");
        return viewResolver;
    }

    @Bean // custom view: view가 없을 경우 커스텀 지정한 class를 찾도록 설정
    public ViewResolver beanNameViewResolver() {
        log.info("beanNameViewResolver : initializing");
        BeanNameViewResolver resolver = new BeanNameViewResolver();
        resolver.setOrder(0);
        log.info("beanNameViewResolver : initialized");
        return resolver;
    }

    @Bean // 파일 다운로드 빈 등록
    public FileDownload fileDownload() {
        return new FileDownload();
    }

    @Bean // 파일 업로드 설정
    public CommonsMultipartResolver multipartResolver() {
        log.info("multipartResolver : initializing");
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setDefaultEncoding("utf-8");
        multipartResolver.setMaxUploadSize(26214400); // 전체 최대 25mb
        multipartResolver.setMaxUploadSizePerFile(5242880); // 각 최대 5mb
        log.info("multipartResolver : initialized");
        return multipartResolver;
    }

    @Override // 정적 리소스 매핑
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        log.info("addResourceHandlers : initializing");
        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
        registry.addResourceHandler("/files/**").addResourceLocations("/files/");
        registry.addResourceHandler("/favicon.ico").addResourceLocations("/resources/assets/meta/favicon.ico");
        log.info("addResourceHandlers : initialized");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new BaseInterceptor())
                .addPathPatterns("/**")
                .excludePathPatterns("/resources/**")
                .excludePathPatterns("/files/**");
    }
}