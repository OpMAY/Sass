package com.controller.crm;

import com.service.query.QueryPlugService;
import com.util.Encryption.EncryptionService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@Controller
@AllArgsConstructor
@RequestMapping("/crm")
public class CrmPlugController {
    private final EncryptionService encryptionService;
    private final QueryPlugService queryPlugService;

    @RequestMapping(value = "/workspace", method = RequestMethod.GET)
    public ModelAndView WorkSpace() {
        return new ModelAndView("crm/workspace");
    }

    @RequestMapping(value = "/project/{hash}/detail", method = RequestMethod.GET)
    public ModelAndView projectDetail(@PathVariable("hash") String hash) throws Exception {
        ModelAndView VIEW = new ModelAndView("crm/project-detail");
        return VIEW;
    }
}
