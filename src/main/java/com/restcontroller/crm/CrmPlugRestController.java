package com.restcontroller.crm;

import com.aws.file.FileUploadUtility;
import com.dao.CompanyDao;
import com.dao.CompanyMemberDao;
import com.dao.crm.BoardDao;
import com.dao.crm.TaskDao;
import com.dao.crm.TaskMemberDao;
import com.google.gson.Gson;
import com.model.common.MFile;
import com.model.company.Company;
import com.model.company.CompanyMember;
import com.model.company.CompanyProfileMember;
import com.model.crm.*;
import com.model.crm.state.TASK_STATUS_TYPE;
import com.response.DefaultRes;
import com.response.Message;
import com.service.CompanyService;
import com.service.crm.CrmService;
import com.util.Constant;
import com.util.Encryption.EncryptionService;
import com.util.Encryption.JWTEnum;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/crm")
public class CrmPlugRestController {
    @Value("{S3}")
    private String aws_s3_url;
    private final CompanyDao companyDao;
    private final CompanyMemberDao companyMemberDao;
    private final CompanyService companyService;
    private final CrmService crmService;
    private final EncryptionService encryptionService;
    private final BoardDao boardDao;
    private final TaskDao taskDao;
    private final FileUploadUtility uploadUtility;
    private final TaskMemberDao taskMemberDao;

    // Project

    // TODO 20221102 1번 - 지우 O
    @RequestMapping(value = "/get/projects", method = GET)
    public ResponseEntity getProjects(HttpServletRequest request) {
        Message message = new Message();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (userNo != null) {
            Company company = companyMemberDao.getUserCompany(userNo);
            if (company != null) {
                message.put("status", true);
                message.put("projects", crmService.getCompanyProjects(company.getNo()));
            } else {
                message.put("status", false);
                message.put("error_message", "데이터를 불러올 수 없습니다.");
            }
        } else {
            message.put("status", false);
            message.put("error_message", "데이터를 불러올 수 없습니다.");
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    // TODO 20221102 2번 - 우식, 지우
    @RequestMapping(value = "/project/{hash}/data", method = GET)
    public ResponseEntity getProjectDetailData(@PathVariable String hash) throws Exception {
        Message message = new Message();
        int project_no = Integer.parseInt(encryptionService.decryptAESWithSlash(hash));
        message.put("status", true);
        message.put("project", crmService.getProjectDashBoardData(project_no));
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    // TODO 20221102 3번 - 지우 O
    @RequestMapping(value = "/get/member/tasks", method = GET)
    public ResponseEntity getMemberTasks(@RequestParam("type") TASK_STATUS_TYPE type, HttpServletRequest request) {
        Message message = new Message();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (userNo != null) {
            Company company = companyMemberDao.getUserCompany(userNo);
            if (company != null) {
                CompanyMember companyMember = companyMemberDao.getUserMemberInfo(userNo, company.getNo());
                message.put("tasks", crmService.getMemberTasks(companyMember.getNo(), type));
                message.put("status", true);
            } else {
                message.put("status", false);
                message.put("error_message", "데이터를 불러올 수 없습니다.");
            }
        } else {
            message.put("status", false);
            message.put("error_message", "데이터를 불러올 수 없습니다.");
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    // TODO 20221102 4번 - 지우 O
    @RequestMapping(value = "/create/project", method = POST)
    public ResponseEntity createProject(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        Message message = new Message();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (userNo != null) {
            Company company = companyMemberDao.getUserCompany(userNo);
            if (company != null) {
                JSONObject jsonObject = new JSONObject(body);
                Project project = new Gson().fromJson(jsonObject.toString(), Project.class);
                project.setCompany_no(company.getNo());
                return crmService.createNewProject(project);
            } else {
                message.put("status", false);
                message.put("error_message", "회사 데이터를 불러올 수 없습니다.");
            }
        } else {
            message.put("status", false);
            message.put("error_message", "유저 데이터를 불러올 수 없습니다.");
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);

    }

    // TODO 20221102 5번 - 우식
    @RequestMapping(value = "/delete/project/{hash}", method = POST)
    public ResponseEntity deleteProject(HttpServletRequest request, @PathVariable String hash) throws Exception {
        int project_no = Integer.parseInt(encryptionService.decryptAESWithSlash(hash));
        //TODO Test Only
        /*Message message = new Message();
        message.put("project_no", project_no);
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);*/
        //Test Only End
        return crmService.deleteProject(project_no);
    }

    // TODO 20221102 6번 - 지우 O
    @RequestMapping(value = "/update/project", method = POST)
    public ResponseEntity updateProject(HttpServletRequest request, @RequestBody Map<String, Object> body) throws Exception {
        JSONObject jsonObject = new JSONObject(body.get("project"));
        Project project = new Gson().fromJson(jsonObject.toString(), Project.class);
        return crmService.updateProject(project);
    }

    // TODO 20221102 7번 - 우식
    @RequestMapping(value = "/copy/project/{hash}", method = POST)
    public ResponseEntity copyProject(HttpServletRequest request, @PathVariable String hash) throws Exception {
        int project_no = Integer.parseInt(encryptionService.decryptAESWithSlash(hash));
        return crmService.copyProject(project_no);
    }

    // TODO 20221102 8번 - 우식
    @RequestMapping(value = "/token/validate/{token}/{type}", method = GET)
    public ResponseEntity checkTokenIdDuplicate(@PathVariable String token, @PathVariable String type) {
        return crmService.checkTokenIdDuplicate(token, type);
    }


    // TODO 20221102 9번 - 우식
    // Board
    @RequestMapping(value = "/copy/board/{board_id}", method = POST)
    public ResponseEntity copyBoard(HttpServletRequest request, @PathVariable String board_id) {
        Message message = new Message();
        Board board = boardDao.getBoardById(board_id);
        if (board != null) {
            Board copied_board = crmService.copyBoard(board);
            message.put("copied_board", copied_board);
            message.put("status", true);
        } else {
            message.put("status", false);
            message.put("error_message", "복사할 대상 보드가 존재하지 않습니다.");
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    // TODO 20221102 10번 - 지우
    @RequestMapping(value = "/create/board", method = POST)
    public ResponseEntity createBoard(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        JSONObject jsonObject = new JSONObject(body);
        Board board = new Gson().fromJson(jsonObject.toString(), Board.class);
        return crmService.createBoard(board);
    }

    // TODO 20221102 11번 - 우식
    @RequestMapping(value = "/update/board/name", method = POST)
    public ResponseEntity changeBoardName(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        String board_id = (String) body.get("id");
        String name = (String) body.get("name");
        return crmService.changeBoardName(board_id, name);
    }

    // TODO 20221102 12번 - 우식
    @RequestMapping(value = "/update/board/order", method = POST)
    public ResponseEntity changeBoardOrder(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        String board_id = (String) body.get("id");
        Integer _order = (Integer) body.get("order");
        return crmService.changeBoardOrder(board_id, _order);
    }

    // TODO 20221102 13번 - 우식
    @RequestMapping(value = "/delete/board/{board_id}", method = POST)
    public ResponseEntity deleteBoard(HttpServletRequest request, @PathVariable String board_id) {
        return crmService.deleteBoard(board_id);
    }


    // TODO 20221102 14번 - 우식
    // Task
    @RequestMapping(value = "/update/task/{task_id}/status", method = POST)
    public ResponseEntity updateTaskStatus(HttpServletRequest request, @PathVariable String task_id) {
        return crmService.changeTaskStatus(task_id);
    }

    // TODO 20221102 15번 - 우식
    @RequestMapping(value = "/copy/task/{task_id}", method = POST)
    public ResponseEntity copyTask(HttpServletRequest request, @PathVariable String task_id) {
        Message message = new Message();
        Task task = taskDao.getTaskById(task_id);
        if (task != null) {
            Task copied_task = crmService.copyTask(task);
            List<CompanyProfileMember> members = taskMemberDao.getTaskMembers(copied_task.getId());
            message.put("copied_task", copied_task);
            message.put("status", true);
            message.put("members", members);
        } else {
            message.put("status", false);
            message.put("error_message", "복사할 대상 업무가 존재하지 않습니다.");
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    // TODO 20221102 16번 - 지우
    @RequestMapping(value = "/create/task", method = POST)
    public ResponseEntity createTask(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        JSONObject jsonObject = new JSONObject(body);
        Task task = new Gson().fromJson(jsonObject.toString(), Task.class);
        return crmService.createTask(task);
    }

    // TODO 20221102 17번 - 우식
    @RequestMapping(value = "/update/task/order", method = POST)
    public ResponseEntity changeTaskOrder(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        String task_id = (String) body.get("id");
        Integer _order = (Integer) body.get("order");
        return crmService.changeTaskOrder(task_id, _order);
    }

    // TODO 20221102 18번 - 우식
    @RequestMapping(value = "/update/task/name", method = POST)
    public ResponseEntity changeTaskName(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        String task_id = (String) body.get("id");
        String name = (String) body.get("name");
        return crmService.changeTaskName(task_id, name);
    }

    // TODO 20221102 19번 - 우식
    @RequestMapping(value = "/delete/task/{task_id}", method = POST)
    public ResponseEntity deleteTask(HttpServletRequest request, @PathVariable String task_id) {
        return crmService.deleteTask(task_id);
    }

    // TODO 20221102 20번 - 우식
    @RequestMapping(value = "/update/task/move", method = POST)
    public ResponseEntity moveTaskToOtherBoard(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        String task_id = (String) body.get("task_id");
        String board_id = (String) body.get("board_id");
        Integer _order = (Integer) body.get("order");
        return crmService.moveTaskToOtherBoard(task_id, board_id, _order);
    }

    // TODO 20221102 21번 - 우식, 지우 O
    @RequestMapping(value = "/get/task/{task_id}", method = GET)
    public ResponseEntity getTaskDetail(HttpServletRequest request, @PathVariable String task_id) {
        return crmService.getTask(task_id);
    }

    // TODO 20221102 22번 - 지우
    @RequestMapping(value = "/update/task/member/add", method = POST)
    public ResponseEntity addTaskMember(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        String task_id = (String) body.get("id");
        Integer member_no = Integer.parseInt(body.get("member_no").toString());
        return crmService.addTaskMember(task_id, member_no);
    }

    // TODO 20221102 23번 - 지우
    @RequestMapping(value = "/update/task/member/remove", method = POST)
    public ResponseEntity removeTaskMember(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        String task_id = (String) body.get("id");
        Integer member_no = Integer.parseInt(body.get("member_no").toString());
        return crmService.removeTaskMember(task_id, member_no);
    }

    // TODO 20221102 24번 - 우식
    @RequestMapping(value = "/update/task/start_date", method = POST)
    public ResponseEntity changeTaskStartDate(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        String task_id = (String) body.get("id");
        String start_date = (String) body.get("date");
        return crmService.changeTaskStartDate(task_id, start_date);
    }

    // TODO 20221102 25번 - 우식
    @RequestMapping(value = "/update/task/end_date", method = POST)
    public ResponseEntity changeTaskEndDate(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        String task_id = (String) body.get("id");
        String end_date = (String) body.get("date");
        return crmService.changeTaskEndDate(task_id, end_date);
    }

    // TODO 20221102 26번 - 우식
    @RequestMapping(value = "/update/task/description", method = POST)
    public ResponseEntity changeTaskDescription(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        String task_id = (String) body.get("id");
        String description = (String) body.get("description");
        return crmService.changeTaskDescription(task_id, description);
    }

    // TODO 20221102 27번 - 지우
    @RequestMapping(value = "/update/task/{task_id}/thumbnail", method = POST)
    public ResponseEntity changeTaskThumbnail(HttpServletRequest request, @PathVariable String task_id, @RequestBody MultipartFile file) {
        if(file == null) {
            return crmService.changeTaskThumbnail(task_id, null);
        } else {
            if (file.getSize() > 0) {
                log.info("{},{},{},{}", file.getName(), file.getSize(), file.getOriginalFilename(), file.getContentType());
                MFile mFile = uploadUtility.uploadFile(file, Constant.CDN_PATH.TASK_THUMBNAIL);
                return crmService.changeTaskThumbnail(task_id, mFile);
            } else {
                return new ResponseEntity(DefaultRes.res(HttpStatus.BAD_REQUEST), HttpStatus.OK);
            }
        }
    }

    // TODO 20221102 28번 - 우식
    @RequestMapping(value = "/update/task/subtask/{subtask_id}/status", method = POST)
    public ResponseEntity changeSubTaskStatus(HttpServletRequest request, @PathVariable String subtask_id) {
        return crmService.changeSubTaskStatus(subtask_id);
    }

    // TODO 20221102 29번 - 우식
    @RequestMapping(value = "/update/task/subtask/name", method = POST)
    public ResponseEntity changeSubTaskName(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        String subtask_id = (String) body.get("id");
        String name = (String) body.get("name");
        return crmService.changeSubTaskName(subtask_id, name);
    }


    // TODO 20221102 30번 - 지우
    @RequestMapping(value = "/create/subtask", method = POST)
    public ResponseEntity addSubTask(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        JSONObject jsonObject = new JSONObject(body);
        SubTask subTask = new Gson().fromJson(jsonObject.toString(), SubTask.class);
        return crmService.addSubTask(subTask);
    }

    // TODO 20221102 31번 - 우식
    @RequestMapping(value = "/delete/subtask/{subtask_id}", method = POST)
    public ResponseEntity deleteSubTask(HttpServletRequest request, @PathVariable String subtask_id) {
        return crmService.removeSubTask(subtask_id);
    }

    // TODO 20221102 32번 - 지우 O
    @RequestMapping(value = "/get/task/{task_id}/members/available", method = GET)
    public ResponseEntity getTaskAvailableMembers(HttpServletRequest request, @PathVariable String task_id) {
        return crmService.getTaskAvailableMembers(task_id);
    }

    // TODO 20221102 33번 - 지우 O
    @RequestMapping(value = "/get/task/{task_id}/comments", method = GET)
    public ResponseEntity getTaskComments(HttpServletRequest request, @PathVariable String task_id) {
        return crmService.getTaskComments(task_id);
    }

    // TODO 20221102 34번 - 지우
    @RequestMapping(value = "/create/task/comment", method = POST)
    public ResponseEntity addTaskComment(HttpServletRequest request, @RequestBody Map<String, Object> body) {
        Message message = new Message();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (userNo != null) {
            Company company = companyMemberDao.getUserCompany(userNo);
            if (company != null) {
                CompanyMember companyMember = companyMemberDao.getUserMemberInfo(userNo, company.getNo());
                JSONObject jsonObject = new JSONObject(body);
                TaskComment comment = new Gson().fromJson(jsonObject.toString(), TaskComment.class);
                comment.setMember_no(companyMember.getNo());
                return crmService.addComment(comment);
            } else {
                message.put("status", false);
                message.put("error_message", "회사 데이터를 불러올 수 없습니다.");
            }
        } else {
            message.put("status", false);
            message.put("error_message", "유저 데이터를 불러올 수 없습니다.");
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    // TODO 20221102 35번 - 우식
    @RequestMapping(value = "/delete/comment/{comment_no}", method = POST)
    public ResponseEntity deleteTaskComment(HttpServletRequest request, @PathVariable Integer comment_no) {
        Message message = new Message();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (userNo != null) {
            Company company = companyMemberDao.getUserCompany(userNo);
            if (company != null) {
                CompanyMember companyMember = companyMemberDao.getUserMemberInfo(userNo, company.getNo());
                return crmService.deleteComment(companyMember.getNo(), comment_no);
            } else {
                message.put("status", false);
                message.put("error_message", "회사 데이터를 불러올 수 없습니다.");
            }
        } else {
            message.put("status", false);
            message.put("error_message", "유저 데이터를 불러올 수 없습니다.");
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }

    // TODO 20221102 36번 - 지우
    @RequestMapping(value = "/get/task/{task_id}/files", method = GET)
    public ResponseEntity getTaskFiles(HttpServletRequest request, @PathVariable String task_id) {
        return crmService.getTaskFiles(task_id);
    }

    // TODO 20221102 37번 - 지우
    @RequestMapping(value = "/get/project/{hash}/files", method = GET)
    public ResponseEntity getProjectFiles(HttpServletRequest request, @PathVariable String hash) throws Exception {
        int project_no = Integer.parseInt(encryptionService.decryptAESWithSlash(hash));
        return crmService.getProjectFiles(project_no);
    }

    // TODO 20221102 38번 - 우식
    @RequestMapping(value = "/delete/file/{file_no}", method = POST)
    public ResponseEntity deleteFile(HttpServletRequest request, @PathVariable int file_no) {
        return crmService.deleteFile(file_no);
    }

    // TODO 20221102 39번 - 지우
    @RequestMapping(value = "/create/task/{task_id}/comment/file", method = POST)
    public ResponseEntity uploadCommentFile(HttpServletRequest request, @PathVariable String task_id, @RequestBody MultipartFile file) {
        Message message = new Message();
        HashMap<String, Object> hashMap = new EncryptionService().decryptJWT(request.getSession().getAttribute(JWTEnum.JWTToken.name()).toString());
        Integer userNo = (Integer) hashMap.get(JWTEnum.NO.name());
        if (userNo != null) {
            Company company = companyMemberDao.getUserCompany(userNo);
            if (company != null) {
                CompanyMember companyMember = companyMemberDao.getUserMemberInfo(userNo, company.getNo());
                TaskComment comment = new TaskComment();
                comment.setType(TASK_COMMENT_TYPE.FILE);
                comment.setMember_no(companyMember.getNo());
                comment.setTask_id(task_id);
                if(file.isEmpty()) {
                    message.put("status", false);
                    message.put("error_message", "잘못된 접근입니다.");
                    log.debug("uploadCommentFile error : file is empty");
                } else {
                    log.info("{},{},{},{}", file.getName(), file.getSize(), file.getOriginalFilename(), file.getContentType());
                    MFile mFile = uploadUtility.uploadFile(file, Constant.CDN_PATH.TASK_FILE);
                    comment.setFile(mFile);
                    return crmService.addComment(comment);
                }
            } else {
                message.put("status", false);
                message.put("error_message", "회사 데이터를 불러올 수 없습니다.");
            }
        } else {
            message.put("status", false);
            message.put("error_message", "유저 데이터를 불러올 수 없습니다.");
        }
        return new ResponseEntity(DefaultRes.res(HttpStatus.OK, message, true), HttpStatus.OK);
    }
}
