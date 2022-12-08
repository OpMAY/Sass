package com.config;

import com.filter.GeneralFilter;
import com.filter.LogFilter;
import com.interceptor.*;
import com.util.Constant;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.cache.support.SimpleCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.ResourceHttpMessageConverter;
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

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletRegistration;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.EnumSet;
import java.util.List;

@Slf4j
@Configuration
@EnableWebMvc
@EnableAspectJAutoProxy(proxyTargetClass = true) // for AOP
@EnableCaching
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

        // root config
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        container.addListener(new ContextLoaderListener(context));

        // 인코딩 필터 적용
        FilterRegistration.Dynamic charaterEncodingFilter = container.addFilter("charaterEncodingFilter", new CharacterEncodingFilter());
        charaterEncodingFilter.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");
        charaterEncodingFilter.setInitParameter("encoding", "UTF-8");
        charaterEncodingFilter.setInitParameter("forceEncoding", "true");

        FilterRegistration.Dynamic generalFilter = container.addFilter("generalFilter", new GeneralFilter()); // general filter 등록
        generalFilter.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");

        FilterRegistration.Dynamic logFilter = container.addFilter("logFilter", new LogFilter()); // session filter 등록
        logFilter.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");

        /**
         * Clear Setting
         * @Date 2022-07-20
         * @Author kimwoosik
         * @Description
         * Session 유지 시간 설정
         * 배포시 설정 변경
         * */
        container.addListener(new SessionConfig(Constant.SESSION_INTERVAL));

        /**
         * Clear Setting
         * @Date 2022-07-20
         * @Author kimwoosik
         * @Description
         * 로컬에서는 지우고 Deploy Branch에는 활성화
         * Http의 url들을 -> Https의 url들로 우회시키는 로직
         * @Prerequisites
         * Tomcat의 SSL 설정 및 SSL 인증 확인 또는 AWS의 LoadBalancer 활성화
         * */
        /*HttpConstraintElement httpConstraintElement = new HttpConstraintElement(ServletSecurity.TransportGuarantee.CONFIDENTIAL);
        ServletSecurityElement servletSecurityElement = new ServletSecurityElement(httpConstraintElement);
        dispatcher.setServletSecurity(servletSecurityElement);*/
        log.info("WebInitializer : finished");
    }

    @Override
    public void configureTasks(ScheduledTaskRegistrar scheduledTaskRegistrar) {
        log.info("Schedule initializing");
        ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();
        threadPoolTaskScheduler.setPoolSize(Constant.DatabaseSetting.POOL_SIZE);
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
        MediaType mediaType1 = new MediaType("application", "x-www-form-urlencoded", StandardCharsets.UTF_8);
        List<MediaType> types = new ArrayList<>();
        types.add(mediaType);
        types.add(mediaType1);
        stringConverter.setSupportedMediaTypes(types);
        converters.add(stringConverter);
        converters.add(new SourceHttpMessageConverter<>());
        converters.add(new ResourceHttpMessageConverter());
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

    @Bean // 파일 업로드 설정
    public CommonsMultipartResolver multipartResolver() {
        log.info("multipartResolver : initializing");
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setDefaultEncoding("utf-8");
        multipartResolver.setMaxUploadSize(40_212_354_720L); // 전체 최대 45GB
        multipartResolver.setMaxUploadSizePerFile(13_737_418_240L); // 각 최대 15GB
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

    /**
     * PR
     *
     * @Date 2022-07-26, 2022-07-27
     * @Author kimwoosik
     * @Description LogInterceptor Add
     * Order Setting
     * -------------------------------
     * RecoverInterceptor Add
     */
    @Autowired
    private LogInterceptor logInterceptor;
    @Autowired
    private BaseInterceptor baseInterceptor;
    @Autowired
    private AuthInterceptor authInterceptor;
    @Autowired
    private TeamGrantInterceptor teamGrantInterceptor;
    @Autowired
    private PluginInterceptor pluginInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(logInterceptor).order(0)
                .addPathPatterns("/**")
                .excludePathPatterns("/socket/**")
                .excludePathPatterns("/resources/**")
                .excludePathPatterns("/files/**");
//        registry.addInterceptor(new RecoverInterceptor()).order(1)
//                .addPathPatterns("/**")
//                .excludePathPatterns("/socket/**")
//                .excludePathPatterns("/resources/**")
//                .excludePathPatterns("/files/**");
        registry.addInterceptor(baseInterceptor).order(2)
                .addPathPatterns("/**")
                .excludePathPatterns("/socket/**")
                .excludePathPatterns("/resources/**")
                .excludePathPatterns("/files/**");
        /** is Login */
        registry.addInterceptor(authInterceptor).order(3)
                .addPathPatterns("/auth")
                .addPathPatterns("/global/**")
                .addPathPatterns("/query/**")
                .addPathPatterns("/crm/**")
                .addPathPatterns("/chat/**")
                .addPathPatterns("/plan/**")
                .excludePathPatterns("/socket/**")
                .excludePathPatterns("/login")
                .excludePathPatterns("/global/get/plugs")
                .excludePathPatterns("/logout")
                .excludePathPatterns("/register")
                .excludePathPatterns("/find/**")
                .excludePathPatterns("/change/password")
                .excludePathPatterns("/code/**")
                .excludePathPatterns("/resources/**")
                .excludePathPatterns("/files/**");
        /** is Team Grant, OWNER or PERSONAL 구분지어서 Intercept */
        registry.addInterceptor(teamGrantInterceptor).order(4)
                .addPathPatterns("/global/**")
                .excludePathPatterns("/socket/**")
                .excludePathPatterns("/global/get/plugs");
        /** is Plugin Grant, READ or EDIT or READ(무조건 Intercept) 구분 지어서 Intercept*/
        registry.addInterceptor(pluginInterceptor).order(5)
                .addPathPatterns("/query")
                .addPathPatterns("/crm")
                .addPathPatterns("/chat")
                .addPathPatterns("/plan")
                .excludePathPatterns("/socket/**");
    }

    @Bean
    public CacheManager cacheManager() {
        SimpleCacheManager cacheManager = new SimpleCacheManager();
        cacheManager.setCaches(Arrays.asList(new ConcurrentMapCache("IG")));
        return cacheManager;
    }
}
