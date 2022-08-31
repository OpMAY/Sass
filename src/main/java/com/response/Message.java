package com.response;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;

import java.util.*;

@Data
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@Slf4j
public class Message {
    private Map<String, Object> map;

    public Message() {
        this.map = new HashMap<>();
    }

    public <T> Message put(String key, T object) {
        map.put(key, object);
        return this;
    }

    public <T> boolean pop(String key) {
        Set set = map.keySet();
        Iterator iterator = set.iterator();
        while (iterator.hasNext()) {
            boolean check = ((String) iterator.next()).equals(key) ? true : false;
            if (check) {
                map.remove(key);
                return true;
            }
            continue;
        }
        return false;
    }

    public Map<String, Object> getHashMap(boolean isLog) throws JSONException {
        if (isLog) {
            for (String key : map.keySet()) {
                String value;
                if (Objects.nonNull(map.get(key))) {
                    value = map.get(key).toString();
                } else {
                    value = null;
                }
                log.info("Message Map Value -> {},{}", key, value);
            }
        }
        return map;
    }

    public Map<String, Object> getHashMap() throws JSONException {
        return map;
    }
}