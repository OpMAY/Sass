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
import com.util.Encryption.EncryptionService;
import com.util.TokenGenerator;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/query")
public class QueryPlugRestController {
    private final QueryPlugService queryPlugService;
    private final EncryptionService encryptionService;

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
    public ResponseEntity<String> getTables(@PathVariable("database_no") String database_hash) throws Exception {
        Message message = new Message();
        int database_no = Integer.parseInt(encryptionService.decryptAESWithSlash(database_hash));
        DataBase dataBase = queryPlugService.getDataBase(database_no);
        List<Table> tables = dataBase.getTables();
        message.put("tables", tables);

        ArrayList<Line> lines = new ArrayList<>();
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
    public ResponseEntity<String> createTable(@PathVariable("database_no") String database_hash, @RequestBody Table table) throws Exception {
        int database_no = Integer.parseInt(encryptionService.decryptAESWithSlash(database_hash));
        Message message = new Message();
        queryPlugService.createTable(database_no, table);
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
    public ResponseEntity<String> createTableRow(@PathVariable("database_no") String database_hash, @PathVariable("table_id") String table_id, @RequestBody Column column) throws Exception {
        log.info(column.toString());
        int database_no = Integer.parseInt(encryptionService.decryptAESWithSlash(database_hash));
        Message message = new Message();
        queryPlugService.createTableRow(database_no, table_id, column);
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
    public ResponseEntity<String> updateTableName(@PathVariable("database_no") String database_hash, @PathVariable("table_id") String table_id, @RequestBody Table table) throws Exception {
        int database_no = Integer.parseInt(encryptionService.decryptAESWithSlash(database_hash));
        Message message = new Message();
        queryPlugService.updateTableName(database_no, table_id, table);
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
    public ResponseEntity<String> updateTableRow(@PathVariable("database_no") String database_hash, @PathVariable("table_id") String table_id, @RequestBody Column column) throws Exception {
        log.info(column.toString());
        int database_no = Integer.parseInt(encryptionService.decryptAESWithSlash(database_hash));
        Message message = new Message();
        queryPlugService.updateTableRow(database_no, table_id, column);
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
    public ResponseEntity<String> updateTablePosition(@PathVariable("database_no") String database_hash, @PathVariable("table_id") String table_id, @RequestBody Position position) throws Exception {
        log.info(position.toString());
        int database_no = Integer.parseInt(encryptionService.decryptAESWithSlash(database_hash));
        Message message = new Message();
        queryPlugService.updateTablePosition(database_no, table_id, position);
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
    public ResponseEntity<String> updateTablesPosition(@PathVariable("database_no") String database_hash, @RequestBody ArrayList<Table> tables) throws Exception {
        log.info(tables.toString());
        int database_no = Integer.parseInt(encryptionService.decryptAESWithSlash(database_hash));
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
    public ResponseEntity<String> updateTableRowsOrder(@PathVariable("database_no") String database_hash, @PathVariable("table_id") String table_id, @RequestBody ArrayList<Column> columns) throws Exception {
        log.info(columns.toString());
        int database_no = Integer.parseInt(encryptionService.decryptAESWithSlash(database_hash));
        Message message = new Message();
        queryPlugService.updateTableRowsOrder(database_no, table_id, columns);
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
    public ResponseEntity<String> deleteTable(@PathVariable("database_no") String database_hash, @PathVariable("table_id") String table_id) throws Exception {
        int database_no = Integer.parseInt(encryptionService.decryptAESWithSlash(database_hash));
        Message message = new Message();
        queryPlugService.deleteTable(database_no, table_id);
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
    public ResponseEntity<String> deleteTableRow(@PathVariable("database_no") String database_hash, @PathVariable("table_id") String table_id, @PathVariable("row_id") String row_id) throws Exception {
        int database_no = Integer.parseInt(encryptionService.decryptAESWithSlash(database_hash));
        Message message = new Message();
        queryPlugService.deleteTableRow(database_no, table_id, row_id);
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
    public ResponseEntity<String> connectLine(@PathVariable("database_no") String database_hash, @RequestBody Line line) throws Exception {
        int database_no = Integer.parseInt(encryptionService.decryptAESWithSlash(database_hash));
        Message message = new Message();
        queryPlugService.connectLine(database_no, line);
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
    public ResponseEntity<String> disconnectLine(@PathVariable("database_no") String database_hash, @RequestBody ArrayList<Line> lines) throws Exception {
        log.info(lines.toString());
        int database_no = Integer.parseInt(encryptionService.decryptAESWithSlash(database_hash));
        Message message = new Message();
        queryPlugService.disconnectLine(database_no, lines);
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/create/{database_no}/{type}/next/id", method = RequestMethod.POST)
    public ResponseEntity<String> createNextId(@PathVariable("database_no") String database_hash, @PathVariable("type") String type) throws Exception {
        int database_no = Integer.parseInt(encryptionService.decryptAESWithSlash(database_hash));
        String token = null;
        do {
            if (type.equals("table")) {
                token = TokenGenerator.RandomToken(8);
            } else if (type.equals("row")) {
                token = TokenGenerator.RandomToken(6);
            }
        } while (!queryPlugService.checkTokenValid(database_no, token));
        Message message = new Message();
        message.put("id", token);
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/get/databases", method = RequestMethod.GET)
    public ResponseEntity<String> getDatabases(HttpServletRequest request) {
        int company_no = 2; //company_no session을 통해서 얻어온다.
        ArrayList<DataBase> dataBases = queryPlugService.getDatabases(company_no);
        dataBases.forEach(dataBase -> {
            try {
                dataBase.setHash_no(encryptionService.encryptAES(Integer.toString(dataBase.getNo()), true));
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
        Message message = new Message();
        message.put("databases", dataBases);
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/create/databases", method = RequestMethod.POST)
    public ResponseEntity<String> createDatabase(HttpServletRequest request, @RequestBody DataBase dataBase) throws Exception {
        int company_no = 2; //company_no session을 통해서 얻어온다.
        dataBase.setCompany_no(company_no);
        int status = queryPlugService.createDataBase(dataBase);
        Message message = new Message();
        dataBase.setHash_no(encryptionService.encryptAES(Integer.toString(dataBase.getNo()), true));
        message.put("status", status);
        message.put("database", dataBase);
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    @RequestMapping(value = "/get/database/validation/{id}", method = RequestMethod.GET)
    public ResponseEntity<String> getDatabaseValidation(HttpServletRequest request, @PathVariable String id) throws Exception {
        int decryptedNo = Integer.parseInt(encryptionService.decryptAESWithSlash(id));
        Message message = queryPlugService.checkDatabaseValid(decryptedNo);
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }
}
