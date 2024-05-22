package com.kun.scentquest.email;

import lombok.Getter;

@Getter
public enum EmailTemplateName {

    ACTIVATE_ACCOUNT("activate_account"),
    RESET_PASSWORD("reset-password"),
    DISCOUNT_COUPON("discount_coupon")
    ;

    private final String name;
    EmailTemplateName(String name) {
        this.name = name;
    }
}