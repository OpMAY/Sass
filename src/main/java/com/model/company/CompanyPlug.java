package com.model.company;

import com.model.common.Time;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CompanyPlug extends Time {
    private int companyNo;
    private int plugNo;
    private LocalDateTime revise_date;
}
