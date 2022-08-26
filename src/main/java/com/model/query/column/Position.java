package com.model.query.column;

import com.util.TokenGenerator;
import lombok.Data;

@Data
public class Position {
    private int top;
    private int left;

    public Position samplePosition() {
        this.top = TokenGenerator.RandomInteger(1000) + 150;
        this.left = TokenGenerator.RandomInteger(5000) + 400;
        return this;
    }
}
