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
}
