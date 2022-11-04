package com.interceptor;

import com.dao.CompanyMemberDao;
import com.dao.CompanyPlugDao;
import com.exception.GrantAccessDeniedException;
import com.exception.PlugAccessDeniedException;
import com.exception.enums.BusinessExceptionType;
import com.model.company.Company;
import com.model.company.CompanyPlug;
import com.model.grant.PLUGIN_TYPE;
import com.util.Encryption.EncryptionService;
import com.util.Encryption.JWTEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.HashMap;

@Slf4j
@RequiredArgsConstructor
@Component
public class PluginInterceptor extends HandlerInterceptorAdapter {

    private final CompanyMemberDao companyMemberDao;
    private final CompanyPlugDao companyPlugDao;

    @PostConstruct
    public void PluginInterceptor() {
        log.debug("Plugin Interceptor Post Initialize");
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.debug("Plugin Interceptor preHandle");
        String contextPath = request.getContextPath();
        contextPath = contextPath.toUpperCase();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer user_no = (Integer) hashMap.get(JWTEnum.NO.name());
        Company company = companyMemberDao.getUserCompany(user_no);
        /**
         * 1.초대된 멤버인지 아닌지
         * 2.READ PERMISSION
         * 3.EDIT PERMISSION
         * 4.Send Redirect or Send Error
         * */
        if (contextPath.contains(PLUGIN_TYPE.QUERY.name())) {
            //1
            boolean check = companyPlugDao.isPlugRegistered(company.getNo(), 1);
            if (!check) {
                throw new PlugAccessDeniedException(BusinessExceptionType.PLUG_ACCESS_EXCEPTION);
            }
        } else if (contextPath.contains(PLUGIN_TYPE.CRM.name())) {
            //2
            boolean check = companyPlugDao.isPlugRegistered(company.getNo(), 2);
            if (!check) {
                throw new PlugAccessDeniedException(BusinessExceptionType.PLUG_ACCESS_EXCEPTION);
            }
        } else if (contextPath.contains(PLUGIN_TYPE.CHAT.name())) {
            //3
            boolean check = companyPlugDao.isPlugRegistered(company.getNo(), 3);
            if (!check) {
                throw new PlugAccessDeniedException(BusinessExceptionType.PLUG_ACCESS_EXCEPTION);
            }
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
