package com.service.chat;

import com.dao.CompanyDao;
import com.dao.CompanyMemberDao;
import com.dao.CompanyPlugDao;
import com.dao.UserDao;
import com.dao.chat.*;
import com.model.chat.chatmessage.ChatMessage;
import com.model.chat.chatmessage.interactions.ChatMessageReaction;
import com.model.chat.chatmessage.interactions.ChatMessageReactionSummary;
import com.util.TokenGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    /**
     * Default Service Daos
     */
    private final CompanyDao companyDao;
    private final UserDao userDao;
    private final CompanyMemberDao companyMemberDao;
    private final CompanyPlugDao companyPlugDao;
    /**
     * Chat Related Daos
     */
    private final ChannelDao channelDao;
    private final ChatMessageDao chatMessageDao;
    private final ChannelLikeDao channelLikeDao;
    private final ChannelMemberDao channelMemberDao;
    private final MessageReactionDao messageReactionDao;
    private final MessageSaveDao messageSaveDao;
    private final MessageReadDao messageReadDao;
    /**
     * Chat (WebSocket) Related Services
     */
    private final ChatOnlineService chatOnlineService;

    public ArrayList<ChatMessage> getChannelMessages(int channel_no, int user_no, String last_message_id) {
        // ChatMessage get Example
        // SET profile
        ArrayList<ChatMessage> chatMessages;
        if (last_message_id != null && chatMessageDao.checkIdDuplicated(last_message_id)) {
            chatMessages = chatMessageDao.getChannelNextMessages(channel_no, last_message_id);
        } else {
            chatMessages = chatMessageDao.getChannelMessages(channel_no);
        }
        for (ChatMessage chatMessage : chatMessages) {
            chatMessage.setCompanyProfileMember(companyMemberDao.getCompanyMemberProfile(chatMessage.getCompany_member_no()));
            chatMessage.setProfile(chatMessage.getCompanyProfileMember().getProfile_img());
            chatMessage.setName(chatMessage.getCompanyProfileMember().getName());
            chatMessage.setDate(chatMessage.getReg_datetime());
            chatMessage.setBookmark(messageSaveDao.checkUserSavedMessage(chatMessage.getId(), user_no));
            chatMessage.setThreads(chatMessageDao.getMessageThreadCount(chatMessage.getId()));
            chatMessage.setReaction_detail(messageReactionDao.getMessageReactionsByMessageId(chatMessage.getId()));
            chatMessage.setReactions(messageReactionDao.getMessageReactionSummary(chatMessage.getId()));
        }
        return chatMessages;
    }

    public boolean checkChannelBelongToCompany(int channel_no, int company_no) {
        return channelDao.checkChannelBelongToCompany(channel_no, company_no);
    }

    @Transactional
    public ChatMessage sendMessage(ChatMessage chatMessage) {
        chatMessage.setId(TokenGenerator.RandomToken(6));
        while (chatMessageDao.checkIdDuplicated(chatMessage.getId())) {
            chatMessage.setId(TokenGenerator.RandomToken(6));
        }
        chatMessageDao.sendMessage(chatMessage);
        return chatMessageDao.getChatMessageById(chatMessage.getId());
    }
}
