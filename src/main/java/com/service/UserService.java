package com.service;

import com.dao.CompanyDao;
import com.dao.CompanyMemberDao;
import com.dao.UserDao;
import com.model.User;
import com.model.company.Company;
import com.model.company.CompanyRole;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDao userDao;
    private final CompanyDao companyDao;
    private final CompanyMemberDao companyMemberDao;

    public User loginUser(User user) {
        User target = userDao.loginUser(user.getEmail(), user.getPassword());
        if(Objects.nonNull(target)) {
            /** 로그인 후 체크 사항
             * 1. 기업 정보 연결
             * 2. 기업 팀원으로 참여 반려 시 사유 -> 기업 정보 연결
             * 3. 기업 정보 연결되었을 시 로그인
             * **/
            if(companyMemberDao.checkUserHasCompany(user.getNo())) {
                Company company = companyMemberDao.getUserCompany(user.getNo());
                CompanyRole role = companyMemberDao.getUserRoleOfCompany(user.getNo(), company.getNo());
                if(role == CompanyRole.PRE_MEMBER) {
                    // 승인 대기
                    target.setLogin_status(1);
                } else if (role == CompanyRole.DENIED) {
                    // 반려 됨
                    target.setLogin_status(2);
                } else {
                    target.setLogin_status(0);
                }
            } else {
                // 회사 선택
                target.setLogin_status(3);
            }
        }
        return target;
    }

    @Transactional
    public boolean registerUser(User user) {
        // TODO 이미 존재하는 회원 정보인지 Check
        if(userDao.checkUserExists(user)) {
            return false;
        }
        userDao.registerUser(user);
        return true;
    }

    public String findEmail(User user) {
        return userDao.findUserEmail(user.getPhone());
    }

    public boolean findPassword(User user) {
        return userDao.checkUserEmailExists(user.getEmail());
    }
}
