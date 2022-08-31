package com.restcontroller;

import com.model.Plugin;
import com.model.User;
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
}
