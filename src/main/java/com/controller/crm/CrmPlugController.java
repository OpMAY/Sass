package com.controller.crm;

import com.model.User;
import com.service.UserService;
import com.service.crm.CrmService;
import com.service.query.QueryPlugService;
import com.util.Encryption.EncryptionService;
import com.util.Encryption.JWTEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

@Slf4j
@Controller
@AllArgsConstructor
@RequestMapping("/crm")
public class CrmPlugController {
    private final EncryptionService encryptionService;
    private final UserService userService;
    private final CrmService crmService;

    @RequestMapping(value = "/workspace", method = RequestMethod.GET)
    public ModelAndView WorkSpace(HttpServletRequest request) {
        ModelAndView VIEW = new ModelAndView("crm/workspace");
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        User user = userService.getUser(userNo);
        VIEW.addObject("user", user);
        return VIEW;
    }

    @RequestMapping(value = "/project/{hash}/detail", method = RequestMethod.GET)
    public ModelAndView projectDetail(@PathVariable("hash") String hash) throws Exception {
        ModelAndView VIEW = new ModelAndView("crm/project-detail");
        return VIEW;
    }
}