package com.exception;

import com.exception.enums.BaseExceptionType;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class PlugAccessDeniedException extends RuntimeException {
    @Getter
    private BaseExceptionType exceptionType;

    public PlugAccessDeniedException(BaseExceptionType exceptionType) {
        super(exceptionType.getErrorMessage());
        this.exceptionType = exceptionType;
    }
}
