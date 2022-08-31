package com.model.company;

import com.model.common.Time;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CompanyPlug extends Time {
    private int company_no;
    private int plug_no;
    private LocalDateTime revise_date;
}
