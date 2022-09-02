package com.model.grant;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ROLE {
    OWNER("OWNER", "관리자"),
    PERSONAL("PERSONAL", "팀원"),
    READY("READY", "참여 요청");

    ROLE(String name, String keyword) {
        this.name = name;
        this.keyword = keyword;
    }

    private final String keyword;
    private final String name;

    public String getKeyword() {
        return keyword;
    }

    public String getName() {
        return name;
    }
}