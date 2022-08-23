package com.controller.query;

import com.service.query.QueryPlugService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@AllArgsConstructor
public class QueryPlugController {
    private final QueryPlugService queryPlugService;


}
