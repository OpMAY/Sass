package com.restcontroller;

import com.aws.file.FileUploadUtility;
import com.model.grant.PlugGrant;
import com.model.grant.TeamGrant;
import com.model.User;
import com.model.common.MFile;
import com.response.DefaultRes;
import com.response.Message;
import com.service.UserService;
import com.util.TokenGenerator;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.Objects;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthRestController {
    private final FileUploadUtility uploadUtility;
    private final UserService userService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<String> login(@RequestBody User user, HttpServletRequest request) {
        Message message = new Message();
        User result = userService.loginUser(user);
        if (Objects.nonNull(result) && result.getLogin_status() >= 0) {
            request.getSession().setAttribute("user", result.getNo());
        }
        message.put("result", result);
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<String> register(@RequestBody User user) {
        Message message = new Message();
        log.info("user : {}", user);
        message.put("r", userService.registerUser(user));
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/find/email", method = RequestMethod.POST)
    public ResponseEntity<String> findEmail(@RequestBody User user) {
        Message message = new Message();
        String email = userService.findEmail(user);
        if (email != null) {
            message.put("email", email);
            return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
        } else {
            return new ResponseEntity(DefaultRes.res(HttpStatus.BAD_REQUEST), HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/find/password", method = RequestMethod.POST)
    public ResponseEntity<String> findPassword(@RequestBody User user) {
        if(userService.findPassword(user)) {
            return new ResponseEntity(DefaultRes.res(HttpStatus.OK), HttpStatus.OK);
        } else {
            return new ResponseEntity(DefaultRes.res(HttpStatus.BAD_REQUEST), HttpStatus.OK);
        }
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

    @RequestMapping(value = "/change/name", method = RequestMethod.POST)
    public ResponseEntity<String> changeName(HttpServletRequest request, @RequestBody Map<String, Object> map) {
        Message message = new Message();
        message.put("name", map.get("name").toString());
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/change/profile", method = RequestMethod.POST)
    public ResponseEntity<String> changeProfile(HttpServletRequest request, @RequestBody MultipartFile file) {
        Message message = new Message();
        if (file.getSize() > 0) {
            log.info("{},{},{},{}", file.getName(), file.getSize(), file.getOriginalFilename(), file.getContentType());
            MFile mFile = uploadUtility.uploadFile(file, null);
            message.put("file", mFile);
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/change/email", method = RequestMethod.POST)
    public ResponseEntity<String> changeEmail(HttpServletRequest request, @RequestBody Map<String, Object> map) {
        Message message = new Message();
        message.put("email", map.get("email").toString());
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/change/phone", method = RequestMethod.POST)
    public ResponseEntity<String> changePhone(HttpServletRequest request, @RequestBody Map<String, Object> map) {
        Message message = new Message();
        message.put("phone", map.get("phone").toString());
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/change/agree", method = RequestMethod.POST)
    public ResponseEntity<String> changeMarketingAgree(HttpServletRequest request, @RequestBody Map<String, Object> map) {
        Message message = new Message();
        message.put("agree", Boolean.valueOf(map.get("agree").toString()).booleanValue());
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/withdrawal", method = RequestMethod.POST)
    public ResponseEntity<String> changeWithdrawal(HttpServletRequest request, @RequestBody Map<String, Object> map) {
        Message message = new Message();
        message.put("password", map.get("password").toString());
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
