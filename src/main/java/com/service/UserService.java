package com.service;

import com.api.mail.MailBuilder;
import com.api.mail.MailFooter;
import com.api.mail.MailLogo;
import com.api.mail.MailType;
import com.dao.CompanyDao;
import com.dao.CompanyMemberDao;
import com.dao.UserDao;
import com.model.User;
import com.model.company.Company;
import com.model.company.CompanyRole;
import com.model.grant.ROLE;
import com.response.Message;
import com.response.ResponseEnum;
import com.util.TokenGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserDao userDao;
    private final CompanyDao companyDao;
    private final CompanyMemberDao companyMemberDao;
    private final MailBuilder mailBuilder;

    public User loginUser(User user) {
        User target = userDao.loginUser(user.getEmail(), user.getPassword());
        if (Objects.nonNull(target)) {
            /** 로그인 후 체크 사항
             * 1. 기업 정보 연결
             * 2. 기업 팀원으로 참여 반려 시 사유 -> 기업 정보 연결
             * 3. 기업 정보 연결되었을 시 로그인
             * **/
            if (companyMemberDao.checkUserHasCompany(target.getNo())) {
                Company company = companyMemberDao.getUserCompany(target.getNo());
                ROLE role = companyMemberDao.getUserRoleOfCompany(target.getNo(), company.getNo());
                if (role == ROLE.READY) {
                    // 승인 대기
                    target.setLogin_status(1);
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
        if (userDao.checkUserExists(user)) {
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

    @Transactional
    public void changePassword(User user) {
        userDao.changeUserPassword(user.getEmail(), user.getPassword());
    }

    public boolean sendCode(String email, HttpServletRequest request) {
        try {
            String code = TokenGenerator.RandomToken(8);
            ResponseEnum responseEnum = mailBuilder.setSession()
                    .setMailTitle("aVouch 비밀번호 찾기 인증 메일")
                    .setTo(email)
                    .setMailContent(
                            mailBuilder.getMailHTML(
                                    MailType.PASSWORD,
                                    new MailLogo(),
                                    new MailFooter("aVouch", "aVouch", "유병준", "123-45-67890", "서울특별시 관악구 남부순환로 1892, 4층"),
                                    code
                            ),
                            MailType.PASSWORD
                    )
                    .send();
            request.getSession().setAttribute("email", email);
            request.getSession().setAttribute("code", code);
            return responseEnum == ResponseEnum.SUCCESS;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public void changeMarketingAgree(int userNo, boolean agree) {
        userDao.changeUserMarketingAgree(userNo, agree);
    }


    public User getModalMyInfo(int userNo) {
        return userDao.getModalMyInfo(userNo);
    }

    @Transactional
    public void changeUserName(int userNo, String name) {
        userDao.changeUserName(userNo, name);
    }

    @Transactional
    public int changeUserEmail(int userNo, String email) {
        if (userDao.getModalMyInfo(userNo).getEmail().equals(email)) {
            // 내 이메일로 변경하려는 경우
            return -2;
        } else if (userDao.checkUserEmailExists(userNo, email)) {
            // 다른 사람이 사용 중인 이메일일 경우
            return -1;
        } else {
            // 변경 가능
            userDao.changeUserEmail(userNo, email);
            return 0;
        }
    }

    @Transactional
    public int changeUserPhone(int userNo, String phone) {
        if (userDao.getModalMyInfo(userNo).getPhone().equals(phone)) {
            // 내 전화번호로 변경하려는 경우
            return -2;
        } else if (userDao.checkUserPhoneExists(userNo, phone)) {
            // 다른 사람이 사용 중인 전화번호일 경우
            return -1;
        } else {
            // 변경 가능
            userDao.changeUserPhone(userNo, phone);
            return 0;
        }
    }

    @Transactional
    public int changeWithdrawal(int userNo, String password) {
        // TODO 특정 기업의 장 + 해당 기업에 인원이 있을 경우 Block?
        if(userDao.checkUserPasswordValid(userNo, password)) {
            userDao.changeWithdrawal(userNo);
            return 0;
        } else {
            return -1;
        }
    }

    public User getUser(int user_no) {
        return userDao.getUser(user_no);
    }
}
