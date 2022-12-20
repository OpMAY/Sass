package com.controller.chat;

import com.model.chat.channel.Channel;
import com.model.chat.chatmessage.ChatMessage;
import com.service.chat.ChatService;
import com.util.Encryption.EncryptionService;
import com.util.Encryption.JWTEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;

@RequestMapping("/chat")
@Controller
@Slf4j
@RequiredArgsConstructor
public class ChatPlugController {
    private final ChatService chatService;
    private final EncryptionService encryptionService;
    private ModelAndView VIEW;

    @RequestMapping(value = "/workspace", method = RequestMethod.GET)
    public ModelAndView ChatWorkspace(HttpServletRequest request) {
        VIEW = new ModelAndView("chat/workspace");
        return VIEW;
    }

    @RequestMapping(value = "/channel/my", method = RequestMethod.GET)
    public ModelAndView MyChatRoom(HttpServletRequest request) throws Exception {
        VIEW = new ModelAndView("chat/channel-detail");
        HashMap<String, Object> hashMap = encryptionService.decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        Channel channel = chatService.getMyPrivateChannel(userNo);
        VIEW.addObject("channel", channel);
        // TODO MESSAGE 는 FETCH 로
        ArrayList<ChatMessage> chatMessages = chatService.getChannelMessages(channel.getNo(), userNo, null);
        VIEW.addObject("messages", chatMessages);
        VIEW.addObject("channel_hash",channel.getId());
        return VIEW;
    }

    @RequestMapping(value = "/channel/direct/{member_hash}", method = RequestMethod.GET)
    public ModelAndView DirectChatRoom(HttpServletRequest request, @PathVariable String member_hash) throws Exception {
        VIEW = new ModelAndView("chat/channel-detail");
        HashMap<String, Object> hashMap = encryptionService.decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        int target_member_no = Integer.parseInt(encryptionService.decryptAESWithSlash(member_hash));
        Channel channel = chatService.getDirectChannel(userNo, target_member_no);
        VIEW.addObject("channel", channel);
        // TODO MESSAGE 는 FETCH 로
        ArrayList<ChatMessage> chatMessages = chatService.getChannelMessages(channel.getNo(), userNo, null);
        VIEW.addObject("messages", chatMessages);
        VIEW.addObject("channel_hash",channel.getId());
        return VIEW;
    }

    @RequestMapping(value = "/channel/{channel_hash}", method = RequestMethod.GET)
    public ModelAndView ChatRoom(HttpServletRequest request, @PathVariable String channel_hash) throws Exception {
        VIEW = new ModelAndView("chat/channel-detail");
        HashMap<String, Object> hashMap = encryptionService.decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        String hash = "SRTOSoKrZ0q79uyoFX5N1A=="; // channel_no = 2
        int channel_no = Integer.parseInt(encryptionService.decryptAESWithSlash(hash));
        Channel channel = chatService.getChannelDetail(userNo, channel_no);
        VIEW.addObject("channel", channel);
        // TODO MESSAGE 는 FETCH 로
        return VIEW;
    }
}
