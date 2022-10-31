package com.service.crm;

import com.dao.CompanyDao;
import com.dao.CompanyMemberDao;
import com.dao.crm.*;
import com.model.User;
import com.model.crm.Board;
import com.model.crm.Project;
import com.model.crm.Task;
import com.model.crm.state.TASK_STATUS_TYPE;
import com.response.DefaultRes;
import com.response.Message;
import com.util.Encryption.EncryptionService;
import com.util.Time;
import com.util.TokenGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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
        log.info("프로젝트 복사 시작 : {}", start_time);
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
        log.info("==== Project 객체 복사 완료 : {}", project_done_time);
        log.info("==== 소요 시간 : {}초", Time.getDateSecondDiff(project_done_time, start_time));
        // GET original Boards
        List<Board> boards = boardDao.getProjectBoards(project_no);
        for (Board board : boards) {
            board.setTaskList(taskDao.getBoardTasks(board.getId()));
        }

        // Copy Boards
        for (Board board : boards) {
            copyBoard(board);
        }
        log.info("Board 및 Task 복사 완료, 소요시간 : {}초", Time.getDateSecondDiff(Time.LongTimeStamp(0), start_time));

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
        taskDao.changeTaskStatus(task_id);
        boolean complete = taskDao.checkTaskCompleted(task_id);
        message.put("complete", complete);
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
        } else {
            return new ResponseEntity<>(DefaultRes.res(HttpStatus.BAD_REQUEST), OK);
        }
        return new ResponseEntity<>(DefaultRes.res(OK, message, true), OK);
    }

    @Transactional
    public Board copyBoard(Board original_board) {
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
            copyTask(task);
        }

        return copied_board;
    }

    @Transactional
    public Task copyTask(Task original_task) {
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
        // TODO taskDao.createTask() 와 동일하지만 추후 수정 가능성을 위해 분할 - 해당 쿼리 수정 시 주석 삭제
        taskDao.copyTask(copied_task);

        // 기존 Task 에 엮여진 담당자들 복사할 Task에 엮기
        if (!taskDao.getBoardTasks(original_task.getBoard_id()).isEmpty()) {
            taskMemberDao.copyTask(original_task.getId(), copied_task.getId());
        }
        return copied_task;
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
                List<User> members = taskMemberDao.getTaskMembers(task.getId());
                task.setCollaborators(members);
            }
            board.setTaskList(tasks);
        }
        project.setBoardList(boards);
        return project;
    }
}
