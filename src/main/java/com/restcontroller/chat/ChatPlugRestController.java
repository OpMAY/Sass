package com.restcontroller.chat;

import com.aws.file.FileUploadUtility;
import com.model.chat.chatmessage.interactions.ChatMessageReaction;
import com.model.chat.channel.CHANNEL_TYPE;
import com.model.chat.channel.Channel;
import com.model.chat.chatmessage.ChatMessage;
import com.model.chat.chatmessage.MessageThread;
import com.model.common.MFile;
import com.model.company.Company;
import com.response.DefaultRes;
import com.response.Message;
import com.service.CompanyService;
import com.service.chat.ChatService;
import com.util.Constant;
import com.util.Encryption.EncryptionService;
import com.util.Encryption.JWTEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.ArrayList;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.OK;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatPlugRestController {
    private final ChatService chatService;
    private final FileUploadUtility fileUploadUtility;
    private final EncryptionService encryptionService;
    private final CompanyService companyService;

    @RequestMapping(value = "/upload/file", method = RequestMethod.POST)
    public ResponseEntity uploadFile(HttpServletRequest request, @RequestBody MultipartFile file) {
        Message message = new Message();
        log.info("{},{},{},{}", file.getName(), file.getSize(), file.getOriginalFilename(), file.getContentType());
        MFile mFile = fileUploadUtility.uploadFile(file, Constant.CDN_PATH.CHAT_FILE);
        message.put("file", mFile);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    @RequestMapping(value = "/update/channel/like", method = RequestMethod.POST)
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

    @RequestMapping(value = "/create/message/reaction", method = RequestMethod.POST)
    public ResponseEntity createChatMessageReaction(HttpServletRequest request, @RequestBody ChatMessageReaction reaction) throws Exception {
        Message message = new Message();
        HashMap<String, Object> hashMap = encryptionService.decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer user_no = (Integer) hashMap.get(JWTEnum.NO.name());
        log.info("ChatMessageReaction -> {}", reaction);
        chatService.addReactionOnMessage(user_no, reaction);
        message.put("reaction", reaction);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    @RequestMapping(value = "/delete/message/reaction", method = RequestMethod.POST)
    public ResponseEntity deleteChatMessageReaction(HttpServletRequest request, @RequestBody ChatMessageReaction reaction) throws Exception {
        Message message = new Message();
        HashMap<String, Object> hashMap = encryptionService.decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer user_no = (Integer) hashMap.get(JWTEnum.NO.name());
        log.info("ChatMessageReaction -> {}", reaction);
        chatService.deleteReactionOnMessage(user_no, reaction);
        message.put("reaction", reaction);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    @RequestMapping(value = "/update/message/bookmark", method = RequestMethod.POST)
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
    
    // TODO 1. channel 메세지 가져오기 (Main) -> 지우씨
    @RequestMapping(value = "/channel/messages", method = RequestMethod.GET)
    public ResponseEntity GetChannelMessages(HttpServletRequest request,
                                             @RequestParam("type") String type,
                                             @RequestParam(value = "value", required = false) String value,
                                             @RequestParam(value = "last_message_id", required = false) String last_message_id) throws Exception {
        /**
         * # type에 따른 value
         *  1. DIRECT -> 상대 company_member_no hash,
         *  2. MY -> not required
         *  3. GROUP -> channel_no hash
         *
         * # last_message_id
         * -> 리로딩 시에만 사용
         * **/
        Message message = new Message();
        String upper = type.toUpperCase();
        HashMap<String, Object> hashMap = encryptionService.decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer user_no = (Integer) hashMap.get(JWTEnum.NO.name());
        int channel_no;
        if (upper.equals(CHANNEL_TYPE.DIRECT.name())) {
            int target_member_no = Integer.parseInt(encryptionService.decryptAESWithSlash(value));
            Channel channel = chatService.getDirectChannel(user_no, target_member_no);
            channel_no = channel.getNo();
        } else if (upper.equals(CHANNEL_TYPE.MY.name())) {
            Channel channel = chatService.getMyPrivateChannel(user_no);
            channel_no = channel.getNo();
        } else if (upper.equals(CHANNEL_TYPE.GROUP.name())) {
            channel_no = Integer.parseInt(encryptionService.decryptAESWithSlash(value));
        } else {
            return new ResponseEntity(DefaultRes.res(BAD_REQUEST), OK);
        }
        if(channel_no != 0) {
            ArrayList<ChatMessage> messages = chatService.getChannelMessages(channel_no, user_no, last_message_id);
            message.put("messages", messages);
            message.put("is_reload", last_message_id != null);
            message.put("status", true);
        } else {
            return new ResponseEntity(DefaultRes.res(BAD_REQUEST), OK);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    // TODO 2. channels, users 가져오기 (Left) -> 지우씨
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    public ResponseEntity GetCompanyChannelsAndMembers(HttpServletRequest request) throws Exception {
        Message message = new Message();
        HashMap<String, Object> hashMap = encryptionService.decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer user_no = (Integer) hashMap.get(JWTEnum.NO.name());
        Company company = companyService.getUserCompany(user_no);
        message.put("channels", chatService.getCompanyChannels(user_no, company.getNo()));
        message.put("users", chatService.getChatMembers(user_no, company.getNo()));
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    // TODO 3. Thread 가져오기 (Right) -> 지우씨
    @RequestMapping(value = "/channel/thread/messages", method = RequestMethod.GET)
    public ResponseEntity GetThreadMessages(HttpServletRequest request,
                                            @RequestParam(value = "message_id") String message_id,
                                            @RequestParam(value = "last_message_id", required = false) String last_message_id) throws Exception {
        Message message = new Message();
        HashMap<String, Object> hashMap = encryptionService.decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer user_no = (Integer) hashMap.get(JWTEnum.NO.name());
        MessageThread thread = chatService.getMessageThread(user_no, message_id, last_message_id);
        message.put("thread", thread);
        message.put("is_reload", last_message_id != null);
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    // TODO 9. Message 보내기 (Main, Right), 10. File Message 보내기 (Main, Right) -> 지우씨
    @RequestMapping(value = "/send/message", method = RequestMethod.POST)
    public ResponseEntity SendMessage(HttpServletRequest request,
                                      @RequestParam("type") String type,
                                      @RequestParam(value = "value", required = false) String value,
                                      @RequestBody ChatMessage chatMessage) throws Exception {
        Message message = new Message();
        HashMap<String, Object> hashMap = encryptionService.decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer user_no = (Integer) hashMap.get(JWTEnum.NO.name());
        chatMessage.setCompany_member_no(companyService.getUserCompanyMemberInfoByUserNo(user_no).getNo());
        String upper = type.toUpperCase();
        int channel_no;
        if (upper.equals(CHANNEL_TYPE.DIRECT.name())) {
            int target_member_no = Integer.parseInt(encryptionService.decryptAESWithSlash(value));
            Channel channel = chatService.getDirectChannel(user_no, target_member_no);
            channel_no = channel.getNo();
        } else if (upper.equals(CHANNEL_TYPE.MY.name())) {
            Channel channel = chatService.getMyPrivateChannel(user_no);
            channel_no = channel.getNo();
        } else if (upper.equals(CHANNEL_TYPE.GROUP.name())) {
            channel_no = Integer.parseInt(encryptionService.decryptAESWithSlash(value));
        } else {
            return new ResponseEntity(DefaultRes.res(BAD_REQUEST), OK);
        }
        chatMessage.setChannel_no(channel_no);
        ChatMessage result = chatService.sendMessage(chatMessage);
        if(result == null) {
            message.put("status", false);
        } else {
            message.put("status", true);
            message.put("message", result);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    @RequestMapping(value = "/channel/members", method = RequestMethod.GET)
    public ResponseEntity getChannelMembers(HttpServletRequest request,
                                            @RequestParam("type") String type,
                                            @RequestParam(value = "value", required = false) String value) throws Exception {
        Message message = new Message();
        HashMap<String, Object> hashMap = encryptionService.decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer user_no = (Integer) hashMap.get(JWTEnum.NO.name());
        String upper = type.toUpperCase();
        int channel_no;
        if (upper.equals(CHANNEL_TYPE.DIRECT.name())) {
            int target_member_no = Integer.parseInt(encryptionService.decryptAESWithSlash(value));
            Channel channel = chatService.getDirectChannel(user_no, target_member_no);
            channel_no = channel.getNo();
        } else if (upper.equals(CHANNEL_TYPE.MY.name())) {
            Channel channel = chatService.getMyPrivateChannel(user_no);
            channel_no = channel.getNo();
        } else if (upper.equals(CHANNEL_TYPE.GROUP.name())) {
            channel_no = Integer.parseInt(encryptionService.decryptAESWithSlash(value));
        } else {
            return new ResponseEntity(DefaultRes.res(BAD_REQUEST), OK);
        }
        message.put("users", chatService.getChannelMembers(channel_no));
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }
}
