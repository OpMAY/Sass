package com.interceptor;

import com.model.grant.PLUGIN_TYPE;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RequiredArgsConstructor
@Component
public class PluginInterceptor extends HandlerInterceptorAdapter {

    @PostConstruct
    public void PluginInterceptor() {
        log.debug("Plugin Interceptor Post Initialize");
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.debug("Plugin Interceptor preHandle");
        String contextPath = request.getContextPath();
        contextPath = contextPath.toUpperCase();
        /**
         * 1.초대된 멤버인지 아닌지
         * 2.READ PERMISSION
         * 3.EDIT PERMISSION
         * 4.Send Redirect or Send Error
         * */
        if (contextPath.contains(PLUGIN_TYPE.QUERY.name())) {
        } else if (contextPath.contains(PLUGIN_TYPE.CRM.name())) {

        } else if (contextPath.contains(PLUGIN_TYPE.CHAT.name())) {

        } else {
            //PLUGIN_TYPE.PLAN
        }
        return super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        log.debug("Plugin Interceptor postHandle");
        super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        log.debug("Plugin Interceptor afterCompletion");
        super.afterCompletion(request, response, handler, ex);
    }

    @Override
    public void afterConcurrentHandlingStarted(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.debug("Plugin Interceptor afterConcurrentHandlingStarted");
        super.afterConcurrentHandlingStarted(request, response, handler);
    }
}
