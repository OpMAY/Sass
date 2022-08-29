package com.controller;

import com.aws.file.FileUploadUtility;
import com.transfer.DownloadBuilder;
import com.util.Encryption.EncryptionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;

@Slf4j
@Controller
@RequiredArgsConstructor
public class TestController {
    @Value("${KAKAO.CLIENT_ID}")
    private String KAKAO_KEY;
    @Value("${KAKAO.CLIENT_SECRET}")
    private String KAKAO_SECRET;
    @Value("${KAKAO.JAVASCRIPT}")
    private String KAKAO_JAVASCRIPT;
    @Value("${NAVER.CLIENT_ID}")
    private String NAVER_KEY;
    @Value("${NAVER.CLIENT_SECRET}")
    private String NAVER_SECRET;
    @Value("${GOOGLE.CLIENT_ID}")
    private String GOOGLE_KEY;
    @Value("${GOOGLE.CLIENT_SECRET}")
    private String GOOGLE_SECRET;

    private final FileUploadUtility fileUploadUtility;

    public static void main(String[] args) {
        try {
            System.out.println(new EncryptionService().decryptAES("FL/PqnsIIQ24F/wLxroa7Qhn+DgaoqsbvZ9en0a4uYxxrBd1IatIf+09+Cqpp5lj2ms0NEdZ4acyJ0RnrCfSOZAxdmYeO4wDH1essHeDhcVo89zWQG3pXXJlHYDN+ovmt6/QrEnkTV3O+yvGeF9s2Q=="));
            System.out.println(new EncryptionService().encryptAES("jdbc:mysql://127.0.0.1:3306/avouch?serverTimezone=Asia/Seoul&allowMultiQueries=true&autoReconnect=true",false));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/test/login", method = RequestMethod.GET)
    public ModelAndView loginTest() {
        ModelAndView VIEW = new ModelAndView("test");
        VIEW.addObject("KAKAO_KEY", KAKAO_KEY);
        VIEW.addObject("KAKAO_SECRET", KAKAO_SECRET);
        VIEW.addObject("KAKAO_JAVASCRIPT", KAKAO_JAVASCRIPT);
        VIEW.addObject("NAVER_KEY", NAVER_KEY);
        VIEW.addObject("NAVER_SECRET", NAVER_SECRET);
        VIEW.addObject("GOOGLE_KEY", GOOGLE_KEY);
        VIEW.addObject("GOOGLE_SECRET", GOOGLE_SECRET);
        return VIEW;
    }



    /**
     * <a href="/test/download.do?file_name=test.mp4"
     * class="btn btn-primary _card-btn">Go somewhere</a>
     */
    @Value("${UPLOAD_PATH}")
    private String UPLOAD_PATH;

    @RequestMapping(value = "/test/download.do", method = RequestMethod.GET)
    public void downloadTest(HttpServletResponse response, String file_name) {
        /**
         * Prepare AWS Download
         * And Logic After
         * */
        File file = new File(UPLOAD_PATH + file_name);
        try {
            DownloadBuilder downloadBuilder = new DownloadBuilder().init(response, true).file(file).header();
            downloadBuilder.send();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @RequestMapping(value = "/test/elements", method = RequestMethod.GET)
    public ModelAndView ElementPage() {
        return new ModelAndView("element");
    }


}
