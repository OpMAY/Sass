package com.dao.chat;

import com.mapper.chat.MessageReactionMapper;
import com.model.chat.chatmessage.interactions.ChatMessageReaction;
import com.model.chat.chatmessage.interactions.ChatMessageReactionSummary;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class MessageReactionDao {
    private final MessageReactionMapper mapper;
    private MessageReactionDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(MessageReactionMapper.class);
    }

    /**
     * TODO 메세지 리액션 type이 지정되어 있다면 각 리액션 별 수를 불러오거나 하는 함수 제작
     * */

    public void insertMessageReaction(ChatMessageReaction messageReaction) {
        mapper.insertMessageReaction(messageReaction);
    }

    public void deleteMessageReaction(String chat_message_id, int user_no, String reaction) {
        mapper.deleteMessageReaction(chat_message_id, user_no, reaction);
    }

    public ArrayList<ChatMessageReaction> getMessageReactionsByMessageId(String chat_message_id) {
        return mapper.getMessageReactionsByMessageId(chat_message_id);
    }

    public ArrayList<ChatMessageReactionSummary> getMessageReactionSummary(String id, int user_no) {
        return mapper.getMessageReactionSummary(id, user_no);
    }

    public boolean checkUserMessageReacted(ChatMessageReaction messageReaction) {
        return mapper.checkUserMessageReacted(messageReaction);
    }
}
