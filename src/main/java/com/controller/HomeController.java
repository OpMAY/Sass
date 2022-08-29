package com.controller;

import com.dao.UserDao;
import com.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeController {
    private final UserDao userDao;
    private final UserService userService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView home() {
        return new ModelAndView("home");
    }

    @RequestMapping(value = "/desc/query", method = RequestMethod.GET)
    public ModelAndView QueryPlugDesc() {
        return new ModelAndView("query-desc");
    }
}
