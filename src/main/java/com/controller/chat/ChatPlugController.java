package com.controller.chat;

import com.service.chat.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@RequestMapping("/chat")
@Controller
@Slf4j
@RequiredArgsConstructor
public class ChatPlugController {
    private final ChatService chatService;
    private ModelAndView VIEW;

    @RequestMapping(value = "/workspace", method = RequestMethod.GET)
    public ModelAndView ChatWorkspace(HttpServletRequest request) {
        VIEW = new ModelAndView("chat/workspace");
        return VIEW;
    }
}
