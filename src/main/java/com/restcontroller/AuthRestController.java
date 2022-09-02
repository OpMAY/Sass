package com.restcontroller;

import com.aws.file.FileUploadUtility;
import com.model.company.Company;
import com.model.User;
import com.model.common.MFile;
import com.response.DefaultRes;
import com.response.Message;
import com.service.CompanyService;
import com.service.UserService;
import com.util.Encryption.EncryptionService;
import com.util.Encryption.JWTEnum;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class AuthRestController {
    private final FileUploadUtility uploadUtility;
    private final UserService userService;
    private final CompanyService companyService;
    private final EncryptionService encryptionService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<String> login(@RequestBody User login_user, HttpServletRequest request) {
        Message message = new Message();
        User user = userService.loginUser(login_user);
        if (Objects.nonNull(user) && user.getLogin_status() >= 0) {
            request.getSession().setAttribute(JWTEnum.JWTToken.name(), encryptionService.encryptJWT(user));
            message.put("login_status", user.getLogin_status());
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity<String> logout(HttpServletRequest request) {
        request.getSession().removeAttribute(JWTEnum.JWTToken.name());
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK), HttpStatus.OK);
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
        if (userService.findPassword(user)) {
            return new ResponseEntity(DefaultRes.res(HttpStatus.OK), HttpStatus.OK);
        } else {
            return new ResponseEntity(DefaultRes.res(HttpStatus.BAD_REQUEST), HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/change/password", method = RequestMethod.POST)
    public ResponseEntity<String> changePassword(@RequestBody User user) {
        Message message = new Message();
        userService.changePassword(user);
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/code/send", method = RequestMethod.POST)
    public ResponseEntity<String> sendCode(HttpServletRequest request, @RequestBody User user) {
        Message message = new Message();
        if (Objects.nonNull(user.getEmail())) {
            if (userService.sendCode(user.getEmail(), request)) {
                return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
            } else {
                return new ResponseEntity(DefaultRes.res(HttpStatus.INTERNAL_SERVER_ERROR, message, true), HttpStatus.OK);
            }
        } else {
            return new ResponseEntity(DefaultRes.res(HttpStatus.BAD_REQUEST, message, true), HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/code/confirm", method = RequestMethod.POST)
    public ResponseEntity<String> confirmCode(HttpServletRequest request, @RequestBody Map<String, Object> map) {
        Message message = new Message();
        if (request.getSession().getAttribute("code").equals(map.get("code").toString()) && request.getSession().getAttribute("email").equals(map.get("email").toString())) {
            return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
        } else {
            return new ResponseEntity(DefaultRes.res(HttpStatus.BAD_REQUEST, message, true), HttpStatus.OK);
        }
    }

    @RequestMapping(value = "/create/corporate", method = RequestMethod.POST)
    public ResponseEntity<String> createCorporate(HttpServletRequest request, @RequestBody Company company) {
        Message message = new Message();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (userNo != null) {
            message.put("result", companyService.createCorporate(company, userNo));
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/find/corporate", method = RequestMethod.POST)
    public ResponseEntity<String> findCorporate(HttpServletRequest request, @RequestBody Map<String, Object> map) {
        Message message = new Message();
        String companyId = map.get("id").toString();
        Company company = companyService.getCompanyNameByCode(companyId);
        if (Objects.nonNull(company)) {
            message.put("company", company);
            return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.BAD_REQUEST), HttpStatus.OK);
    }

    @RequestMapping(value = "/join/corporate", method = RequestMethod.POST)
    public ResponseEntity<String> joinCorporate(HttpServletRequest request, @RequestBody Company company) {
        Message message = new Message();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (userNo != null) {
            message.put("result", companyService.joinCorporate(company, userNo));
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/get/myInfo", method = RequestMethod.GET)
    public ResponseEntity<String> GetModalMyInfo(HttpServletRequest request) {
        Message message = new Message();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (userNo != null) {
            message.put("u", userService.getModalMyInfo(userNo));
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/change/name", method = RequestMethod.POST)
    public ResponseEntity<String> changeName(HttpServletRequest request, @RequestBody Map<String, Object> map) {
        Message message = new Message();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (userNo != null) {
            userService.changeUserName(userNo, map.get("name").toString());
            message.put("name", map.get("name").toString());
        }
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
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (userNo != null) {
            message.put("result", userService.changeUserEmail(userNo, map.get("email").toString()));
            message.put("email", map.get("email").toString());
        }
        request.getSession().removeAttribute(JWTEnum.JWTToken.name());
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/change/phone", method = RequestMethod.POST)
    public ResponseEntity<String> changePhone(HttpServletRequest request, @RequestBody Map<String, Object> map) {
        Message message = new Message();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (userNo != null) {
            message.put("result", userService.changeUserPhone(userNo, map.get("phone").toString()));
            message.put("phone", map.get("phone").toString());
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/change/agree", method = RequestMethod.POST)
    public ResponseEntity<String> changeMarketingAgree(HttpServletRequest request, @RequestBody Map<String, Object> map) {
        Message message = new Message();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (Objects.nonNull(userNo)) {
            userService.changeMarketingAgree(userNo, Boolean.parseBoolean(map.get("agree").toString()));
            return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.UNAUTHORIZED), HttpStatus.OK);
    }

    @RequestMapping(value = "/withdrawal", method = RequestMethod.POST)
    public ResponseEntity<String> changeWithdrawal(HttpServletRequest request, @RequestBody Map<String, Object> map) {
        Message message = new Message();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (Objects.nonNull(userNo)) {
            int result = userService.changeWithdrawal(userNo, map.get("password").toString());
            message.put("result", result);
            if(result == 0) {
                request.getSession().removeAttribute(JWTEnum.JWTToken.name());
            }
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }
}
