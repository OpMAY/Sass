package com.restcontroller;

import com.model.Plugin;
import com.model.User;
import com.model.grant.PlugGrant;
import com.model.grant.TeamGrant;
import com.response.DefaultRes;
import com.response.Message;
import com.service.CompanyService;
import com.service.PluginService;
import com.util.Encryption.EncryptionService;
import com.util.Encryption.JWTEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/global")
public class GlobalRestController {

    private final CompanyService companyService;
    private final PluginService pluginService;

    @RequestMapping(value = "/get/plugs", method = RequestMethod.GET)
    public ResponseEntity<String> getPlugs(HttpServletRequest request) {
        ArrayList<Plugin> plugins = pluginService.getPlugs();
        Message message = new Message();
        message.put("plugins", plugins);
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, false), HttpStatus.OK);
    }

    @RequestMapping(value = "/get/myCorp", method = RequestMethod.GET)
    public ResponseEntity<String> GetModalMyCorp(HttpServletRequest request) {
        Message message = new Message();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (userNo != null) {
            message = companyService.getUserCorpInfo(userNo);
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, false), HttpStatus.OK);
    }

    @RequestMapping(value = "/get/plugin", method = RequestMethod.GET)
    public ResponseEntity<String> GetModalPlugin(HttpServletRequest request) {
        Message message = new Message();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (userNo != null) {
            message = companyService.getUserCorpPluginInfo(userNo);
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, false), HttpStatus.OK);
    }

    @RequestMapping(value = "/get/plugin/ready_member", method = RequestMethod.GET)
    public ResponseEntity<String> getPluginReadyMembers(HttpServletRequest request,
                                                        @RequestParam("companyNo") int companyNo,
                                                        @RequestParam("plugNo") int plugNo) {
        Message message = new Message();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (userNo != null) {
            message =  companyService.getUserCorpPluginReadyMembers(companyNo, plugNo);
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, false), HttpStatus.OK);
    }

    @RequestMapping(value = "/change/team/grant", method = RequestMethod.POST)
    public ResponseEntity<String> changeTeamGrant(HttpServletRequest request, @RequestBody TeamGrant grant) {
        log.info(grant.toString());
        Message message = new Message();
        companyService.changeTeamGrant(grant);
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, false), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete/team/grant", method = RequestMethod.POST)
    public ResponseEntity<String> deleteTeamGrant(HttpServletRequest request, @RequestBody TeamGrant grant) {
        log.info(grant.toString());
        Message message = new Message();
        companyService.deleteTeamGrant(grant);
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, false), HttpStatus.OK);
    }

    @RequestMapping(value = "/change/plug/grant", method = RequestMethod.POST)
    public ResponseEntity<String> changePlugGrant(HttpServletRequest request, @RequestBody PlugGrant grant) {
        log.info(grant.toString());
        Message message = new Message();
        companyService.changePlugGrant(grant);
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, false), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete/plug/grant", method = RequestMethod.POST)
    public ResponseEntity<String> deletePlugGrant(HttpServletRequest request, @RequestBody PlugGrant grant) {
        log.info(grant.toString());
        Message message = new Message();
        companyService.deletePlugGrant(grant);
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, false), HttpStatus.OK);
    }

    @RequestMapping(value = "/add/plug/grant", method = RequestMethod.POST)
    public ResponseEntity<String> addPlugGrant(HttpServletRequest request, @RequestBody PlugGrant grant) {
        log.info(grant.toString());
        Message message = new Message();
        companyService.addPlugGrant(grant);
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, false), HttpStatus.OK);
    }
}
