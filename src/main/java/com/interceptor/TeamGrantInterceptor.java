package com.interceptor;

import com.dao.CompanyMemberDao;
import com.exception.GrantAccessDeniedException;
import com.exception.enums.BaseExceptionType;
import com.exception.enums.BusinessExceptionType;
import com.model.company.Company;
import com.model.company.CompanyMember;
import com.model.grant.ROLE;
import com.service.CompanyService;
import com.service.UserService;
import com.util.Encryption.EncryptionService;
import com.util.Encryption.JWTEnum;
import com.util.JWTToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;

@Slf4j
@RequiredArgsConstructor
@Component
public class TeamGrantInterceptor extends HandlerInterceptorAdapter {

    private final CompanyMemberDao companyMemberDao;

    @PostConstruct
    public void TeamGrantInterceptor() {
        log.debug("TeamGrant Interceptor Post Initialize");
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.debug("TeamGrant Interceptor preHandle");
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        int user_no = Integer.valueOf(hashMap.get(JWTEnum.NO).toString());
        if (companyMemberDao.checkUserHasCompany(user_no)) {
            Company company = companyMemberDao.getUserCompany(user_no);
            ROLE role = companyMemberDao.getUserRoleOfCompany(user_no, company.getNo());
            if (role != ROLE.OWNER) {
                throw new GrantAccessDeniedException(BusinessExceptionType.GRANT_EXCEPTION);
                /*response.sendError(HttpStatus.UNAUTHORIZED.value());
                return false;*/
            }
        } else {
            /*중간 추방 케이스*/
            throw new GrantAccessDeniedException(BusinessExceptionType.GRANT_EXCEPTION);
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        log.debug("TeamGrant Interceptor postHandle");
        super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        log.debug("TeamGrant Interceptor afterCompletion");
        super.afterCompletion(request, response, handler, ex);
    }

    @Override
    public void afterConcurrentHandlingStarted(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        log.debug("TeamGrant Interceptor afterConcurrentHandlingStarted");
        super.afterConcurrentHandlingStarted(request, response, handler);
    }
}
