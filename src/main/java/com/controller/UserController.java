package com.controller;

import com.dao.UserDao;
import com.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class UserController {
    private final UserDao userDao;
    private final UserService userService;
}
