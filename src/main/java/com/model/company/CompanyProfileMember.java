package com.model.company;

import com.model.common.MFile;
import lombok.Data;

@Data
public class CompanyProfileMember {
    private int no;
    private String id;
    private String name;
    private MFile profile_img;
}
