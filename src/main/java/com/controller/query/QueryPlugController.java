package com.controller.query;

import com.exception.GrantAccessDeniedException;
import com.exception.enums.BusinessExceptionType;
import com.model.query.DataBase;
import com.service.query.QueryPlugService;
import com.util.Encryption.EncryptionService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@Controller
@AllArgsConstructor
@RequestMapping("/query")
public class QueryPlugController {
    private final EncryptionService encryptionService;
    private final QueryPlugService queryPlugService;

    @RequestMapping(value = "/workspace", method = RequestMethod.GET)
    public ModelAndView WorkSpace() {
        return new ModelAndView("query/workspace");
    }

    @RequestMapping(value = "/workspace/create", method = RequestMethod.GET)
    public ModelAndView CreateWorkSpace() {
        ModelAndView VIEW = new ModelAndView("query/workspace-create");
        VIEW.addObject("type", "new");
        return VIEW;
    }

    @RequestMapping(value = "/workspace/edit/{hash}", method = RequestMethod.GET)
    public ModelAndView EditWorkSpace(@PathVariable("hash") String hash) throws Exception {
        ModelAndView VIEW = new ModelAndView("query/workspace-create");
        int database_no = Integer.parseInt(encryptionService.decryptAESWithSlash(hash));
        DataBase dataBase = queryPlugService.getDataBase(database_no);
        if (dataBase != null) {
            VIEW.addObject("type", "edit");
            dataBase.setHash_no(encryptionService.encryptAES(Integer.toString(dataBase.getNo()), true));
            VIEW.addObject("dataBase", dataBase);
            return VIEW;
        } else {
            throw new GrantAccessDeniedException(BusinessExceptionType.GRANT_EXCEPTION);
        }
    }

    @RequestMapping(value = "/database/{hash}/detail", method = RequestMethod.GET)
    public ModelAndView databaseDetail(@PathVariable("hash") String hash) throws Exception {
        ModelAndView VIEW = new ModelAndView("query/database-detail");
        int database_no = Integer.parseInt(encryptionService.decryptAESWithSlash(hash));
        DataBase dataBase = queryPlugService.getDataBase(database_no);
        VIEW.addObject("database", dataBase);
        return VIEW;
    }
}
