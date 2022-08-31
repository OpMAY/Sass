package com.mapper;

import com.model.User;
import org.apache.ibatis.annotations.Param;

public interface UserMapper {
    boolean checkUserExists(User user);

    void registerUser(User user);

    User loginUser(@Param("email") String email, @Param("password") String password);

    String findUserEmail(String phone);

    boolean checkUserEmailExists(String email);

    void changeUserPassword(String email, String password);

    void changeUserName(int userNo, String name);

    void changeUserPhone(int userNo, String phone);

    void changeUserMarketingAgree(int userNo, boolean marketingAgree);
}
