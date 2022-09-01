package com.model.grant;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ROLE {
    OWNER("관리자"),
    PERSONAL("팀원"),
    READY("참여 요청");

    ROLE(String keyword) {
        this.keyword = keyword;
    }
    private final String keyword;

    public String getKeyword() {
        return keyword;
    }
}