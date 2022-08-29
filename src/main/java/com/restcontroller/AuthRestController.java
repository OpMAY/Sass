package com.restcontroller;

import com.model.User;
import com.response.DefaultRes;
import com.response.Message;
import com.util.TokenGenerator;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthRestController {
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<String> login(@RequestBody User user) {
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<String> register(@RequestBody User user) {
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/find/email", method = RequestMethod.POST)
    public ResponseEntity<String> findEmail(@RequestBody User user) {
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/find/password", method = RequestMethod.POST)
    public ResponseEntity<String> findPassword(@RequestBody User user) {
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/change/password", method = RequestMethod.POST)
    public ResponseEntity<String> changePassword(@RequestBody User user) {
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/code/send", method = RequestMethod.POST)
    public ResponseEntity<String> sendCode(HttpServletRequest request) {
        Message message = new Message();
        message.put("code", TokenGenerator.RandomToken(8));
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/code/confirm", method = RequestMethod.POST)
    public ResponseEntity<String> confirmCode(@RequestBody Map<String, Object> map) {
        Message message = new Message();
        message.put("code", map.get("code").toString());
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }
}
