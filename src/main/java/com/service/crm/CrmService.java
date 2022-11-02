package com.service.crm;

import com.aws.CDNService;
import com.aws.file.FileUploadUtility;
import com.aws.model.Download;
import com.dao.CompanyDao;
import com.dao.CompanyMemberDao;
import com.dao.crm.*;
import com.model.common.MFile;
import com.model.company.CompanyProfileMember;
import com.model.crm.*;
import com.model.crm.file.TaskFile;
import com.model.crm.state.TASK_STATUS_TYPE;
import com.response.DefaultRes;
import com.response.Message;
import com.util.Constant;
import com.util.Encryption.EncryptionService;
import com.util.Format;
import com.util.Time;
import com.util.TokenGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import static org.springframework.http.HttpStatus.OK;


/**
 * CRM Plug Service
 * CRM 관련 모든 서비스 함수를 담았음
 * 예외처리는 초기 설정 시 따로 먼저 처리하지 않았으며 모든 기능 구현 후 한 번에 예외처리
 **/
@Service
@Slf4j
@RequiredArgsConstructor
public class CrmService {
    @Value("{UPLOAD_PATH}")
    private String upload_path;
    private final CompanyMemberDao companyMemberDao;
    private final CompanyDao companyDao;
    private final BoardDao boardDao;
    private final ProjectDao projectDao;
    private final TaskDao taskDao;
    private final TaskFileDao taskFileDao;
    private final TaskCommentDao taskCommentDao;
    private final TaskCommentFileDao taskCommentFileDao;
    private final TaskCommentReadDao taskCommentReadDao;
    private final TaskMemberDao taskMemberDao;
    private final TaskMentionDao taskMentionDao;
    private final SubTaskDao subTaskDao;
    private final EncryptionService encryptionService;
    private final FileUploadUtility fileUploadUtility;
    private final CDNService cdnService;

    /**
     * getAllProjects
     *
     * @param company_no int
     * @return List<Project>
     * - 프로젝트 내에 모든 보드, Task 정보 호출
     * - 타임라인, 리스트, 피드 모두 사용
     */
    public List<Project> getCompanyProjects(int company_no) {
        // 쿼리로 한 번에 처리하는 것은 너무 비효율적
        // TODO 트래픽 발생 시 속도 부하 시 일부는 쿼리로 처리하는 것도 고려
        return projectDao.getCompanyProjects(company_no);
    }

    public Project getProjectDashBoardData(int project_no) {
        return fillContentOnProjectModel(projectDao.getProjectByNo(project_no));
    }

    /**
     * getMemberProjects
     *
     * @param member_no int
     * @param type      TASK_STATUS_TYPE
     * @return List<Task>
     * <p>
     * 멤버의 타입별(남은 업무, 지난 업무, 완료 업무) 업무 현황을 호출할 수 있는 함수
     * VIEW 에서 바로 받아도 되고 REST로 연결해서 받아도 됨 =>
     * @see CrmService#getMemberTaskREST
     **/
    public List<Task> getMemberTasks(int member_no, TASK_STATUS_TYPE type) {
        List<Task> tasks = null;
        switch (type) {
            // 남은
            case TODO:
                tasks = taskDao.getMemberToDoTasks(member_no);
                break;
            // 완료
            case COMPLETED:
                tasks = taskDao.getMemberCompletedTasks(member_no);
                break;
            // 지난
            case EXPIRED:
                tasks = taskDao.getMemberExpiredTasks(member_no);
                break;
        }
        for (Task task : tasks) {
            Project project = projectDao.getProjectByNo(task.getProject_no());
            task.setProject_name(project.getName());
        }
        return tasks;
    }

    /**
     * getMemberTaskREST
     *
     * @param member_no int
     * @param type      TASK_STATUS_TYPE
     * @return ResponseEntity
     * <p>
     * getMemberTask 의 REST 형태
     * @see CrmService#getMemberTasks
     **/
    public ResponseEntity getMemberTaskREST(int member_no, TASK_STATUS_TYPE type) {
        Message message = new Message();
        message.put("tasks", getMemberTasks(member_no, type));
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }


    /**
     * createNewProject
     *
     * @param project Project
     * @return ResponseEntity(REST)
     * <p>
     * project 생성 함수
     * 예외처리 가장 많을 수 있음 현재는 create하는 것, 이름 중복만 구현
     * message 에 생성 완료 후 status = true, project_no 담아서 반환
     * 예외 발생 시 status = false
     * <p>
     * # 예상 예외 목록
     * - 이름 중복 O
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 생성 권한 없음 -> Interceptor 처리?
     */
    @Transactional
    public ResponseEntity createNewProject(Project project) {
        Message message = new Message();
        if (projectDao.checkProjectNameDuplicate(project.getName(), project.getCompany_no())) {
            message.put("status", false);
            message.put("error_message", "이미 이름이 존재하는 프로젝트입니다.");
        } else {
            projectDao.createNewProject(project);
            message.put("status", true);
            message.put("project_no", project.getNo());
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * deleteProject
     *
     * @param project_no int
     * @return ResponseEntity(REST)
     * <p>
     * project 삭제 함수
     * <p>
     * # 예상 예외 처리 목록
     * - 권한
     */
    @Transactional
    public ResponseEntity deleteProject(int project_no) {
        Message message = new Message();
        projectDao.deleteProject(project_no);
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * updateProject
     *
     * @param project Project
     * @return ResponseEntity(REST)
     * <p>
     * project update 함수
     * 현 프로젝트가 아닌 다른 프로젝트의 이름과 겹치는지에 대한 여부 예외처리
     * <p>
     * # 예상 예외 목록
     * - 이름 중복 O
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - Update 권한 없음 -> Interceptor 처리?
     */
    @Transactional
    public ResponseEntity updateProject(Project project) {
        Message message = new Message();
        if (projectDao.checkProjectNameDuplicateOnUpdate(project)) {
            message.put("status", false);
            message.put("error_message", "다른 프로젝트에서 해당 이름을 사용 중입니다.");
        } else {
            projectDao.updateProject(project);
            message.put("status", true);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * copyProject
     *
     * @param project_no Project
     * @return ResponseEntity(REST)
     * <p>
     * project 복사 함수
     * 프로젝트와 프로젝트 내에 존재하는 모든 요소들을 복사
     * 0. Project
     * - 이름은 기존 이름 뒤에 [ - 복사본] 붙이기
     * 1. Board
     * - 이름
     * - 순서
     * - tasks
     * 2. Task
     * - 제목
     * - 담당자
     * - 시작 일자
     * - 마감 일자
     * - 내용
     * - 완료 여부는 모두 false
     * <p>
     * # 예상 예외 목록
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - copy 권한 없음 -> Interceptor 처리?
     */
    @Transactional
    public ResponseEntity copyProject(int project_no) {
        Message message = new Message();
        Date start_time = Time.LongTimeStamp(0);
        log.debug("프로젝트 복사 시작 : {}", start_time);
        // 기존 Project 요소들
        Project project = projectDao.getProjectByNo(project_no);
        // 1. Project Set
        Project copied_project = new Project();
        copied_project.setCompany_no(project.getCompany_no());
        copied_project.setName(project.getName() + " - 복사본");
        // 이름 중복 Numbering
        int i = 1;
        String non_numbered_name = copied_project.getName();
        while (true) {
            if (projectDao.checkProjectNameDuplicate(copied_project.getName(), copied_project.getCompany_no())) {
                copied_project.setName(non_numbered_name + "(" + i + ")");
                i = i + 1;
            } else {
                break;
            }
        }
        // 복사 프로젝트 생성
        // TODO projectDao.createNewProject() 와 동일하지만 추후 수정 가능성을 위해 분할 - 해당 쿼리 수정 시 주석 삭제
        projectDao.copyProject(copied_project);

        // 2. Board Copy
        Date project_done_time = Time.LongTimeStamp(0);
        log.debug("==== Project 객체 복사 완료 : {}", project_done_time);
        log.debug("==== 소요 시간 : {}초", Time.getDateSecondDiff(start_time, project_done_time));
        // GET original Boards
        List<Board> boards = boardDao.getProjectBoards(project_no);
        for (Board board : boards) {
            board.setTaskList(taskDao.getBoardTasks(board.getId()));
        }

        // Copy Boards -> include task
        for (Board board : boards) {
            board.setProject_no(copied_project.getNo());
            copyBoard(board);
        }
        log.debug("Board 및 Task 복사 완료, 소요시간 : {}초", Time.getDateSecondDiff(start_time, Time.LongTimeStamp(0)));

        message.put("status", true);
        message.put("project", copied_project);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }


    /**
     * changeTaskStatus
     *
     * @param task_id String
     * @return ResponseEntity(REST)
     * <p>
     * task 상태 변화 함수
     * DB 기준으로 반대로 변경 뒤 변경된 상태를 return
     * <p>
     * # front 기준으로 변경하게 될 수도 있음
     */
    @Transactional
    public ResponseEntity changeTaskStatus(String task_id) {
        Message message = new Message();
        if (taskDao.getTaskById(task_id) == null) {
            message.put("status", false);
            message.put("error_message", "잘못된 접근입니다.");
            log.debug("changeTaskStatus error : task가 존재하지 않습니다.");
        } else {
            message.put("status", true);
            taskDao.changeTaskStatus(task_id);
            boolean complete = taskDao.checkTaskCompleted(task_id);
            message.put("complete", complete);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * checkTokenIdDuplicate
     *
     * @param token_id String
     * @param type     String (task, board)
     * @return ResponseEntity(REST)
     * <p>
     * type 에 맞춰 해당 DB에 동일한 ID가 존재하는지 체크하는 여부
     * message.status == true 일 경우에 사용 가능한 토큰 ID
     * <p>
     * ==> 추후 PLUG 별로 한 번에 check하는 함수로 축약
     */
    public ResponseEntity checkTokenIdDuplicate(String token_id, String type) {
        Message message = new Message();
        if (type.equals("task")) {
            message.put("status", taskDao.checkTokenIdAbleToUse(token_id));
        } else if (type.equals("board")) {
            message.put("status", boardDao.checkTokenIdAbleToUse(token_id));
        } else if (type.equals("subtask")) {
            message.put("status", subTaskDao.checkTokenIdAbleToUse(token_id));
        } else {
            return new ResponseEntity<>(DefaultRes.res(HttpStatus.BAD_REQUEST), OK);
        }
        return new ResponseEntity<>(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * copyBoard
     *
     * @param original_board Board
     * @return Board
     * <p>
     * 보드(Board)를 복사하는 함수
     * - 보드 내의 Task까지 모두 복사
     * # 예외처리
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     * @see CrmService#copyProject
     * -> 해당 주석에 상세히 작성함
     **/
    @Transactional
    public Board copyBoard(Board original_board) {
        Date start_time = Time.LongTimeStamp(0);
        log.debug("Board 복사 시작 : {}", start_time);
        // 복사할 보드 생성
        Board copied_board = new Board();
        copied_board.setId(TokenGenerator.RandomToken(8));
        // ID(PK) 중복 검증
        while (!boardDao.checkTokenIdAbleToUse(copied_board.getId())) {
            copied_board.setId(TokenGenerator.RandomToken(8));
        }
        copied_board.setName(original_board.getName());
        copied_board.setProject_no(original_board.getProject_no());
        copied_board.set_order(original_board.get_order());
        // TODO boardDao.createBoard() 와 동일하지만 추후 수정 가능성을 위해 분할 - 해당 쿼리 수정 시 주석 삭제
        boardDao.copyBoard(copied_board);

        // 3. Task Copy
        for (Task task : original_board.getTaskList()) {
            task.setBoard_id(copied_board.getId());
            copyTask(task);
        }

        log.debug("Board 복사 완료 : {}초 소요", Time.getDateSecondDiff(start_time, Time.LongTimeStamp(0)));
        return copied_board;
    }

    /**
     * copyTask
     *
     * @param original_task Task
     * @return Task
     * <p>
     * 업무(task)를 복사하는 함수
     * - 업무에 엮인 담당자까지 복사
     * # 예외처리
     * - task_id 중복
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     * @see CrmService#copyProject
     * -> 해당 주석에 상세히 작성함
     **/
    @Transactional
    public Task copyTask(Task original_task) {
        Date start_time = Time.LongTimeStamp(0);
        log.debug("Task 복사 시작 : {}", start_time);
        // 복사할 Task 생성
        Task copied_task = new Task();
        copied_task.setId(TokenGenerator.RandomToken(8));
        // ID(PK) 중복 검증
        while (!taskDao.checkTokenIdAbleToUse(copied_task.getId())) {
            copied_task.setId(TokenGenerator.RandomToken(8));
        }
        copied_task.setProject_no(original_task.getProject_no());
        copied_task.setBoard_id(original_task.getBoard_id());
        copied_task.setTitle(original_task.getTitle());
        copied_task.setStart_date(original_task.getStart_date());
        copied_task.setEnd_date(original_task.getEnd_date());
        copied_task.setDescription(original_task.getDescription());
        copied_task.setComplete(original_task.isComplete());
        // TODO taskDao.createTask() 와 동일하지만 추후 수정 가능성을 위해 분할 - 해당 쿼리 수정 시 주석 삭제
        taskDao.copyTask(copied_task);

        // 기존 Task 에 엮여진 담당자들 복사할 Task에 엮기
        if (!taskMemberDao.getTaskMembers(original_task.getId()).isEmpty()) {
            taskMemberDao.copyTask(original_task.getId(), copied_task.getId());
        }

        // 기존 task에 엮여진 subtask
        List<SubTask> subTasks = subTaskDao.getSubtasksByTaskId(original_task.getId());
        for (SubTask subTask : subTasks) {
            subTask.setTask_id(copied_task.getId());
            subTask.setId(TokenGenerator.RandomToken(8));
            while (!subTaskDao.checkTokenIdAbleToUse(subTask.getTask_id())) {
                subTask.setId(TokenGenerator.RandomToken(8));
            }
            subTaskDao.addSubTask(subTask);
        }

        // 기존 task에 엮여진 file
        List<TaskFile> files = taskFileDao.getTaskFiles(original_task.getId());
        for (TaskFile file : files) {
            file.setTask_id(copied_task.getId());
            // TODO AWS COPY error? => fix
            String url = file.getFile().getUrl();
            String path = Format.getURIFromUrl(url);
            String cdn_path = path.substring(path.lastIndexOf("/") - 1);
            File f = cdnService.download(new Download(upload_path, cdn_path, file.getFile().getName()));
            MFile result = fileUploadUtility.uploadFile(f, Constant.CDN_PATH.TASK_FILE);
            file.setFile(result);
            taskFileDao.insertTaskFile(file);
        }
        log.debug("Task 복사 완료 : {}초 소요", Time.getDateSecondDiff(start_time, Time.LongTimeStamp(0)));
        return copied_task;
    }

    /**
     * createBoard
     *
     * @param board Board
     * @return ResponseEntity(REST)
     * <p>
     * 보드(Board)를 생성하는 함수
     * # 예외처리
     * - 토큰 null or 토큰 중복일 시 자체적으로 미중복 토큰을 생성하여 넣은 후 해당 값 rest로 반환
     * - 순서에 대한 정의는 함수 내 주석 참조
     * - project_no 세팅 안되어있을 때 에러 로그 및 return status false => 디버그용
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity createBoard(Board board) {
        Message message = new Message();
        // Token 재검증
        if (board.getProject_no() <= 0) {
            message.put("status", false);
            message.put("error_message", "");
            log.debug("createBoard error : project_no 없음");
        } else {
            if (board.getId() == null) {
                board.setId(TokenGenerator.RandomToken(8));
            }
            while (!boardDao.checkTokenIdAbleToUse(board.getId())) {
                board.setId(TokenGenerator.RandomToken(8));
            }

            // DB 기준 마지막 order 로 추가
            // 만약 보드 기준 왼쪽 or 오른쪽에 생성하기 기능이 있을 시 아래 한 줄 주석 처리
            board.set_order(boardDao.getProjectBoards(board.getProject_no()).size() + 1);
            boardDao.createBoard(board);
            message.put("status", true);
            message.put("board", board);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * changeBoardName
     *
     * @param board_id String
     * @param name     String
     * @return ResponseEntity(REST)
     * <p>
     * 보드(Board) 이름을 변경하는 함수
     * # 예외처리
     * - board 존재? O
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity changeBoardName(String board_id, String name) {
        Message message = new Message();
        if (boardDao.checkTokenIdAbleToUse(board_id)) {
            // board_id token 값이 있는지 check로 보드 존재하는지 check
            message.put("status", false);
            message.put("error_message", "이름을 변경하려는 보드가 존재하지 않습니다. (새로고침 요망)");
        } else {
            boardDao.changeBoardName(board_id, name);
            message.put("status", true);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }


    /**
     * changeBoardOrder
     *
     * @param board_id String
     * @param _order   int
     * @return ResponseEntity(REST)
     * <p>
     * 보드(Board)의 순서를 변경하는 함수
     * board_id 를 특정 순서로 옮긴다는 행위를 통해
     * 해당 프로젝트 내의 다른 보드들의 _order 값 까지 변동해주어야 해서 해당 로직도 함께 구축
     * 로직 => (a, b, c, d, e) 중 e를 b(2)번 자리로 옮길 때 (a, e, b, c, d)에 맞게 뒤 _order 값도 조정
     * TODO DB 값 기준으로 변경하기에 DB - Front 간 올바르게 동기화 되어야함 => WEBSOCKET 시
     * DB 기준 Board 정렬을 반환하여 Front 가 최대한 DB와 동기화 될 수 있게 처리
     * TODO 만일 현재 Front 기준으로 모두 처리하려면 Front의 정렬을 모두 받아서 그대로 반영해야함 => 함수 변경
     * # 예외 처리
     * - 프로젝트 내의 보드의 전체 갯수보다 _order 값이 클 경우는 오류 처리
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity changeBoardOrder(String board_id, int _order) {
        Message message = new Message();
        Board board = boardDao.getBoardById(board_id);
        List<Board> boards = boardDao.getProjectBoards(board.getProject_no());
        if (_order > boards.size() || _order <= 0) {
            message.put("status", false);
            message.put("error_message", "잘못된 접근입니다.");
            log.debug("changeBoardOrder error : _order 의 값이 잘못되었습니다.");
        } else {
            boards.remove(board);
            boards.add(_order - 1, board);
            for (int i = 0; i < boards.size(); i++) {
                Board this_board = boards.get(i);
                this_board.set_order(i + 1);
                boardDao.updateBoardOrder(this_board.getId(), this_board.get_order());
            }
            message.put("status", true);
            message.put("boards", boards);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * deleteBoard
     *
     * @param board_id String
     * @return ResponseEntity(REST)
     * <p>
     * 보드(Board)를 삭제하는 함수
     * board에 엮여진 task들 모두 함께 삭제 (FK로 자동 삭제)
     * # 예외 처리
     * - board 내에 task 있을 때 삭제 막기?
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity deleteBoard(String board_id) {
        Message message = new Message();
        boardDao.deleteBoard(board_id);
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * createTask
     *
     * @param task Task
     * @return ResponseEntity(REST)
     * <p>
     * 업무(task)를 만드는 함수
     * # 예외처리
     * - task_id 중복
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity createTask(Task task) {
        Message message = new Message();
        if (taskDao.checkTokenIdAbleToUse(task.getId())) {
            taskDao.createTask(task);
            message.put("status", true);
            message.put("task", task);
        } else {
            message.put("status", false);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * changeTaskOrder
     *
     * @param task_id String
     * @param _order  int
     * @return ResponseEntity(REST)
     * <p>
     * 업무(Task)의 순서를 변경하는 함수
     * task_id 를 특정 순서로 옮긴다는 행위를 통해
     * 해당 프로젝트 내의 다른 보드들의 _order 값 까지 변동해주어야 해서 해당 로직도 함께 구축
     * ==> changeBoardOrder와 같은 로직
     * 로직 => (a, b, c, d, e) 중 e를 b(2)번 자리로 옮길 때 (a, e, b, c, d)에 맞게 뒤 _order 값도 조정
     * TODO DB 값 기준으로 변경하기에 DB - Front 간 올바르게 동기화 되어야함 => WEBSOCKET 시
     * DB 기준 Task 정렬을 반환하여 Front 가 최대한 DB와 동기화 될 수 있게 처리
     * TODO 만일 현재 Front 기준으로 모두 처리하려면 Front의 정렬을 모두 받아서 그대로 반영해야함 => 함수 변경
     * # 예외 처리
     * - 보드 내의 업무의 전체 갯수보다 _order 값이 클 경우는 오류 처리
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity changeTaskOrder(String task_id, int _order) {
        Message message = new Message();
        Task task = taskDao.getTaskById(task_id);
        List<Task> tasks = taskDao.getBoardTasks(task.getBoard_id());
        if (_order > tasks.size() || _order <= 0) {
            message.put("status", false);
            message.put("error_message", "잘못된 접근입니다.");
            log.debug("changeTaskOrder error : _order 의 값이 잘못되었습니다.");
        } else {
            tasks.remove(task);
            tasks.add(_order - 1, task);
            for (int i = 0; i < tasks.size(); i++) {
                Task this_task = tasks.get(i);
                this_task.set_order(i + 1);
                taskDao.updateTaskOrder(this_task.getId(), this_task.get_order());
            }
            message.put("status", true);
            message.put("tasks", tasks);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }


    /**
     * changeTaskName
     *
     * @param task_id String
     * @param name    String
     * @return ResponseEntity(REST)
     * <p>
     * 업무(Task)의 이름을 변경하는 함수
     * # 예외 처리
     * - 업무가 DB 존재하지 않을 떄 O
     * - 이름이 null 일 떄 => Front js 에서 잡기 O
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity changeTaskName(String task_id, String name) {
        Message message = new Message();
        if (taskDao.getTaskById(task_id) == null) {
            message.put("status", false);
            message.put("error_message", "업무의 이름을 변경할 수 없습니다.");
            log.debug("changeTaskName error : task from task_id null");
        } else {
            if (name == null) {
                // Front 에서 접근 불가 처리 해야함
                message.put("status", false);
                message.put("error_message", "잘못된 접근입니다.");
                log.debug("changeTaskName error : task name null");
            } else {
                taskDao.changeTaskName(task_id, name);
                message.put("status", true);
                message.put("name", name);
            }
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }


    /**
     * deleteTask
     *
     * @param task_id String
     * @return ResponseEntity(REST)
     * <p>
     * 업무(Task)를 삭제하는 함수
     * task에 엮여진 관련 정보들 모두 함께 삭제 (FK로 자동 삭제)
     * # 예외 처리
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity deleteTask(String task_id) {
        Message message = new Message();
        taskDao.deleteTask(task_id);
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * moveTaskToOtherBoard
     *
     * @param task_id  String
     * @param board_id String
     * @param _order   int
     * @return ResponseEntity(REST)
     * <p>
     * 업무(Task)를 다른 보드로 이동하는 함수
     * 이동할 보드와 이동할 위치까지 모두 고려해야함
     * # 예외 처리
     * - DB에 이동할 target board가 존재하는지 O
     * - DB에 이동할 task 가 존재하는지
     * - 이동할 _order의 크기가 DB의 target Board 와 엮여진 size + 1 범위 내에 있는지
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity moveTaskToOtherBoard(String task_id, String board_id, int _order) {
        Message message = new Message();
        if (taskDao.getTaskById(task_id) == null) {
            message.put("status", false);
            message.put("error_message", "이동하려는 업무가 존재하지 않습니다. (새로고침 요망)");
            log.debug("moveTaskToOtherBoard error : task from task_id null");
        } else if (boardDao.getBoardById(board_id) == null) {
            message.put("status", false);
            message.put("error_message", "업무를 이동하려는 보드가 존재하지 않습니다. (새로고침 요망)");
            log.debug("moveTaskToOtherBoard error : board from board_id null");
        } else {
            List<Task> tasks = taskDao.getBoardTasks(board_id);
            if (_order > tasks.size() + 1 || _order <= 0) {
                message.put("status", false);
                message.put("error_message", "잘못된 접근입니다.");
                log.debug("moveTaskToOtherBoard error : _order 가 기존 board의 (Tasks size + 1) 보다 크거나 0 이하임");
            } else {
                Task task = taskDao.getTaskById(task_id);
                task.setBoard_id(board_id);
                tasks.add(_order - 1, task);
                for (int i = 0; i < tasks.size(); i++) {
                    Task this_task = tasks.get(i);
                    this_task.set_order(i + 1);
                    if (this_task.equals(task)) {
                        taskDao.moveTaskToOtherBoard(task.getId(), task.getBoard_id());
                    }
                    taskDao.updateTaskOrder(this_task.getId(), this_task.get_order());
                }
                message.put("status", true);
                message.put("tasks", tasks);
            }
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * getTask
     *
     * @param task_id String
     * @return ResponseEntity(REST)
     * <p>
     * 업무(task) 상세를 호출하는 함수
     * 하위 업무, 담당자 모두 세팅된 값
     * # 예외처리
     * - 없거나 삭제된 task O
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    public ResponseEntity getTask(String task_id) {
        Message message = new Message();
        Task task = taskDao.getTaskById(task_id);
        // TODO 예외처리
        if (task == null) {
            message.put("status", false);
            message.put("error_message", "해당 업무를 불러올 수 없습니다. 업무 리스트를 최신화 해주세요.");
        } else {
            // task 요소 SET
            task.setCollaborators(taskMemberDao.getTaskMembers(task.getId()));
            task.setSubTasks(subTaskDao.getSubtasksByTaskId(task.getId()));
            message.put("status", true);
            message.put("task", task);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }


    /**
     * addTaskMember
     *
     * @param task_id   String
     * @param member_no int
     * @return ResponseEntity(REST)
     * <p>
     * 작업에 멤버를 담당자로 등록하는 함수
     * CompanyProfileMember의 no는 CompanyMember.no를 칭함 => no = member_no
     * # 예상 예외 처리
     * - 이미 해당 Task에 담당자로 등록됐는지
     * - 해당 멤버가 해당 Task의 그룹 멤버가 맞는지
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity addTaskMember(String task_id, int member_no) {
        Message message = new Message();
        Task task = taskDao.getTaskById(task_id);
        Project project = projectDao.getProjectByNo(task.getProject_no());
        if (!companyMemberDao.checkMemberIsCompanyMember(member_no, project.getCompany_no())) {
            message.put("status", false);
            message.put("error_message", "담당자로 등록할 수 없는 멤버입니다.");
            log.debug("addTaskMember error : member_no에 해당하는 멤버가 없거나, project의 회사와 맞지않는 멤버");
        } else if (taskMemberDao.isMemberOnTask(task_id, member_no)) {
            message.put("status", false);
            message.put("error_message", "이미 담당자로 등록되어 있는 멤버입니다..");
            log.debug("addTaskMember error : 이미 등록되어있음, 동기화 오류");
        } else {
            taskMemberDao.addTaskMember(task_id, member_no);
            message.put("status", true);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * removeTaskMember
     *
     * @param task_id   String
     * @param member_no int
     * @return ResponseEntity(REST)
     * <p>
     * 작업에 멤버로 등록된 담당자를 삭제하는 함수
     * CompanyProfileMember의 no는 CompanyMember.no를 칭함 => no = member_no
     * # 예상 예외 처리
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity removeTaskMember(String task_id, int member_no) {
        Message message = new Message();
        taskMemberDao.removeTaskMember(task_id, member_no);
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * changeTaskStartDate
     *
     * @param task_id    String
     * @param start_date int
     * @return ResponseEntity(REST)
     * <p>
     * 작업의 시작 일자를 변경하는 함수
     * # 예상 예외 처리
     * - DB에 저장되어 있는 종료 일자가 시작 일자보다 이전일 경우 종료 일자 => null
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity changeTaskStartDate(String task_id, String start_date) {
        Message message = new Message();
        if (taskDao.getTaskById(task_id) == null) {
            message.put("status", false);
            message.put("error_message", "해당 업무를 불러올 수 없습니다. 업무 리스트를 최신화 해주세요.");
        } else {
            Task task = taskDao.getTaskById(task_id);
            String date_default_format = "yyyy.MM.dd";
            try {
                Date s_date = Time.DateStringToDate(start_date, date_default_format);
                Date e_date = Time.DateStringToDate(task.getEnd_date(), date_default_format);
                message.put("status", true);
                if (e_date.before(s_date)) {
                    // DB에 저장되어 있는 종료 일자가 시작 일자보다 이전일 경우 종료 일자 => null
                    taskDao.updateTaskEndDate(task_id, null);
                    message.put("end_date", null);
                }
                taskDao.updateTaskStartDate(task_id, start_date);
            } catch (Exception e) {
                e.printStackTrace();
                message.put("status", false);
                message.put("error_message", "서버 내부 에러");
            }
        }
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * changeTaskEndDate
     *
     * @param task_id  String
     * @param end_date int
     * @return ResponseEntity(REST)
     * <p>
     * 작업의 종료 일자를 변경하는 함수
     * # 예상 예외 처리
     * - DB에 저장되어 있는 시작 일자가 종료 일자보다 이후일 경우 시작 일자 => null
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity changeTaskEndDate(String task_id, String end_date) {
        Message message = new Message();
        if (taskDao.getTaskById(task_id) == null) {
            message.put("status", false);
            message.put("error_message", "해당 업무를 불러올 수 없습니다. 업무 리스트를 최신화 해주세요.");
        } else {
            Task task = taskDao.getTaskById(task_id);
            String date_default_format = "yyyy.MM.dd";
            try {
                Date start_date = Time.DateStringToDate(task.getStart_date(), date_default_format);
                Date e_date = Time.DateStringToDate(end_date, date_default_format);
                message.put("status", true);
                if (start_date.after(e_date)) {
                    // DB에 저장되어 있는 시작 일자가 종료 일자보다 이후일 경우 시작 일자 => null
                    taskDao.updateTaskStartDate(task_id, null);
                    message.put("start_date", null);
                }
                taskDao.updateTaskEndDate(task_id, end_date);
            } catch (Exception e) {
                e.printStackTrace();
                message.put("status", false);
                message.put("error_message", "서버 내부 에러");
            }
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * changeTaskDescription
     *
     * @param task_id     String
     * @param description int
     * @return ResponseEntity(REST)
     * <p>
     * 작업의 내용을 변경하는 함수
     * # 예상 예외 처리
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity changeTaskDescription(String task_id, String description) {
        Message message = new Message();
        if (taskDao.getTaskById(task_id) == null) {
            message.put("status", false);
            message.put("error_message", "해당 업무를 불러올 수 없습니다. 업무 리스트를 최신화 해주세요.");
        } else {
            taskDao.changeTaskDescription(task_id, description);
            message.put("status", true);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * changeTaskThumbnail
     *
     * @param task_id   String
     * @param thumbnail MFile
     * @return ResponseEntity(REST)
     * <p>
     * 작업의 내용을 변경하는 함수
     * # 예상 예외 처리
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity changeTaskThumbnail(String task_id, MFile thumbnail) {
        Message message = new Message();
        if (taskDao.getTaskById(task_id) == null) {
            message.put("status", false);
            message.put("error_message", "해당 업무를 불러올 수 없습니다. 업무 리스트를 최신화 해주세요.");
        } else {
            taskDao.changeTaskThumbnail(task_id, thumbnail);
            message.put("status", true);
            message.put("thumbnail", thumbnail);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * changeSubTaskStatus
     *
     * @param sub_task_id String
     * @return ResponseEntity(REST)
     * <p>
     * subtask 상태 변화 함수
     * DB 기준으로 반대로 변경 뒤 변경된 상태를 return
     * # 예상 예외 처리
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity changeSubTaskStatus(String sub_task_id) {
        Message message = new Message();
        if (subTaskDao.getSubtaskById(sub_task_id) == null) {
            message.put("status", false);
            message.put("error_message", "존재하지 않는 하위 업무입니다.");
            log.debug("changeSubTaskStatus error : subTask.id에 맞는 subtask 없음");
        } else {
            subTaskDao.changeSubTaskStatus(sub_task_id);
            boolean complete = subTaskDao.checkSubTaskCompleted(sub_task_id);
            message.put("status", true);
            message.put("complete", complete);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * changeSubTaskName
     *
     * @param sub_task_id String
     * @param name        String
     * @return ResponseEntity(REST)
     * <p>
     * subtask 이름 변경 함수
     * # 예상 예외 처리
     * @see CrmService#addSubTask => 이름 예외 처리와 같음
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity changeSubTaskName(String sub_task_id, String name) {
        Message message = new Message();
        if (subTaskDao.getSubtaskById(sub_task_id) == null) {
            message.put("status", false);
            message.put("error_message", "존재하지 않는 하위 업무입니다.");
            log.debug("changeSubTaskName error : subTask.id에 맞는 subtask 없음");
        } else if (name == null || name.length() <= 0) {
            // TODO js 단에서 inspection 후 해당 구문 삭제
            message.put("status", false);
            message.put("error_message", "하위 업무의 title이 지정되지 않았습니다.");
            log.debug("changeSubTaskName error : subTask.title 필요 -> js 단에서 inspection 후 해당 구문 삭제");
        } else {
            subTaskDao.changeSubTaskName(sub_task_id, name);
            message.put("status", true);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * addSubTask
     *
     * @param subTask SubTask
     * @return ResponseEntity(REST)
     * <p>
     * 하위 업무 추가 함수
     * # 예상 예외 처리
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity addSubTask(SubTask subTask) {
        Message message = new Message();
        if (taskDao.getTaskById(subTask.getTask_id()) == null) {
            message.put("status", false);
            message.put("error_message", "업무가 존재하지 않아 하위 업무를 생성할 수 없습니다.");
            log.debug("addSubTask error : subTask.taskId에 맞는 task 없음");
        } else if (subTask.getTitle() == null || subTask.getTitle().length() <= 0) {
            // TODO js 단에서 inspection 후 해당 구문 삭제
            message.put("status", false);
            message.put("error_message", "하위 업무의 title이 지정되지 않았습니다.");
            log.debug("addSubTask error : subTask.title 필요 -> js 단에서 inspection 후 해당 구문 삭제");
        } else {
            if (subTask.getId() == null) {
                subTask.setId(TokenGenerator.RandomToken(8));
            }
            while (!subTaskDao.checkTokenIdAbleToUse(subTask.getId())) {
                subTask.setId(TokenGenerator.RandomToken(8));
            }
            subTaskDao.addSubTask(subTask);
            subTask = subTaskDao.getSubtaskById(subTask.getId());
            message.put("status", true);
            message.put("subTask", subTask);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * removeSubTask
     *
     * @param sub_task_id String
     * @return ResponseEntity(REST)
     * <p>
     * 하위 업무 삭제 함수
     * # 예상 예외 처리
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity removeSubTask(String sub_task_id) {
        Message message = new Message();
        subTaskDao.removeSubTask(sub_task_id);
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * getTaskAvailableMembers
     *
     * @param task_id String
     * @return ResponseEntity(REST)
     * <p>
     * 작업 내에 현재 담당자로 선택할 수 있는 팀원 목록을 불러오는 함수
     * CompanyProfileMember의 no는 CompanyMember.no를 칭함
     * # 예상 예외 처리
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    public ResponseEntity getTaskAvailableMembers(String task_id) {
        Message message = new Message();
        message.put("status", true);
        message.put("members", taskMemberDao.getAvailableMembers(task_id));
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * getTaskComments
     *
     * @param task_id String
     * @return ResponseEntity(REST)
     * <p>
     * 현재 업무에 작성된 댓글 목록 호출
     * - profile => MFile
     * # 예상 예외 처리
     * - 업무 데이터 없을 떄
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    public ResponseEntity getTaskComments(String task_id) {
        Message message = new Message();
        if (taskDao.getTaskById(task_id) == null) {
            message.put("status", false);
            message.put("error_message", "해당 업무의 댓글 목록을 불러올 수 없습니다. 업무 리스트를 최신화 해주세요.");
        } else {
            List<TaskComment> comments = taskCommentDao.getTaskComments(task_id);
            for (TaskComment comment : comments) {
                comment.setDate(comment.getReg_datetime().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")));
                comment.setProfile(companyMemberDao.getCompanyMemberProfile(comment.getMember_no()));
            }
        }
        message.put("status", true);
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }


    /**
     * addComment
     *
     * @param comment String
     * @return ResponseEntity(REST)
     * <p>
     * 현재 업무에 작성된 댓글 목록 호출
     * TODO add taskCommentFile =>
     * - 1. task file로 넣고 comment에 엮을 지 /
     * - 2. taskCommentFile의 객체로 둘지 결정
     * - 만일 getProjectFiles(), getTaskFiles()에서 보여져야 한다면 1번, 아니면 2번
     * # 예상 예외 처리
     * - 업무 데이터 없을 떄
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity addComment(TaskComment comment) {
        Message message = new Message();
        if (taskDao.getTaskById(comment.getTask_id()) == null) {
            message.put("status", false);
            message.put("error_message", "해당 업무의 댓글 목록을 불러올 수 없습니다. 업무 리스트를 최신화 해주세요.");
        } else {

//            switch (comment.getType()) {
//                case TEXT:
//                case MENTION:
//                    break;
//                case FILE:
//            }
            taskCommentDao.addComment(comment);
            comment = taskCommentDao.getTaskCommentByNo(comment.getNo());
            // TODO 몇분 전?
            comment.setDate(comment.getReg_datetime().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")));
            comment.setProfile(companyMemberDao.getCompanyMemberProfile(comment.getMember_no()));
            message.put("comment", comment);
            message.put("status", true);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * deleteComment
     *
     * @param comment_no int
     * @return ResponseEntity(REST)
     * <p>
     * 댓글 삭제
     * # 예상 예외 처리
     * - 내 댓글만 삭제
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity deleteComment(int member_no, int comment_no) {
        Message message = new Message();
        TaskComment comment = taskCommentDao.getTaskCommentByNo(comment_no);
        if (comment.getMember_no() != member_no) {
            message.put("status", false);
            message.put("error_message", "자신의 댓글만 삭제할 수 있습니다.");
        } else {
            taskCommentDao.deleteComment(comment_no);
            message.put("status", true);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * getTaskFiles
     *
     * @param task_id String
     * @return ResponseEntity(REST)
     * <p>
     * 현재 업무에 작성된 파일 목록 호출
     * - 날짜 내림차순 정렬
     * # 예상 예외 처리
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    public ResponseEntity getTaskFiles(String task_id) {
        Message message = new Message();
        if (taskDao.getTaskById(task_id) == null) {
            message.put("status", false);
            message.put("error_message", "해당 업무의 파일 목록을 불러올 수 없습니다. 업무 리스트를 최신화 해주세요.");
        } else {
            List<TaskFile> files = taskFileDao.getTaskFiles(task_id);
            for (TaskFile file : files) {
                file.setDate(file.getReg_datetime().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")));
            }
            message.put("status", true);
            message.put("files", files);
        }
        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * getProjectFiles
     *
     * @param project_no int
     * @return ResponseEntity(REST)
     * <p>
     * 현재 프로젝트에 작성된 파일 목록 호출
     * - 날짜 내림차순 정렬
     * # 예상 예외 처리
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    public ResponseEntity getProjectFiles(int project_no) {
        Message message = new Message();

        List<TaskFile> files = taskFileDao.getProjectFiles(project_no);
        for (TaskFile file : files) {
            file.setDate(file.getReg_datetime().format(DateTimeFormatter.ofPattern("yyyy.MM.dd")));
        }
        message.put("status", true);
        message.put("files", files);

        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }

    /**
     * deleteFile
     *
     * @param file_no int
     * @return ResponseEntity(REST)
     * <p>
     * 업무 내 등록된 파일 삭제
     * # 예상 예외 처리
     * - 회사 데이터 없음 -> Interceptor 처리?
     * - 권한 없음 -> Interceptor 처리?
     **/
    @Transactional
    public ResponseEntity deleteFile(int file_no) {
        Message message = new Message();

        taskFileDao.deleteFile(file_no);
        message.put("status", true);

        return new ResponseEntity(DefaultRes.res(OK, message, true), OK);
    }


    /**
     * private
     * fillContentOnProjectModel
     *
     * @param project Project
     * @return Project
     * Project 모델 내에 엮여진 객체가 많아 내부 데이터를 채우는 것을 함수화
     **/
    private Project fillContentOnProjectModel(Project project) {
        // 프로젝트 내에 boards set
        List<Board> boards = boardDao.getProjectBoards(project.getNo());
        for (Board board : boards) {
            // board 내에 task set
            List<Task> tasks = taskDao.getBoardTasks(board.getId());
            for (Task task : tasks) {
                // task 내에 담당자 set
                List<CompanyProfileMember> members = taskMemberDao.getTaskMembers(task.getId());
                task.setCollaborators(members);
            }
            board.setTaskList(tasks);
        }
        project.setBoardList(boards);
        return project;
    }
}
