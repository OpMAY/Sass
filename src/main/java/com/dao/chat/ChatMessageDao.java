package com.dao.chat;

import com.mapper.chat.ChatMessageMapper;
import com.model.chat.chatmessage.ChatMessage;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class ChatMessageDao {
    private final ChatMessageMapper mapper;
    private ChatMessageDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(ChatMessageMapper.class);
    }

    public void sendMessage(ChatMessage chatMessage) {
        mapper.sendMessage(chatMessage);
    }

    public void deleteMessage(int no) {
        mapper.deleteMessage(no);
    }

    public void updateMessage(ChatMessage chatMessage) {
        mapper.updateMessage(chatMessage);
    }

    public ArrayList<ChatMessage> getChannelMessages(int channel_no) {
        return mapper.getChannelMessages(channel_no);
    }

    public ArrayList<ChatMessage> getChannelNextMessages(int channel_no, int last_message_no) {
        return mapper.getChannelNextMessages(channel_no, last_message_no);
    }

    public ChatMessage getChannelLastMessage(int channel_no) {
        return mapper.getChannelLastMessage(channel_no);
    }

    public ChatMessage getChatMessageByNo(int no) {
        return mapper.getChatMessageByNo(no);
    }

}
