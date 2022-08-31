package com.controller;

import com.dao.UserDao;
import com.model.Plugin;
import com.model.grant.PLUGIN_TYPE;
import com.service.PluginService;
import com.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@Controller
@RequiredArgsConstructor
public class GlobalController {

    private final PluginService pluginService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView home() {
        return new ModelAndView("home");
    }

    @RequestMapping(value = "/desc/query", method = RequestMethod.GET)
    public ModelAndView QueryPlugDesc(HttpServletRequest request) {
        ModelAndView VIEW = new ModelAndView("plugin-detail");
        Plugin plugin = pluginService.getPlug(PLUGIN_TYPE.QUERY);
        VIEW.addObject("plugin", plugin);
        return VIEW;
    }
}
