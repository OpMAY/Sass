package com.controller;

import com.dao.UserDao;
import com.model.Plugin;
import com.model.grant.PLUGIN_TYPE;
import com.service.PluginService;
import com.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
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

    @RequestMapping(value = "/plugin/{type}/detail", method = RequestMethod.GET)
    public ModelAndView pluginDetail(HttpServletRequest request,@PathVariable("type") PLUGIN_TYPE type) {
        ModelAndView VIEW = new ModelAndView("plugin-detail");
        Plugin plugin = pluginService.getPlug(type);
        VIEW.addObject("plugin", plugin);
        return VIEW;
    }
}
