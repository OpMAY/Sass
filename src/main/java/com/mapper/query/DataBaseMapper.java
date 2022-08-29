package com.mapper.query;

import com.model.query.DataBase;
import org.apache.ibatis.annotations.Param;

public interface DataBaseMapper {
    DataBase getDataBase(int database_no);

    void createDataBase(DataBase dataBase);

    boolean checkDataBaseExists(@Param("database_no") int database_no);

    boolean checkDataBaseNameExistsOnSameCompany(@Param("company_no") int company_no, @Param("name") String name);
}
