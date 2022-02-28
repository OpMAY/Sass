package com.controller;

import com.api.instagram.InstagramAPI;
import com.api.lunarsoft.alarm.LunarAlarmAPI;
import com.api.mail.MailBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;
import com.model.SplitFileData;
import com.model.User;
import com.model.common.MFile;
import com.response.DefaultRes;
import com.response.Message;
import com.response.ResMessage;
import com.response.StatusCode;
import com.service.HomeService;
import com.service.OtherHomeService;
import com.util.Constant;
import com.util.Encryption.EncryptionService;
import com.util.FileUploadUtility;
import jdk.nashorn.internal.objects.NativeArrayBuffer;
import jdk.nashorn.internal.objects.NativeUint8Array;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.util.Streams;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.nio.Buffer;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Slf4j
@RestController
@RequiredArgsConstructor
public class TestController {

    public final FileUploadUtility fileUploadUtility;
    public final HomeService homeService;
    public final OtherHomeService otherHomeService;


    @GetMapping("/get-test.do")
    public ModelAndView getTest() {
        log.info("GET");
        return new ModelAndView("test");
    }

    @PostMapping("/post-test1.do")
    public ResponseEntity<String> postTest1(String test) {
        log.info("POST");
        System.out.println("test = " + test);
        Message message = new Message();
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(StatusCode.OK, ResMessage.TEST_SUCCESS, message.getHashMap()), HttpStatus.OK);
    }

    @PostMapping("/post-test2.do")
    public ResponseEntity<String> postTest2(@RequestBody String data) {
        log.info("POST");
        JsonParser parser = new JsonParser();
        JsonElement element = parser.parse(data);
        String val = element.getAsJsonObject().get("test").getAsString();
        System.out.println("val = " + val);
        Message message = new Message();
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(StatusCode.OK, ResMessage.TEST_SUCCESS, message.getHashMap()), HttpStatus.OK);
    }

    @PostMapping("/post-test3.do")
    public ResponseEntity<String> postTest3(@RequestBody User user) {
        log.info("POST");
        System.out.println("user = " + user);
        Message message = new Message();
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(StatusCode.OK, ResMessage.TEST_SUCCESS, message.getHashMap()), HttpStatus.OK);
    }

    @PutMapping("/put-test.do")
    public ResponseEntity<String> putTest(String test) {
        log.info("PUT");
        System.out.println("test = " + test);
        Message message = new Message();
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(StatusCode.OK, ResMessage.TEST_SUCCESS, message.getHashMap()), HttpStatus.OK);
    }

    @PatchMapping("/patch-test.do")
    public ResponseEntity<String> patchTest(String test) {
        log.info("PATCH");
        System.out.println("test = " + test);
        Message message = new Message();
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(StatusCode.OK, ResMessage.TEST_SUCCESS, message.getHashMap()), HttpStatus.OK);
    }

    @DeleteMapping("/delete-test.do")
    public ResponseEntity<String> deleteTest(String test) {
        log.info("DELETE");
        System.out.println("test = " + test);
        Message message = new Message();
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(StatusCode.OK, ResMessage.TEST_SUCCESS, message.getHashMap()), HttpStatus.OK);
    }

    @GetMapping("/file.do")
    public ModelAndView fileUploadTest() {
        return new ModelAndView("test");
    }

    @PostMapping("/file.do")
    public ModelAndView fileUploadTest(MultipartFile file) {
        MFile mFile = fileUploadUtility.uploadFile(file, Constant.CDN_PATH.TEST);
        if (mFile == null) {
            System.out.println("NO FILE!");
        } else {
            System.out.println("mFile.getName() = " + mFile.getName());
            System.out.println("mFile.getSize() = " + mFile.getSize());
            System.out.println("mFile.getUrl() = " + mFile.getUrl());
        }
        return new ModelAndView("test");
    }

    @PostMapping("/files.do")
    public ModelAndView filesUploadTest(List<MultipartFile> files) {
        List<MFile> mFiles = fileUploadUtility.uploadFiles(files, Constant.CDN_PATH.TEST);
        if (mFiles.isEmpty()) {
            System.out.println("NO FILES!");
        }
        for (MFile mFile : mFiles) {
            System.out.println("mFile.getName() = " + mFile.getName());
            System.out.println("mFile.getSize() = " + mFile.getSize());
            System.out.println("mFile.getUrl() = " + mFile.getUrl());
        }
        return new ModelAndView("test");
    }

    @PostMapping("/filemap.do")
    public ModelAndView filesUploadTest(@RequestParam Map<String, MultipartFile> files) {
        List<MFile> mFiles = new ArrayList<>();
        for (Map.Entry<String, MultipartFile> entry : files.entrySet()) {
            MultipartFile file = files.get(entry.getKey());
            MFile mfile = fileUploadUtility.uploadFile(file, Constant.CDN_PATH.TEST);
            if (mfile != null) {
                mFiles.add(mfile);
            }
        }
        for (MFile mFile : mFiles) {
            System.out.println("mFile.getName() = " + mFile.getName());
            System.out.println("mFile.getSize() = " + mFile.getSize());
            System.out.println("mFile.getUrl() = " + mFile.getUrl());
        }
        return new ModelAndView("test");
    }

    @GetMapping("rollback.do")
    public ModelAndView rollbackTestGet(String string) {
        System.out.println("string = " + string);
//        homeService.sqlRollbackTest(string);
        homeService.recursiveSqlRollbackTest(string);
        return new ModelAndView("test");
    }

    @Autowired
    private LunarAlarmAPI lunarAlarmAPI;

    @GetMapping("lunarsoft.do")
    public ModelAndView lunarsoftAlarmTest() {
        //lunarAlarmAPI.signUpTest(new SignUp());
        return new ModelAndView("test");
    }

    @Autowired
    private InstagramAPI instagramAPI;

    @ResponseBody
    @GetMapping(value = "/instagram/media")
    @Cacheable(value = "IG")
    public ResponseEntity<String> getInstagramTest(String type) {
        Message message = new Message();
        List<String> images = instagramAPI.getImages(type);
        log.info(images.toString());
        return new ResponseEntity(
                DefaultRes.res(
                        StatusCode.OK, ResMessage.TEST_SUCCESS, message.getHashMap("ajax")
                ), HttpStatus.OK
        );
    }

    @Autowired
    private MailBuilder mailBuilder;

    @GetMapping("mail.do")
    public ModelAndView mailSendTest() {
        try {
            if (mailBuilder.setSession()
                    .setTo("zlzldntlr@naver.com")
                    .setMailTitle("title test")
                    .setMailContent("<h1>content test</h1>")
                    .send()) {
                /** Mail Send Success */
            } else {
                /** Mail Send Failed*/
            }
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return new ModelAndView("test");
    }

    @GetMapping("/users.do")
    public ModelAndView seeUsers(HttpServletRequest request) {
        List<User> users = otherHomeService.selectUsers();
        request.setAttribute("users", users);
        return new ModelAndView("test");
    }

    @PostMapping("/user.do")
    public ModelAndView registerUsers(User user) {
        otherHomeService.insertUser(user);
        return new ModelAndView("redirect:/users.do");
    }

    @GetMapping("/encrypt.do")
    public ModelAndView encrypt(HttpServletRequest request) {
        User user = new User();
        user.setNo(1);
        user.setEmail("zlzldntlr@naver.com");
        user.setId("239428424");
        user.setName("name");
        user.setAccess_token("access_token");
        try {
            String token = new EncryptionService().encryptJWT(user);
            log.info(user.toString());
            log.info(token);
            log.info(new EncryptionService().decryptJWT(token).toString());
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return new ModelAndView("test");
    }

    @GetMapping("/cookie.do")
    public ModelAndView cookieTest(HttpServletRequest request) {
        return new ModelAndView("test");
    }

    @PostMapping("/encrypt.do")
    public ResponseEntity<String> encrypt(String value) {
        Message message = new Message();
        message.put("status", true);
        try {
            String result = new EncryptionService().encryptAES(value);
            System.out.println(value + " --> " + result);
            message.put("result", result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity(DefaultRes.res(StatusCode.OK, ResMessage.TEST_SUCCESS, message.getHashMap()), HttpStatus.OK);
    }

    @PostMapping("/decrypt.do")
    public ResponseEntity<String> decrypt(String value) {
        Message message = new Message();
        try {
            String result = new EncryptionService().decryptAES(value);
            System.out.println(value + " --> " + result);
            message.put("result", result);
        } catch (Exception e) {
            e.printStackTrace();
        }
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(StatusCode.OK, ResMessage.TEST_SUCCESS, message.getHashMap()), HttpStatus.OK);
    }

    @GetMapping("/chat")
    public ModelAndView chatTest() {
        return new ModelAndView("socket");
    }

    @Value("${PATH}")
    private String path;

    @RequestMapping(value = "/upload/bulk", method = RequestMethod.POST)
    public ModelAndView postBulkUpload(HttpServletRequest request) {
        log.info("postBulkUpload started");
        long beforeTime = System.currentTimeMillis(); //코드 실행 전에 시간 받아오기
        try {
            boolean isMultipart = ServletFileUpload.isMultipartContent(request);
            if (!isMultipart) {
                // Inform user about invalid request
                log.info("is'nt Multipart File");
                return new ModelAndView("test");
            }

            // Create a new file upload handler
            ServletFileUpload upload = new ServletFileUpload();

            // Parse the request
            FileItemIterator iter = upload.getItemIterator(request);
            log.info(iter.toString());
            while (iter.hasNext()) {
                FileItemStream item = iter.next();
                String name = item.getFieldName();
                InputStream stream = item.openStream();
                if (!item.isFormField()) {
                    String filename = item.getName();
                    // Process the input stream
                    log.info("filename : " + filename);
                    OutputStream out = new FileOutputStream(path + filename);
                    IOUtils.copy(stream, out);
                    stream.close();
                    out.close();
                } else {
                    String formFieldValue = Streams.asString(stream);
                    log.info("formFieldValue : " + formFieldValue);
                }
            }
            long afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
            long secDiffTime = (afterTime - beforeTime) / 1000; //두 시간에 차 계산
            System.out.println("시간차이(m) : " + secDiffTime);
        } catch (FileUploadException e) {
            e.printStackTrace();
            log.info("postBulkUpload end");
        } catch (IOException e) {
            e.printStackTrace();
            log.info("postBulkUpload end");
        }
        log.info("postBulkUpload end");
        return new ModelAndView("test");
    }

    @RequestMapping(value = "/upload/bulk", method = RequestMethod.GET)
    public ModelAndView getBulkUpload() {
        return new ModelAndView("test");
    }

    @GetMapping("/upload/general")
    public ModelAndView getGeneralUpload() {
        return new ModelAndView("test");
    }

    @PostMapping("/upload/general")
    public ModelAndView postGeneralUpload(MultipartFile file) {
        long beforeTime = System.currentTimeMillis(); //코드 실행 전에 시간 받아오기
        log.info(this.path + file.getOriginalFilename());
        try {
            InputStream input = file.getInputStream();
            Path path = Paths.get(this.path + file.getOriginalFilename());//check path
            OutputStream output = Files.newOutputStream(path);
            IOUtils.copy(input, output); //org.apache.commons.io.IOUtils or you can create IOUtils.copy
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            long afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
            long secDiffTime = (afterTime - beforeTime); //두 시간에 차 계산
            System.out.println("시간차이(m) : " + secDiffTime);
        }
        return new ModelAndView("test");
    }

    @GetMapping("/upload/split/general")
    public ModelAndView getBulkSplitUpload() {
        return new ModelAndView("split_file");
    }

    @Autowired
    private HashMap<String, ArrayList<SplitFileData>> splitFileStorage;

    @ResponseBody
    @RequestMapping(value = "/upload/split/general", method = RequestMethod.POST)
    public ResponseEntity<String> splitFileUpload(SplitFileData split) throws JSONException {
        log.info("{}", split.toString());
        if (split.isEof()) {
            long beforeTime = System.currentTimeMillis(); //코드 실행 전에 시간 받아오기
            ArrayList<SplitFileData> splitFileDatas = splitFileStorage.get(split.getFilename());
            Collections.sort(splitFileDatas);
            String base64Str = "";
            for (SplitFileData splitFileData : splitFileDatas) {
                base64Str += splitFileData.getData();
                log.info("{}", splitFileData.getIndex());
            }
            base64Str = base64Str.trim().replaceAll(" ", "");
            byte[] bytes = Base64.getDecoder().decode(base64Str);
            try {
                FileUtils.writeByteArrayToFile(new File(path + split.getFilename()), bytes);
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                splitFileStorage.remove(split.getFilename());
                long afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
                long secDiffTime = (afterTime - beforeTime) / 1000; //두 시간에 차 계산
                System.out.println("시간차이(m) : " + secDiffTime);
            }
        } else {
            if (splitFileStorage.get(split.getFilename()) == null) {
                ArrayList<SplitFileData> hashMapFileDatas = new ArrayList<>();
                hashMapFileDatas.add(split);
                splitFileStorage.put(split.getFilename(), hashMapFileDatas);
            } else {
                splitFileStorage.get(split.getFilename()).add(split);
                splitFileStorage.put(split.getFilename(), splitFileStorage.get(split.getFilename()));
            }
        }
        Message message = new Message();
        return new ResponseEntity(
                DefaultRes.res(
                        StatusCode.OK, ResMessage.TEST_SUCCESS, message.getHashMap("ajax")
                ), HttpStatus.OK
        );
    }
    /*@RequestMapping(value = "/upload/split/general", method = RequestMethod.POST)
    public ResponseEntity<String> splitFileUpload(SplitFileData split) throws JSONException {
        if (split.isEof()) {
            Message message = new Message();
            message.put("message", "success file");
            return new ResponseEntity(
                    DefaultRes.res(
                            StatusCode.OK, ResMessage.TEST_SUCCESS, message.getHashMap("ajax")
                    ), HttpStatus.OK
            );
        } else {
            if (splitFileStorage.get(split.getFilename()) == null) {
                ArrayList<SplitFileData> hashMapFileDatas = new ArrayList<>();
                hashMapFileDatas.add(split);
                splitFileStorage.put(split.getFilename(), hashMapFileDatas);
            } else {
                log.info(split.toString());
                splitFileStorage.get(split.getFilename()).add(split);
                splitFileStorage.put(split.getFilename(), splitFileStorage.get(split.getFilename()));
            }
            Message message = new Message();
            message.put("message", "success file");
            return new ResponseEntity(
                    DefaultRes.res(
                            StatusCode.OK, ResMessage.TEST_SUCCESS, message.getHashMap("ajax")
                    ), HttpStatus.OK
            );
        }
    }*/
}
