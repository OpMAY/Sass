package com.model.query.column;


import lombok.Data;

@Data
public class Line {
    private String to;
    private String to_row;
    private String from;
    private String from_row;

    public Line() {

    }

    public Line(String to, String to_row, String from, String from_row) {
        this.to = to;
        this.to_row = to_row;
        this.from = from;
        this.from_row = from_row;
    }
}
