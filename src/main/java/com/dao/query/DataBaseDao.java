package com.dao.query;

import com.mapper.query.DataBaseMapper;
import com.model.query.DataBase;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public class DataBaseDao {
    private final DataBaseMapper mapper;

    public DataBaseDao(SqlSession sqlSession){
        mapper = sqlSession.getMapper(DataBaseMapper.class);
    }

    public DataBase getDataBase(int database_no) {
        return mapper.getDataBase(database_no);
    }

    public void createDataBase(DataBase dataBase) {
        mapper.createDataBase(dataBase);
    }

    public boolean checkDataBaseExists(int database_no) {
        return mapper.checkDataBaseExists(database_no);
    }

    public boolean checkDataBaseNameExistsOnSameCompany(int company_no, String name) {
        return mapper.checkDataBaseNameExistsOnSameCompany(company_no, name);
    }

    public boolean checkTokenValid( int database_no, String token) {
        return mapper.checkTokenValid(database_no, token);
    }

    public ArrayList<DataBase> getDatabases(int company_no) {
        return mapper.getDatabases(company_no);
    }
}
