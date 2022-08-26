package com.mapper;

import com.model.User;

public interface UserMapper {
    boolean checkUserExists(User user);

    void registerUser(User user);

    User loginUser(String email, String password);

    String findUserEmail(String phone);

    String checkUserEmailExists(String email);

    void changeUserPassword(String email, String password);

    void changeUserName(int userNo, String name);

    void changeUserPhone(int userNo, String phone);

    void changeUserMarketingAgree(int userNo, boolean marketingAgree);
}
