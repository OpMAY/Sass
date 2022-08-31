package com.restcontroller;

import com.model.Plugin;
import com.model.User;
import com.model.grant.PlugGrant;
import com.model.grant.TeamGrant;
import com.response.DefaultRes;
import com.response.Message;
import com.service.PluginService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/global")
public class GlobalRestController {

    private final PluginService pluginService;

    @RequestMapping(value = "/get/plugs", method = RequestMethod.GET)
    public ResponseEntity<String> getPlugs(HttpServletRequest request) {
        ArrayList<Plugin> plugins = pluginService.getPlugs();
        Message message = new Message();
        message.put("plugins", plugins);
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/change/team/grant", method = RequestMethod.POST)
    public ResponseEntity<String> changeTeamGrant(HttpServletRequest request, @RequestBody TeamGrant grant) {
        log.info(grant.toString());
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete/team/grant", method = RequestMethod.POST)
    public ResponseEntity<String> deleteTeamGrant(HttpServletRequest request, @RequestBody TeamGrant grant) {
        log.info(grant.toString());
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/change/plug/grant", method = RequestMethod.POST)
    public ResponseEntity<String> changePlugGrant(HttpServletRequest request, @RequestBody PlugGrant grant) {
        log.info(grant.toString());
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/delete/plug/grant", method = RequestMethod.POST)
    public ResponseEntity<String> deletePlugGrant(HttpServletRequest request, @RequestBody PlugGrant grant) {
        log.info(grant.toString());
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/add/plug/grant", method = RequestMethod.POST)
    public ResponseEntity<String> addPlugGrant(HttpServletRequest request, @RequestBody PlugGrant grant) {
        log.info(grant.toString());
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }
}
