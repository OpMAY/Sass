package com.restcontroller.query;

import com.model.query.*;
import com.model.query.column.Column;
import com.model.query.column.Line;
import com.model.query.column.Position;
import com.model.query.column.Relation;
import com.model.queue.Token;
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
import java.util.List;
import java.util.Objects;

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
    @RequestMapping(value = "/get/{database_no}/tables", method = RequestMethod.GET)
    public ResponseEntity<String> getTables(@PathVariable("database_no") int database_no) {
        Message message = new Message();

        DataBase dataBase = queryPlugService.getDataBase(database_no);

        List<Table> tables = dataBase.getTables();
//        //sample
//        for (int i = 0; i < 10; i++) {
//            tables.add(new Table().sampleTable());
//        }
        message.put("tables", tables);

        ArrayList<Line> lines = new ArrayList<>();
//        //sample
//        for (int i = 0; i < 10; i++) {
//            int random_index = TokenGenerator.RandomInteger(9);
//            int random_index1 = TokenGenerator.RandomInteger(9);
//            int random_index2 = TokenGenerator.RandomInteger(9);
//            int random_index3 = TokenGenerator.RandomInteger(9);
//            lines.add(new Line(tables.get(random_index).getId(),
//                    tables.get(random_index).getColumns().get(random_index1).getId(),
//                    tables.get(random_index2).getId(),
//                    tables.get(random_index2).getColumns().get(random_index3).getId()));
//        }
        if (Objects.nonNull(dataBase.getRelations()) && !dataBase.getRelations().isEmpty()) {
            for (Relation relation : dataBase.getRelations()) {
                lines.add(new Line(relation.getMain_table(),
                        relation.getMain_column(),
                        relation.getTarget_table(),
                        relation.getTarget_column()));
            }
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
    @RequestMapping(value = "/create/{database_no}/table/{table_id}/row", method = RequestMethod.POST)
    public ResponseEntity<String> createTableRow(@PathVariable("database_no") int database_no, @PathVariable("table_id") String table_id, @RequestBody Column column) {
        log.info(column.toString());
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    /**
     * var myHeaders = new Headers();
     * myHeaders.append("Content-Type", "application/json");
     * <p>
     * var raw = JSON.stringify({
     * "name": "update_name",
     * "position": {
     * "left": 1400,
     * "top": 200
     * }
     * });
     * <p>
     * var requestOptions = {
     * method: 'POST',
     * headers: myHeaders,
     * body: raw,
     * };
     * <p>
     * fetch("http://localhost:8080/query/update/10/table/randomString", requestOptions)
     * .then(response => response.text())
     * .then(result => console.log(result))
     * .catch(error => console.log('error', error));
     */
    @RequestMapping(value = "/update/{database_no}/table/{table_id}", method = RequestMethod.POST)
    public ResponseEntity<String> updateTableName(@PathVariable("database_no") int database_no, @PathVariable("table_id") String table_id, @RequestBody Table table) {
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
     * "comment": "comment test"
     * });
     * <p>
     * var requestOptions = {
     * method: 'POST',
     * headers: myHeaders,
     * body: raw,
     * };
     * <p>
     * fetch("http://localhost:8080/query/update/11/table/table_id/row", requestOptions)
     * .then(response => response.text())
     * .then(result => console.log(result))
     * .catch(error => console.log('error', error));
     */
    @RequestMapping(value = "/update/{database_no}/table/{table_id}/row", method = RequestMethod.POST)
    public ResponseEntity<String> updateTableRow(@PathVariable("database_no") int database_no, @PathVariable("table_id") String table_id, @RequestBody Column column) {
        log.info(column.toString());
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    /**
     * var myHeaders = new Headers();
     * myHeaders.append("Content-Type", "application/json");
     * <p>
     * var raw = JSON.stringify({
     * "position": {
     * "left": 400,
     * "top": 600
     * }
     * });
     * <p>
     * var requestOptions = {
     * method: 'POST',
     * headers: myHeaders,
     * body: raw,
     * };
     * <p>
     * fetch("http://localhost:8080/query/update/10/table/table_id/position", requestOptions)
     * .then(response => response.text())
     * .then(result => console.log(result))
     * .catch(error => console.log('error', error));
     */
    @RequestMapping(value = "/update/{database_no}/table/{table_id}/position", method = RequestMethod.POST)
    public ResponseEntity<String> updateTablePosition(@PathVariable("database_no") int database_no, @PathVariable("table_id") String table_id, @RequestBody Position position) {
        log.info(position.toString());
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    /**
     * var myHeaders = new Headers();
     * myHeaders.append("Content-Type", "application/json");
     * <p>
     * var raw = JSON.stringify([
     * {
     * "id": "randomString",
     * "position": {
     * "left": 400,
     * "top": 150
     * }
     * },
     * {
     * "id": "randomString",
     * "position": {
     * "left": 400,
     * "top": 150
     * }
     * },
     * {
     * "id": "randomString",
     * "position": {
     * "left": 400,
     * "top": 150
     * }
     * }
     * ]);
     * <p>
     * var requestOptions = {
     * method: 'POST',
     * headers: myHeaders,
     * body: raw,
     * };
     * <p>
     * fetch("http://localhost:8080/query/update/10/table/positions", requestOptions)
     * .then(response => response.text())
     * .then(result => console.log(result))
     * .catch(error => console.log('error', error));
     */
    @RequestMapping(value = "/update/{database_no}/table/positions", method = RequestMethod.POST)
    public ResponseEntity<String> updateTablesPosition(@PathVariable("database_no") int database_no, @RequestBody ArrayList<Table> tables) {
        log.info(tables.toString());
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    /**
     * var myHeaders = new Headers();
     * myHeaders.append("Content-Type", "application/json");
     * <p>
     * var raw = JSON.stringify([
     * {
     * "id": "randomString",
     * "name": "randomString",
     * "order": 1
     * },
     * {
     * "id": "randomString",
     * "name": "randomString",
     * "order": 2
     * },
     * {
     * "id": "randomString",
     * "name": "randomString",
     * "order": 3
     * },
     * {
     * "id": "randomString",
     * "name": "randomString",
     * "order": 4
     * }
     * ]);
     * <p>
     * var requestOptions = {
     * method: 'POST',
     * headers: myHeaders,
     * body: raw,
     * };
     * <p>
     * fetch("http://localhost:8080/query/update/10/table/table_id/rows", requestOptions)
     * .then(response => response.text())
     * .then(result => console.log(result))
     * .catch(error => console.log('error', error));
     */
    @RequestMapping(value = "/update/{database_no}/table/{table_id}/rows", method = RequestMethod.POST)
    public ResponseEntity<String> updateTableRowsOrder(@PathVariable("database_no") int database_no, @PathVariable("table_id") String table_id, @RequestBody ArrayList<Column> columns) {
        log.info(columns.toString());
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    /**
     * var myHeaders = new Headers();
     * myHeaders.append("Content-Type", "application/json");
     * <p>
     * var requestOptions = {
     * method: 'POST',
     * headers: myHeaders,
     * };
     * <p>
     * fetch("http://localhost:8080/query/delete/10/table/table_id", requestOptions)
     * .then(response => response.text())
     * .then(result => console.log(result))
     * .catch(error => console.log('error', error));
     */
    @RequestMapping(value = "/delete/{database_no}/table/{table_id}", method = RequestMethod.POST)
    public ResponseEntity<String> deleteTable(@PathVariable("database_no") int database_no, @PathVariable("table_id") String table_id) {
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    /**
     * var myHeaders = new Headers();
     * myHeaders.append("Content-Type", "application/json");
     * <p>
     * var requestOptions = {
     * method: 'POST',
     * headers: myHeaders,
     * };
     * <p>
     * fetch("http://localhost:8080/query/delete/10/table/table_id/row/row_id", requestOptions)
     * .then(response => response.text())
     * .then(result => console.log(result))
     * .catch(error => console.log('error', error));
     */
    @RequestMapping(value = "/delete/{database_no}/table/{table_id}/row/{row_id}", method = RequestMethod.POST)
    public ResponseEntity<String> deleteTableRow(@PathVariable("database_no") int database_no, @PathVariable("table_id") String table_id, @PathVariable("row_id") String row_id) {
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    /**
     * var myHeaders = new Headers();
     * myHeaders.append("Content-Type", "application/json");
     * myHeaders.append("Cookie", "JSESSIONID=E09FA50909AA6D0BF22FD8FD9FB822B0");
     * <p>
     * var raw = JSON.stringify({
     * "to": "n2o6n9gv",
     * "to_row": "292kcffs",
     * "from": "723x330e",
     * "from_row": "8tff3pup"
     * });
     * <p>
     * var requestOptions = {
     * method: 'POST',
     * headers: myHeaders,
     * body: raw,
     * };
     * <p>
     * fetch("http://localhost:8080/query/create/10/table/table_id/line", requestOptions)
     * .then(response => response.text())
     * .then(result => console.log(result))
     * .catch(error => console.log('error', error));
     */
    @RequestMapping(value = "/create/{database_no}/line", method = RequestMethod.POST)
    public ResponseEntity<String> connectLine(@PathVariable("database_no") int database_no, @RequestBody Line line) {
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    /**
     * var myHeaders = new Headers();
     * myHeaders.append("Content-Type", "application/json");
     * myHeaders.append("Cookie", "JSESSIONID=E09FA50909AA6D0BF22FD8FD9FB822B0");
     * <p>
     * var raw = JSON.stringify([
     * {
     * "to": "n2o6n9gv",
     * "to_row": "292kcffs",
     * "from": "723x330e",
     * "from_row": "8tff3pup"
     * },
     * {
     * "to": "n2o6n9gv",
     * "to_row": "292kcffs",
     * "from": "723x330e",
     * "from_row": "8tff3pup"
     * }
     * ]);
     * <p>
     * var requestOptions = {
     * method: 'POST',
     * headers: myHeaders,
     * body: raw,
     * };
     * <p>
     * fetch("http://localhost:8080/query/delete/10/table/table_id/lines", requestOptions)
     * .then(response => response.text())
     * .then(result => console.log(result))
     * .catch(error => console.log('error', error));
     */
    @RequestMapping(value = "/delete/{database_no}/lines", method = RequestMethod.POST)
    public ResponseEntity<String> disconnectLine(@PathVariable("database_no") int database_no, @RequestBody ArrayList<Line> lines) {
        log.info(lines.toString());
        Message message = new Message();
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/create/{database_no}/{type}/next/id", method = RequestMethod.POST)
    public ResponseEntity<String> createNextId(@PathVariable("database_no") int database_no, @PathVariable("type") String type) {
        String token = null;
        if (type.equals("table")) {
            token = TokenGenerator.RandomToken(8);
        } else if (type.equals("row")) {
            token = TokenGenerator.RandomToken(6);
        }
        Message message = new Message();
        message.put("id", token);
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }
}
