package com.restcontroller.chat;

import com.aws.file.FileUploadUtility;
import com.model.common.MFile;
import com.response.DefaultRes;
import com.response.Message;
import com.service.chat.ChatService;
import com.util.Constant;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatPlugRestController {
    private final ChatService chatService;
    private final FileUploadUtility fileUploadUtility;

    @RequestMapping(value = "/upload/file", method = POST)
    public ResponseEntity uploadFile(HttpServletRequest request, @RequestBody MultipartFile file) {
        Message message = new Message();
        log.info("{},{},{},{}", file.getName(), file.getSize(), file.getOriginalFilename(), file.getContentType());
        MFile mFile = fileUploadUtility.uploadFile(file, Constant.CDN_PATH.CHAT_FILE);
        message.put("file", mFile);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }
}
