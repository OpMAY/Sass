package com.mapper;

import com.model.User;
import org.apache.ibatis.annotations.Param;

public interface UserMapper {
    boolean checkUserExists(User user);

    void registerUser(User user);

    User loginUser(@Param("email") String email, @Param("password") String password);

    String findUserEmail(String phone);

    boolean checkUserEmailExists(String email);

    void changeUserPassword(@Param("email") String email, @Param("password") String password);

    void changeUserName(@Param("userNo") int userNo, @Param("name") String name);

    void changeUserPhone(@Param("userNo") int userNo, @Param("phone") String phone);

    void changeUserMarketingAgree(@Param("userNo") int userNo, @Param("marketingAgree") boolean marketingAgree);

    User getModalMyInfo(int userNo);
}
