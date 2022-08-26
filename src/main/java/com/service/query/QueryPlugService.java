package com.service.query;

import com.model.query.DataBase;
import com.util.query.ERDValidation;
import com.util.query.QueryMaker;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class QueryPlugService {
    private final String filePath = "";

    public boolean checkERDValid(DataBase dataBase) {
        return new ERDValidation(dataBase).checkAll();
    }

    /**
     * 모든 테이블 생성 쿼리 Create
     * {@code @Param}
     * @Return String QueryString
     **/
    public String createAllTableQuery(DataBase dataBase) {
        return new QueryMaker(dataBase, filePath).makeAllTableQuery();
    }

    public String createOneTableQuery(DataBase dataBase) {
        return new QueryMaker(dataBase, filePath).makeOneTableQuery("targetUUID");
    }

    public String createAllTableQueryFile(DataBase dataBase) {
        return new QueryMaker(dataBase, filePath).makeAllTableQueryFile();
    }
}
