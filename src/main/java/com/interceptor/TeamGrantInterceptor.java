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
import org.springframework.web.bind.annotation.RequestMethod;
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
        int user_no = (Integer) hashMap.get(JWTEnum.NO.name());
        //접속한 유저가 Company를 가지고 있는지 확인
        if (companyMemberDao.checkUserHasCompany(user_no)) {
            Company company = companyMemberDao.getUserCompany(user_no);
            //접속한 유저의 ROLE을 뽑아온다.
            ROLE role = companyMemberDao.getUserRoleOfCompany(user_no, company.getNo());
            log.debug("request header : {}", request.getHeader("Content-Api"));
            if(request.getHeader("Content-Api") != null && request.getMethod().equals(RequestMethod.POST.toString())) {
                //접속한 유저의 ROLE이 OWNER(소유자)가 아닐 때 에러
                if (role != ROLE.OWNER) {
                    throw new GrantAccessDeniedException(BusinessExceptionType.GRANT_EXCEPTION);
                /*response.sendError(HttpStatus.UNAUTHORIZED.value());
                return false;*/
                }
            } else {
                //접속한 유저의 ROLE이 READY(초대 초대중)일때 에러
                if(role.equals(ROLE.READY)) {
                    throw new GrantAccessDeniedException(BusinessExceptionType.GRANT_EXCEPTION);
                }
            }

        } else {
            //접속한 유저가 중간에 추방됬을때의 에러
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
