package com.service.chat;

import com.dao.CompanyDao;
import com.dao.CompanyMemberDao;
import com.dao.CompanyPlugDao;
import com.dao.UserDao;
import com.dao.chat.*;
import com.model.chat.chatmessage.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatService {
    /** Default Service Daos */
    private final CompanyDao companyDao;
    private final UserDao userDao;
    private final CompanyMemberDao companyMemberDao;
    private final CompanyPlugDao companyPlugDao;
    /** Chat Related Daos */
    private final ChannelDao channelDao;
    private final ChatMessageDao chatMessageDao;
    private final ChannelLikeDao channelLikeDao;
    private final ChannelMemberDao channelMemberDao;
    private final MessageReactionDao messageReactionDao;
    private final MessageSaveDao messageSaveDao;
    private final MessageReadDao messageReadDao;
    /** Chat (WebSocket) Related Services */
    private final ChatOnlineService chatOnlineService;

    public ArrayList<ChatMessage> getChannelMessages(int channel_no) {
        // ChatMessage get Example
        // SET profile
        ArrayList<ChatMessage> chatMessages = chatMessageDao.getChannelMessages(channel_no);
        for(ChatMessage chatMessage : chatMessages) {
            chatMessage.setCompanyProfileMember(companyMemberDao.getCompanyMemberProfile(chatMessage.getCompany_member_no()));
        }
        return chatMessages;
    }

    public boolean checkChannelBelongToCompany(int channel_no, int company_no) {
        return channelDao.checkChannelBelongToCompany(channel_no, company_no);
    }
}
