package com.middleware;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.type.Alias;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.json.JSONArray;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Alias("JsonArrayObjectTypeHandler")
public class JsonArrayObjectTypeHandler<T> extends BaseTypeHandler<ArrayList<T>> {

    private Class<T> type;

    public JsonArrayObjectTypeHandler(Class<T> type) {
        if (type == null) throw new IllegalArgumentException("Type argument cannot be null");
        this.type = type;
    }

    @Override
    public void setNonNullParameter(PreparedStatement preparedStatement, int i, ArrayList<T> t, JdbcType jdbcType) throws SQLException {
        preparedStatement.setString(i, new Gson().toJson(t));
    }

    @Override
    public ArrayList<T> getNullableResult(ResultSet resultSet, String s) throws SQLException {
        //log.info("getNullableResult +s: " + s + resultSet.getString(s));
        return convertToObject(resultSet.getString(s));
    }

    @Override
    public ArrayList<T> getNullableResult(ResultSet resultSet, int i) throws SQLException {
        //log.info("getNullableResult +i: " + i + resultSet.getString(i));
        return convertToObject(resultSet.getString(i));
    }

    @Override
    public ArrayList<T> getNullableResult(CallableStatement callableStatement, int i) throws SQLException {
        //log.info("getNullableResult +CallableStatement: " + i + callableStatement.getString(i));
        return convertToObject(callableStatement.getString(i));
    }

    private ArrayList<T> convertToObject(String jsonString) {
        try {
            if(jsonString != null) {
                JSONArray jsonArray = new JSONArray(jsonString);
                Class<?> findClass = type;
                log.info("findClass : {}", findClass);
                if (jsonArray.length() != 0) {
                    ArrayList<T> arrayList = new ArrayList<>();
                    for (int i = 0; i < jsonArray.length(); i++) {
                        log.info("i : {}, jsonArray : {}", i, jsonArray.getJSONObject(i));
                        arrayList.add((T) new ObjectMapper().readValue(jsonArray.getJSONObject(i).toString(), findClass));
                    }
                    return arrayList;
                } else {
                    return new ArrayList<T>();
                }
            } else {
                return new ArrayList<T>();
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error("JsonArrayObjectTypeHandler failed to casting jsonString to List<Object>, JSON String : " + jsonString, e);
        }
        return new ArrayList<T>();
    }
}
