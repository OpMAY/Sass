package com.mapper;

import com.model.User;
import com.model.common.MFile;
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

    void changeUserEmail(@Param("userNo") int userNo, @Param("email") String email);

    boolean checkOtherUserEmailExists(@Param("userNo") int userNo, @Param("email") String email);

    boolean checkUserPhoneExists(@Param("userNo") int userNo, @Param("phone") String phone);

    boolean checkUserPasswordValid(@Param("userNo") int userNo,@Param("password") String password);

    void changeWithdrawal(int userNo);

    User getUser(@Param("user_no")int user_no);

    void changeUserProfile(@Param("userNo") Integer userNo, @Param("mFile") MFile mFile);
}
