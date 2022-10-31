package com.mapper.crm;

import com.model.crm.Board;

import java.util.List;

public interface BoardMapper {
    List<Board> getProjectBoards(int project_no);

    boolean checkTokenIdAbleToUse(String token_id);

    void createBoard(Board board);

    void copyBoard(Board board);
}
