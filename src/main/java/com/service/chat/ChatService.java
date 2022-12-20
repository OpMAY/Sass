package com.service.chat;

import com.dao.CompanyDao;
import com.dao.CompanyMemberDao;
import com.dao.CompanyPlugDao;
import com.dao.UserDao;
import com.dao.chat.*;
import com.model.User;
import com.model.chat.ChatProfileMember;
import com.model.chat.channel.CHANNEL_TYPE;
import com.model.chat.channel.Channel;
import com.model.chat.channel.ChannelLike;
import com.model.chat.channel.ChannelMember;
import com.model.chat.chatmessage.CHAT_MESSAGE_TYPE;
import com.model.chat.chatmessage.ChatMessage;
import com.model.chat.chatmessage.MessageThread;
import com.model.chat.chatmessage.interactions.ChatMessageMention;
import com.model.chat.chatmessage.interactions.ChatMessageReaction;
import com.model.chat.chatmessage.interactions.ChatMessageRead;
import com.model.chat.chatmessage.interactions.ChatMessageSave;
import com.model.company.Company;
import com.model.company.CompanyMember;
import com.model.company.CompanyMemberListData;
import com.model.company.CompanyProfileMember;
import com.util.Encryption.EncryptionService;
import com.util.TokenGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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
    private final EncryptionService encryptionService;


    @Transactional
    public void updateChannel(String name, int channel_no) {
        channelDao.updateChannel(name, channel_no);
    }

    @Transactional
    public void deleteChannel(int channel_no) {
        channelDao.deleteChannel(channel_no);
    }

    // TODO 4. 채널 좋아요 (Left) -> 우식
    @Transactional
    public void insertChannelLike(int channel_no, int user_no) {
        if (!channelLikeDao.isChannelLiked(channel_no, user_no)) {
            channelLikeDao.insertChannelLike(new ChannelLike(companyMemberDao.getUserMemberInfoByUserNo(user_no).getNo(), channel_no));
        }
    }

    // TODO 4. 채널 좋아요 삭제 (Left) -> 우식
    @Transactional
    public void deleteChannelLike(int channel_no, int user_no) {
        channelLikeDao.deleteChannelLike(user_no, channel_no);
    }

    @Transactional
    public void deleteMessage(String message_id, int user_no) {
        if (chatMessageDao.getChatMessageById(message_id).getCompany_member_no() == companyMemberDao.getUserMemberInfoByUserNo(user_no).getNo()) {
            // 내 메세지만 삭제
            chatMessageDao.deleteMessage(message_id);
        }
    }

    @Transactional
    public void editMessage(ChatMessage chatMessage, int user_no) {
        if (chatMessageDao.getChatMessageById(chatMessage.getId()).getCompany_member_no() == companyMemberDao.getUserMemberInfoByUserNo(user_no).getNo()) {
            // 내 메세지만 수정
            chatMessageDao.updateMessage(chatMessage);
        }
    }

    // TODO 5. Emoji 추가하기 (Main,Right) -> 우식, 8. Emoji 반응 및 해제 (Main, Right) -> 우식
    @Transactional
    public boolean addReactionOnMessage(int user_no, ChatMessageReaction messageReaction) {
        messageReaction.setCompany_member_no(companyMemberDao.getUserMemberInfoByUserNo(user_no).getNo());
        if (!messageReactionDao.checkUserMessageReacted(messageReaction)) {
            messageReactionDao.insertMessageReaction(messageReaction);
            return true;
        } else {
            return false;
        }
    }

    // TODO 6. Emoji 삭제하기 (Main,Right) -> 우식, 8. Emoji 반응 및 해제 (Main, Right) -> 우식
    @Transactional
    public void deleteReactionOnMessage(int user_no, ChatMessageReaction messageReaction) {
        messageReactionDao.deleteMessageReaction(messageReaction.getChat_message_id(), user_no, messageReaction.getReaction());
    }

    // TODO 7. Bookmark 설정 및 해제 (Main, Right) -> 우식
    @Transactional
    public boolean saveMessage(String message_id, int user_no) {
        if (!messageSaveDao.checkUserSavedMessage(message_id, user_no)) {
            messageSaveDao.saveMessage(new ChatMessageSave(message_id, companyMemberDao.getUserMemberInfo(user_no, companyMemberDao.getUserCompany(user_no).getNo()).getNo()));
            return true;
        } else {
            return false;
        }
    }

    // TODO 7. Bookmark 설정 및 해제 (Main, Right) -> 우식
    @Transactional
    public void deleteSavedMessage(String message_id, int user_no) {
        messageSaveDao.deleteSavedMessage(message_id, user_no);
    }

    @Transactional
    public Channel getMyPrivateChannel(int user_no) throws Exception {
        Channel channel = channelDao.getMyPrivateChannel(user_no);
        if (channel == null) {
            // CREATE
            channel = new Channel();
            channel.setType(CHANNEL_TYPE.MY);
            channel.setName(TokenGenerator.RandomToken(5));
            channel.setCompany_no(companyMemberDao.getUserCompany(user_no).getNo());
            channelDao.createChannel(channel);
            channelMemberDao.insertChannelMember(new ChannelMember(channel.getNo(), companyMemberDao.getUserMemberInfo(user_no, channel.getCompany_no()).getNo()));
        }
        // SET MESSAGE READ
        if (messageReadDao.checkChannelHasUnRead(channel.getNo(), user_no)) {
            messageReadDao.setAllChannelMessageRead(channel.getNo(), user_no);
        }
        formatChannel(user_no, channel);
        return channel;
    }

    @Transactional
    public Channel getDirectChannel(int user_no, int target_member_no) throws Exception {
        // TODO 유저 검증?
        Company company = companyMemberDao.getUserCompany(user_no);
        CompanyMember myMemberInfo = companyMemberDao.getUserMemberInfo(user_no, company.getNo());
        CompanyMember targetMember = companyMemberDao.getCompanyMemberInfoByMemberNo(target_member_no);
        if (channelDao.getTwoUserDirectChannel(user_no, targetMember.getUser_no()) != null) {
            return channelDao.getTwoUserDirectChannel(user_no, targetMember.getUser_no());
        }
        Channel channel = new Channel();
        // CHANNEL SET
        channel.setCompany_no(company.getNo());
        channel.setType(CHANNEL_TYPE.DIRECT);
        channel.setName(TokenGenerator.RandomToken(5));
        channelDao.createChannel(channel);
        // MEMBER SET
        channelMemberDao.insertChannelMember(new ChannelMember(channel.getNo(), myMemberInfo.getNo())); // 생성자
        channelMemberDao.insertChannelMember(new ChannelMember(channel.getNo(), targetMember.getNo())); // 상대
        // SET MESSAGE READ
        if (messageReadDao.checkChannelHasUnRead(channel.getNo(), user_no)) {
            messageReadDao.setAllChannelMessageRead(channel.getNo(), user_no);
        }
        formatChannel(user_no, channel);
        return channel;
    }

    @Transactional
    public Channel createGroupChannel(int company_no, String name) {
        if (channelDao.checkChannelNameDuplicateInCompany(company_no, name)) {
            // TODO Send on message?
            // message.put("status", false);
            log.info("name duplicated : {}", name);
            return null;
        }
        Channel channel = new Channel();
        channel.setName(name);
        channel.setCompany_no(company_no);
        channel.setType(CHANNEL_TYPE.GROUP);
        channelDao.createChannel(channel);
        // TODO 임시로 해당 멤버들 모두 멤버로 추가, 이후 멤버 개별 추가 구현 시 삭제
        List<CompanyMemberListData> companyMembers = companyMemberDao.getCompanyMemberList(company_no);
        for (CompanyMemberListData companyMember : companyMembers) {
            channelMemberDao.insertChannelMember(new ChannelMember(channel.getNo(), companyMember.getMember_no()));
        }
        return channel;
    }

    // TODO 3. Thread 가져오기 (Right) -> 지우씨
    public MessageThread getMessageThread(int user_no, String message_id, String last_message_id) {
        MessageThread messageThread = new MessageThread();
        ChatMessage chatMessage = chatMessageDao.getChatMessageById(message_id);
        formatChatMessage(user_no, chatMessage);
        ArrayList<ChatMessage> threadMessages;
        if (last_message_id != null) {
            threadMessages = chatMessageDao.getNextThreadMessages(message_id, last_message_id);
        } else {
            threadMessages = chatMessageDao.getThreadMessages(message_id);
        }
        for (ChatMessage message : threadMessages) {
            formatChatMessage(user_no, message);
        }
        messageThread.setMessage(chatMessage);
        messageThread.setMessages(threadMessages);
        return messageThread;
    }

    // TODO 2. channels, users 가져오기 (Left) -> 지우씨
    public ArrayList<Channel> getCompanyChannels(int user_no, int company_no) throws Exception {
        // GROUP CHANNEL 만 가져옴
        ArrayList<Channel> channels = channelDao.getChannelsByCompanyNo(company_no);
        for (Channel channel : channels) {
            formatChannel(user_no, channel);
        }
        return channels;
    }

    // TODO 2. channels, users 가져오기 (Left) -> 지우씨
    public ArrayList<ChatProfileMember> getChatMembers(int user_no, int company_no) throws Exception {
        ArrayList<ChatProfileMember> chatProfileMembers = new ArrayList<>();
        List<CompanyMemberListData> memberList = companyMemberDao.getCompanyMemberList(company_no);
        for (CompanyMemberListData companyMember : memberList) {
            User user = userDao.getUser(companyMember.getUser_no());
            ChatProfileMember chatProfileMember = new ChatProfileMember();
            chatProfileMember.setMember_no(companyMember.getMember_no());
            chatProfileMember.setId(encryptionService.encryptAES(Integer.toString(companyMember.getMember_no()), true));
            chatProfileMember.setName(user.getName());
            chatProfileMember.setProfile(user.getProfile_img());
            chatProfileMember.set_live(chatOnlineService.isUserOnline(user.getNo()));
            Channel direct = channelDao.getTwoUserDirectChannel(user_no, user.getNo());
            if (direct == null) {
                // 두 유저 사이의 다이렉트 채널이 아직 생성되지 않았을 때
                chatProfileMember.setAlarms(0);
            } else {
                chatProfileMember.setAlarms(messageReadDao.getChannelUnreadCount(direct.getNo(), user_no));
            }
            chatProfileMember.set_my(user.getNo() == user_no);
            if (chatProfileMember.is_my()) {
                chatProfileMembers.add(0, chatProfileMember);
            } else {
                chatProfileMembers.add(chatProfileMember);
            }
        }
        return chatProfileMembers;
    }

    public ArrayList<CompanyProfileMember> getChannelMembers(int channel_no) {
        return channelMemberDao.getChannelMembers(channel_no);
    }

    // TODO 1. channel 메세지 가져오기 (Main) -> 지우씨
    @Transactional
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
            formatChatMessage(user_no, chatMessage);
        }
        if (messageReadDao.checkChannelHasUnRead(channel_no, user_no)) {
            messageReadDao.setAllChannelMessageRead(channel_no, user_no);
        }
        return chatMessages;
    }

    public boolean checkChannelBelongToCompany(int channel_no, int company_no) {
        return channelDao.checkChannelBelongToCompany(channel_no, company_no);
    }

    // TODO 9. Message 보내기 (Main, Right) -> 지우씨, 10. File Message 보내기 (Main, Right) -> 지우씨
    @Transactional
    public ChatMessage sendMessage(ChatMessage chatMessage) {
        if (chatMessage.getParent_message_id() != null && chatMessageDao.checkParentIsThreadMessage(chatMessage.getParent_message_id())) {
            // Thread 내의 메세지에 추가 thread 생성 불가
            return null;
        }
        chatMessage.setId(TokenGenerator.RandomToken(6));
        while (chatMessageDao.checkIdDuplicated(chatMessage.getId())) {
            chatMessage.setId(TokenGenerator.RandomToken(6));
        }
        // message send
        chatMessageDao.sendMessage(chatMessage);
        // Set my message read
        messageReadDao.insertMessageRead(new ChatMessageRead(chatMessage.getId(), chatMessage.getCompany_member_no()));
        ChatMessage result = chatMessageDao.getChatMessageById(chatMessage.getId());
        formatChatMessage(companyMemberDao.getCompanyMemberInfoByMemberNo(chatMessage.getCompany_member_no()).getUser_no(), result);
        return result;
    }

    public Channel getChannelDetail(int user_no, int channel_no) throws Exception {
        Channel channel = channelDao.getChannelByNo(channel_no);
        formatChannel(user_no, channel);
        return channel;
    }

    @Transactional
    public void setMessageRead(String message_id, int user_no) {
        // 하나의 메세지만 읽음 처리 X, 메세지가 소속되어 있는 채널의 모든 message Read 처리하는 것
        ChatMessage chatMessage = chatMessageDao.getChatMessageById(message_id);
        if (messageReadDao.checkChannelHasUnRead(chatMessage.getChannel_no(), user_no)) {
            messageReadDao.setAllChannelMessageRead(chatMessage.getChannel_no(), user_no);
        }
    }

    private void formatChannel(int user_no, Channel channel) throws Exception {
        channel.setId(encryptionService.encryptAES(Integer.toString(channel.getNo()), true));
        channel.setAlarms(messageReadDao.getChannelUnreadCount(channel.getNo(), user_no));
        channel.setBookmark(channelLikeDao.isChannelLiked(channel.getNo(), user_no));
        channel.set_member(channelMemberDao.isUserChannelMember(channel.getNo(), user_no));
    }

    private void formatChatMessage(int user_no, ChatMessage chatMessage) {
        chatMessage.setCompanyProfileMember(companyMemberDao.getCompanyMemberProfile(chatMessage.getCompany_member_no()));
        chatMessage.setProfile(chatMessage.getCompanyProfileMember().getProfile_img());
        chatMessage.setName(chatMessage.getCompanyProfileMember().getName());
        chatMessage.setDate(chatMessage.getReg_datetime());
        chatMessage.setBookmark(messageSaveDao.checkUserSavedMessage(chatMessage.getId(), user_no));
        chatMessage.setThreads(chatMessageDao.getMessageThreadCount(chatMessage.getId()));
        chatMessage.setReaction_detail(messageReactionDao.getMessageReactionsByMessageId(chatMessage.getId()));
        chatMessage.setReactions(messageReactionDao.getMessageReactionSummary(chatMessage.getId(), user_no));
        if (chatMessage.getType().equals(CHAT_MESSAGE_TYPE.FILE)) {
            chatMessage.setFiles(chatMessage.getMessage_json().getFiles());
        }
        if (chatMessage.getMentions() != null && !chatMessage.getMentions().isEmpty()) {
            for (ChatMessageMention messageMention : chatMessage.getMentions()) {
                try {
                    messageMention.setMember_hash(encryptionService.encryptAES(Integer.toString(messageMention.getCompany_member_no()), true));
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
