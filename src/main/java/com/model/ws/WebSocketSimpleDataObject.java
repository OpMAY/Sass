package com.model.ws;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public abstract class WebSocketSimpleDataObject {
    // TODO ADD CATEGORY, SUBCATEGORY DEPENDS ON PLUG
    private Object data;
    private LocalDateTime reg_datetime;
    private LocalDateTime updated_datetime;
}
