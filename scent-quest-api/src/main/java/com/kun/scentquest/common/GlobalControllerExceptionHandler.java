package com.kun.scentquest.common;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalControllerExceptionHandler {

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseBody
    public String handleAccessDeniedException(AccessDeniedException ex) {
        return "Access denied you don't have permission for this resource";
    }
}