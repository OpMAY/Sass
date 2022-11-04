package com.mapper;

import org.apache.ibatis.annotations.Param;

public interface CompanyPlugMapper {
    boolean isPlugRegistered(@Param("company_no") int company_no, @Param("plug_no") int plug_no);
}
