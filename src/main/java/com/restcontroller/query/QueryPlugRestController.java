package com.restcontroller.query;

import com.model.query.*;
import com.model.query.column.Column;
import com.model.query.column.Line;
import com.response.DefaultRes;
import com.response.Message;
import com.service.query.QueryPlugService;
import com.util.TokenGenerator;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/query")
public class QueryPlugRestController {
    private final QueryPlugService queryPlugService;

    /**
     * var requestOptions = {
     * method: 'GET',
     * redirect: 'follow'
     * };
     * <p>
     * fetch("http://localhost:8080/query/get/12/13/tables", requestOptions)
     * .then(response => response.text())
     * .then(result => console.log(result))
     * .catch(error => console.log('error', error));
     */
    @RequestMapping(value = "/get/{user_no}/{database_no}/tables", method = RequestMethod.GET)
    public ResponseEntity<String> getTables(@PathVariable("user_no") int user_no, @PathVariable("database_no") int database_no) {
        Message message = new Message();

        ArrayList<Table> tables = new ArrayList<>();
        //sample
        for (int i = 0; i < 10; i++) {
            tables.add(new Table().sampleTable());
        }
        message.put("tables", tables);

        ArrayList<Line> lines = new ArrayList<>();
        //sample
        for (int i = 0; i < 10; i++) {
            int random_index = TokenGenerator.RandomInteger(9);
            int random_index1 = TokenGenerator.RandomInteger(9);
            int random_index2 = TokenGenerator.RandomInteger(9);
            int random_index3 = TokenGenerator.RandomInteger(9);
            lines.add(new Line(tables.get(random_index).getId(),
                    tables.get(random_index).getColumns().get(random_index1).getId(),
                    tables.get(random_index2).getId(),
                    tables.get(random_index2).getColumns().get(random_index3).getId()));
        }
        message.put("lines", lines);

        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    /**
     * var myHeaders = new Headers();
     * myHeaders.append("Content-Type", "application/json");
     * <p>
     * var raw = JSON.stringify({
     * "id": "randomString",
     * "name": "randomString",
     * "position": {
     * "left": 400,
     * "top": 150
     * },
     * "columns": [
     * {
     * "id": "randomString",
     * "name": "randomString",
     * "type": "INT",
     * "pk": false,
     * "comment": null,
     * "auto_increment": false,
     * "nullable": false
     * }
     * ]
     * });
     * <p>
     * var requestOptions = {
     * method: 'POST',
     * headers: myHeaders,
     * body: raw
     * };
     * <p>
     * fetch("http://localhost:8080/query/create/12/table", requestOptions)
     * .then(response => response.text())
     * .then(result => console.log(result))
     * .catch(error => console.log('error', error));
     */
    @RequestMapping(value = "/create/{database_no}/table", method = RequestMethod.POST)
    public ResponseEntity<String> createTable(@PathVariable("database_no") int database_no, @RequestBody Table table) {
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    /**
     * var myHeaders = new Headers();
     * myHeaders.append("Content-Type", "application/json");
     * <p>
     * var raw = JSON.stringify({
     * "id": "randomString",
     * "name": "randomString",
     * "type": "INT",
     * "pk": false,
     * "auto_increment": false,
     * "nullable": false,
     * "comment": null
     * });
     * <p>
     * var requestOptions = {
     * method: 'POST',
     * headers: myHeaders,
     * body: raw
     * };
     * <p>
     * fetch("http://localhost:8080/query/create/12/table/table_id/row", requestOptions)
     * .then(response => response.text())
     * .then(result => console.log(result))
     * .catch(error => console.log('error', error));
     */
    @RequestMapping(value = "/create/{database_no}/table/{table_id}/row")
    public ResponseEntity<String> createTableRow(@PathVariable("database_no") int database_no, @PathVariable("table_id") String table_id, @RequestBody Column column) {
        log.info(column.toString());
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }
}
