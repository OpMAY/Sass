package com.mapper.crm;

import com.model.crm.Board;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BoardMapper {
    List<Board> getProjectBoards(int project_no);

    boolean checkTokenIdAbleToUse(String token_id);

    void createBoard(Board board);

    void copyBoard(Board board);

    void changeBoardName(@Param("board_id") String board_id, @Param("name") String name);

    void deleteBoard(String board_id);

    Board getBoardById(String board_id);

    void updateBoardOrder(@Param("id") String id, @Param("order") int order);
}
