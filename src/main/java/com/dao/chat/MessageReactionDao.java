package com.dao.chat;

import com.mapper.chat.MessageReactionMapper;
import com.model.chat.chatmessage.interactions.ChatMessageReaction;
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

    public void deleteMessageReaction(int chat_message_no, int user_no) {
        mapper.deleteMessageReaction(chat_message_no, user_no);
    }

    public ArrayList<ChatMessageReaction> getMessageReactionsByMessageNo(int chat_message_no) {
        return mapper.getMessageReactionsByMessageNo(chat_message_no);
    }
}
