package com.restcontroller.chat;

import com.aws.file.FileUploadUtility;
import com.model.chat.channel.Channel;
import com.model.chat.chatmessage.ChatMessage;
import com.model.chat.chatmessage.interactions.ChatMessageReaction;
import com.model.common.MFile;
import com.response.DefaultRes;
import com.response.Message;
import com.service.chat.ChatService;
import com.util.Constant;
import com.util.Encryption.EncryptionService;
import com.util.Encryption.JWTEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

import static org.springframework.http.HttpStatus.OK;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatPlugRestController {
    private final ChatService chatService;
    private final FileUploadUtility fileUploadUtility;
    private final EncryptionService encryptionService;

    @RequestMapping(value = "/upload/file", method = POST)
    public ResponseEntity uploadFile(HttpServletRequest request, @RequestBody MultipartFile file) {
        Message message = new Message();
        log.info("{},{},{},{}", file.getName(), file.getSize(), file.getOriginalFilename(), file.getContentType());
        MFile mFile = fileUploadUtility.uploadFile(file, Constant.CDN_PATH.CHAT_FILE);
        message.put("file", mFile);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    @RequestMapping(value = "/update/channel/like", method = POST)
    public ResponseEntity updateChannelLike(HttpServletRequest request, @RequestBody Channel channel) throws Exception {
        Message message = new Message();
        HashMap<String, Object> hashMap = encryptionService.decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer user_no = (Integer) hashMap.get(JWTEnum.NO.name());
        channel.setNo(Integer.parseInt(encryptionService.decryptAESWithSlash(channel.getId())));
        if (channel.isBookmark()) {
            log.info("channel insert");
            chatService.insertChannelLike(channel.getNo(), user_no);
        } else {
            log.info("channel delete");
            chatService.deleteChannelLike(channel.getNo(), user_no);
        }
        message.put("channel", channel);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    @RequestMapping(value = "/create/message/reaction", method = POST)
    public ResponseEntity createChatMessageReaction(HttpServletRequest request, @RequestBody ChatMessageReaction reaction) throws Exception {
        Message message = new Message();
        HashMap<String, Object> hashMap = encryptionService.decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer user_no = (Integer) hashMap.get(JWTEnum.NO.name());
        log.info("ChatMessageReaction -> {}", reaction);
        chatService.addReactionOnMessage(user_no, reaction);
        message.put("reaction", reaction);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    @RequestMapping(value = "/delete/message/reaction", method = POST)
    public ResponseEntity deleteChatMessageReaction(HttpServletRequest request, @RequestBody ChatMessageReaction reaction) throws Exception {
        Message message = new Message();
        HashMap<String, Object> hashMap = encryptionService.decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer user_no = (Integer) hashMap.get(JWTEnum.NO.name());
        log.info("ChatMessageReaction -> {}", reaction);
        chatService.deleteReactionOnMessage(user_no, reaction);
        message.put("reaction", reaction);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    @RequestMapping(value = "/update/message/bookmark", method = POST)
    public ResponseEntity updateMessageBookmark(HttpServletRequest request, @RequestBody ChatMessage chatMessage) throws Exception {
        Message message = new Message();
        HashMap<String, Object> hashMap = encryptionService.decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer user_no = (Integer) hashMap.get(JWTEnum.NO.name());
        if (chatMessage.isBookmark()) {
            log.info("message bookmark insert");
            chatService.saveMessage(chatMessage.getId(), user_no);
        } else {
            log.info("message bookmark delete");
            chatService.deleteSavedMessage(chatMessage.getId(), user_no);
        }
        message.put("message", chatMessage);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }
}
