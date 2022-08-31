package com.dao;

import com.mapper.UserMapper;
import com.model.User;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
public class UserDao {
    private final UserMapper mapper;

    private UserDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(UserMapper.class);
    }

    public boolean checkUserExists(User user) {
        return mapper.checkUserExists(user);
    }
    public void registerUser(User user) {
        mapper.registerUser(user);
    }

    public User loginUser(String email, String password) {
        return mapper.loginUser(email, password);
    }

    public String findUserEmail(String phone) {
        return mapper.findUserEmail(phone);
    }

    public boolean checkUserEmailExists(String email) {
        return mapper.checkUserEmailExists(email);
    }

    public void changeUserPassword(String email, String password) {
        mapper.changeUserPassword(email, password);
    }

    public void changeUserName(int userNo, String name) {
        mapper.changeUserName(userNo, name);
    }

    public void changeUserPhone(int userNo, String phone) {
        mapper.changeUserPhone(userNo, phone);
    }

    public void changeUserMarketingAgree(int userNo, boolean marketingAgree) {
        mapper.changeUserMarketingAgree(userNo, marketingAgree);
    }
}
