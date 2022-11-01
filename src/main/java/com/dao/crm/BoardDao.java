package com.dao.crm;

import com.mapper.crm.BoardMapper;
import com.model.crm.Board;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BoardDao {
    private BoardMapper mapper;
    private BoardDao(SqlSession sqlSession) {
        this.mapper = sqlSession.getMapper(BoardMapper.class);
    }

    public List<Board> getProjectBoards(int project_no) {
        return mapper.getProjectBoards(project_no);
    }

    public boolean checkTokenIdAbleToUse(String token_id) {
        return mapper.checkTokenIdAbleToUse(token_id);
    }

    public void createBoard(Board board) {
        mapper.createBoard(board);
    }

    public void copyBoard(Board board) {
        mapper.copyBoard(board);
    }

    public void changeBoardName(String board_id, String name) {
        mapper.changeBoardName(board_id, name);
    }

    public void deleteBoard(String board_id) {
        mapper.deleteBoard(board_id);
    }

    public Board getBoardById(String board_id) {
        return mapper.getBoardById(board_id);
    }

    public void updateBoardOrder(String id, int order) {
        mapper.updateBoardOrder(id, order);
    }
}
