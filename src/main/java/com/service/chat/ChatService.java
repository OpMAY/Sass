package com.service.chat;

import com.dao.CompanyDao;
import com.dao.CompanyMemberDao;
import com.dao.CompanyPlugDao;
import com.dao.UserDao;
import com.dao.chat.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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


}
