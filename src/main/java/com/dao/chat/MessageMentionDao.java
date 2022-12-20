package com.dao.chat;

import com.mapper.chat.MessageMentionMapper;
import com.model.chat.chatmessage.ChatMessage;
import com.model.chat.chatmessage.interactions.ChatMessageMention;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class MessageMentionDao {
    private final MessageMentionMapper mapper;
    private MessageMentionDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(MessageMentionMapper.class);
    }

    public void insertMessageMention(ChatMessageMention messageMention) {
        mapper.insertMessageMention(messageMention);
    }

    public void deleteMessageMention(ChatMessageMention messageMention) {
        mapper.deleteMessageMention(messageMention);
    }

    public ArrayList<ChatMessageMention> getMessageMentionsByMessageId(String chat_message_id) {
        return mapper.getMessageMentionsByMessageId(chat_message_id);
    }

    public ArrayList<ChatMessage> getUserMentionedMessages(int user_no) {
        return mapper.getUserMentionedMessages(user_no);
    }
}
