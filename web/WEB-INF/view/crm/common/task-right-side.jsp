<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<div id="okiwi-crm-right-side"
     class="right-side-container is-close is-closed">
    <div class="right-side-inner">
        <div class="_header">
            <div class="_back">
                <svg width="22"
                     height="20"
                     viewBox="0 0 22 20"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 9.75H21"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"/>
                    <path d="M12.25 1L21 9.75L12.25 18.5"
                          stroke="black"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="_delete">
                <svg width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_42_9810)">
                        <path d="M7 6V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H16C16.2652 2 16.5196 2.10536 16.7071 2.29289C16.8946 2.48043 17 2.73478 17 3V6H22V8H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V8H2V6H7ZM13.414 14L15.182 12.232L13.768 10.818L12 12.586L10.232 10.818L8.818 12.232L10.586 14L8.818 15.768L10.232 17.182L12 15.414L13.768 17.182L15.182 15.768L13.414 14ZM9 4V6H15V4H9Z"
                              fill="black"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_42_9810">
                            <rect width="24"
                                  height="24"
                                  fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
        <div class="_title">
            <div class="_name medium-h3">
                <input type="text"
                       name="right-side-task-name"
                       placeholder="업무 이름을 입력해주세요."/>
            </div>
            <span class="checkbox">
        <i class="fas fa-check"
           aria-hidden="true"></i>
      </span>
        </div>
        <div class="_info">
            <div class="form-group row _type _assign">
                <label class="col-sm-2 col-form-label">담당자</label>
                <div class="col-sm-10 d-flex my-auto user-item-container">
                    <div class="user-item add btn-group dropright dropleft ml-0">
                        <div data-toggle="dropdown"
                             aria-expanded="false">
                            <svg width="24"
                                 height="24"
                                 viewBox="0 0 32 32"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16"
                                        cy="16"
                                        r="16"
                                        fill="#F2F2F2"/>
                                <path d="M16 9C16.2321 9 16.4546 9.09219 16.6187 9.25628C16.7828 9.42038 16.875 9.64294 16.875 9.875V15.125H22.125C22.3571 15.125 22.5796 15.2172 22.7437 15.3813C22.9078 15.5454 23 15.7679 23 16C23 16.2321 22.9078 16.4546 22.7437 16.6187C22.5796 16.7828 22.3571 16.875 22.125 16.875H16.875V22.125C16.875 22.3571 16.7828 22.5796 16.6187 22.7437C16.4546 22.9078 16.2321 23 16 23C15.7679 23 15.5454 22.9078 15.3813 22.7437C15.2172 22.5796 15.125 22.3571 15.125 22.125V16.875H9.875C9.64294 16.875 9.42038 16.7828 9.25628 16.6187C9.09219 16.4546 9 16.2321 9 16C9 15.7679 9.09219 15.5454 9.25628 15.3813C9.42038 15.2172 9.64294 15.125 9.875 15.125H15.125V9.875C15.125 9.64294 15.2172 9.42038 15.3813 9.25628C15.5454 9.09219 15.7679 9 16 9Z"
                                      fill="white"/>
                            </svg>
                        </div>
                        <div class="dropdown-menu">
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group row _type _start">
                <label class="col-sm-2 col-form-label">시작 일자</label>
                <div class="col-sm-10 d-flex">
                    <div class="my-auto start-datepicker-container position-relative">
                        <input type="text"
                               id="start"
                               data-provide="datepicker"
                               placeholder="시작 일자"
                               class="form-control form-control-plaintext my-auto">
                    </div>
                </div>
            </div>
            <div class="form-group row _type _end">
                <label class="col-sm-2 col-form-label">마감 일자</label>
                <div class="col-sm-10 d-flex">
                    <div class="my-auto end-datepicker-container position-relative">
                        <input type="text"
                               id="end"
                               data-provide="datepicker"
                               placeholder="마감 일자"
                               class="form-control form-control-plaintext my-auto">
                    </div>
                </div>
            </div>
        </div>
        <div class="_tab">
            <ul class="nav nav-tabs"
                id="task-tab"
                role="tablist">
                <li class="nav-item"
                    role="presentation">
                    <button class="nav-link active"
                            id="task-content-tab"
                            data-toggle="tab"
                            data-target="#task-content"
                            type="button"
                            role="tab"
                            data-type="content"
                            aria-controls="task-content"
                            aria-selected="true">내용
                    </button>
                </li>
                <li class="nav-item"
                    role="presentation">
                    <button class="nav-link"
                            id="task-comment-tab"
                            data-toggle="tab"
                            data-target="#task-comment"
                            type="button"
                            role="tab"
                            data-type="comment"
                            aria-controls="task-comment"
                            aria-selected="false">댓글
                    </button>
                </li>
                <li class="nav-item"
                    role="presentation">
                    <button class="nav-link"
                            id="task-file-tab"
                            data-toggle="tab"
                            data-target="#task-file"
                            type="button"
                            role="tab"
                            data-type="file"
                            aria-controls="task-file"
                            aria-selected="false">파일
                    </button>
                </li>
            </ul>
            <div class="tab-content"
                 id="taskTabContent">
                <div class="tab-pane  show active"
                     id="task-content"
                     role="tabpanel"
                     aria-labelledby="task-content-tab">
                    <div class="content-editable-container"
                         placeholder="내용을 입력해주세요."
                         contenteditable="true"></div>
                    <div class="_subtasks">
                        <div class="subtask-item add c-brand-red">
                            <div class="_title">
                                <div class="_name regular-h5">
                                    + 하위 업무 추가하기
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="_content-container-remover">
                        <i class="far fa-eye-slash"></i>
                    </div>
                </div>
                <div class="tab-pane fade"
                     id="task-comment"
                     role="tabpanel"
                     aria-labelledby="task-comment-tab">
                    <div class="_comments">
                    </div>
                    <div class="_comment-input-container">
                        <div class="_input-inner">
                <textarea id="comment-input"
                          class="form-control"
                          placeholder="댓글을 입력해주세요."
                          rows="3"></textarea>
                            <div class="_write">
                                <svg width="32"
                                     height="32"
                                     viewBox="0 0 32 32"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="16"
                                            cy="16"
                                            r="16"
                                            fill="#F06A6A"/>
                                    <path d="M23.0714 8.93836C22.9731 8.84067 22.8489 8.77304 22.7135 8.74341C22.5781 8.71378 22.437 8.72338 22.3068 8.77109L6.28825 14.589C6.1501 14.6413 6.03117 14.7344 5.94724 14.8558C5.86331 14.9773 5.81836 15.1214 5.81836 15.2689C5.81836 15.4165 5.86331 15.5606 5.94724 15.682C6.03117 15.8035 6.1501 15.8966 6.28825 15.9489L12.5428 18.4433L17.159 13.8181L18.1857 14.8435L13.5476 19.476L16.0523 25.723C16.1063 25.8583 16.1997 25.9743 16.3204 26.056C16.4411 26.1377 16.5836 26.1812 16.7295 26.1811C16.8766 26.1781 17.0194 26.1306 17.139 26.0449C17.2585 25.9592 17.3493 25.8394 17.3993 25.7011L23.2243 9.70196C23.2739 9.57329 23.2858 9.43319 23.2588 9.29799C23.2317 9.1628 23.1667 9.03807 23.0714 8.93836Z"
                                          fill="white"/>
                                </svg>
                            </div>
                        </div>
                        <div class="_control-panel">
                            <ul>
                                <li class="_file">
                                    <svg width="24"
                                         height="24"
                                         viewBox="0 0 24 24"
                                         fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_42_6509)">
                                            <path d="M17.657 14.828L16.243 13.414L17.657 12C18.0285 11.6286 18.3231 11.1876 18.5241 10.7023C18.7252 10.217 18.8286 9.69681 18.8286 9.1715C18.8286 8.6462 18.7252 8.12605 18.5241 7.64073C18.3231 7.15542 18.0285 6.71445 17.657 6.343C17.2856 5.97156 16.8446 5.67691 16.3593 5.47589C15.874 5.27487 15.3538 5.1714 14.8285 5.1714C14.3032 5.1714 13.7831 5.27487 13.2977 5.47589C12.8124 5.67691 12.3715 5.97156 12 6.343L10.586 7.757L9.17201 6.343L10.586 4.929C11.7143 3.81892 13.2356 3.19966 14.8184 3.2061C16.4012 3.21255 17.9174 3.84418 19.0366 4.96341C20.1558 6.08265 20.7875 7.5988 20.7939 9.18162C20.8004 10.7644 20.1811 12.2857 19.071 13.414L17.657 14.828ZM14.828 17.657L13.414 19.071C12.8585 19.6356 12.1968 20.0846 11.4669 20.3922C10.737 20.6998 9.95343 20.8598 9.16139 20.863C8.36936 20.8662 7.58452 20.7126 6.85215 20.411C6.11979 20.1094 5.45438 19.6658 4.89432 19.1057C4.33426 18.5456 3.89063 17.8802 3.58902 17.1479C3.28741 16.4155 3.13379 15.6307 3.13701 14.8386C3.14024 14.0466 3.30025 13.263 3.60781 12.5331C3.91538 11.8033 4.36441 11.1415 4.92901 10.586L6.34301 9.172L7.75701 10.586L6.34301 12C5.97157 12.3714 5.67692 12.8124 5.4759 13.2977C5.27488 13.783 5.17141 14.3032 5.17141 14.8285C5.17141 15.3538 5.27488 15.874 5.4759 16.3593C5.67692 16.8446 5.97157 17.2856 6.34301 17.657C6.71446 18.0284 7.15543 18.3231 7.64074 18.5241C8.12605 18.7251 8.64621 18.8286 9.17151 18.8286C9.69681 18.8286 10.217 18.7251 10.7023 18.5241C11.1876 18.3231 11.6286 18.0284 12 17.657L13.414 16.243L14.828 17.657ZM14.828 7.757L16.243 9.172L9.17201 16.242L7.75701 14.828L14.828 7.758V7.757Z"
                                                  fill="black"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_42_6509">
                                                <rect width="24"
                                                      height="24"
                                                      fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </li>
                                <li class="_mention">
                                    <svg width="24"
                                         height="24"
                                         viewBox="0 0 24 24"
                                         fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_42_3275)">
                                            <path d="M20 12C19.9998 10.2169 19.4039 8.48494 18.3069 7.07919C17.2099 5.67345 15.6747 4.67448 13.9451 4.24094C12.2155 3.80739 10.3906 3.96411 8.76028 4.68621C7.12992 5.40831 5.78753 6.65439 4.94629 8.22659C4.10504 9.79879 3.81316 11.607 4.11699 13.364C4.42083 15.1211 5.30296 16.7262 6.62331 17.9246C7.94366 19.1231 9.62653 19.846 11.4047 19.9787C13.1829 20.1114 14.9544 19.6462 16.438 18.657L17.548 20.321C15.9062 21.4187 13.975 22.0032 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12V13.5C22.0001 14.2488 21.7601 14.9778 21.3152 15.5801C20.8703 16.1823 20.244 16.626 19.5283 16.846C18.8126 17.066 18.0453 17.0507 17.3389 16.8023C16.6326 16.5539 16.0245 16.0855 15.604 15.466C14.9366 16.16 14.083 16.6465 13.1457 16.8671C12.2085 17.0877 11.2275 17.033 10.3206 16.7096C9.41366 16.3861 8.61943 15.8077 8.03331 15.0438C7.44718 14.2799 7.09408 13.363 7.01644 12.4033C6.9388 11.4436 7.13991 10.4819 7.59562 9.63367C8.05133 8.78549 8.74225 8.08692 9.58537 7.6219C10.4285 7.15688 11.3879 6.94519 12.3485 7.01227C13.309 7.07934 14.2297 7.42232 15 8H17V13.5C17 13.8978 17.158 14.2794 17.4393 14.5607C17.7206 14.842 18.1022 15 18.5 15C18.8978 15 19.2794 14.842 19.5607 14.5607C19.842 14.2794 20 13.8978 20 13.5V12ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z"
                                                  fill="black"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_42_3275">
                                                <rect width="24"
                                                      height="24"
                                                      fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </li>
                                <li class="_emoji">
                                    <button id="control-emoji-button"
                                            type="button"></button>
                                    <svg width="24"
                                         height="24"
                                         viewBox="0 0 24 24"
                                         fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_42_11364)">
                                            <path d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM7 13H9C9 13.7956 9.31607 14.5587 9.87868 15.1213C10.4413 15.6839 11.2044 16 12 16C12.7956 16 13.5587 15.6839 14.1213 15.1213C14.6839 14.5587 15 13.7956 15 13H17C17 14.3261 16.4732 15.5979 15.5355 16.5355C14.5979 17.4732 13.3261 18 12 18C10.6739 18 9.40215 17.4732 8.46447 16.5355C7.52678 15.5979 7 14.3261 7 13ZM8 11C7.60218 11 7.22064 10.842 6.93934 10.5607C6.65804 10.2794 6.5 9.89782 6.5 9.5C6.5 9.10218 6.65804 8.72064 6.93934 8.43934C7.22064 8.15804 7.60218 8 8 8C8.39782 8 8.77936 8.15804 9.06066 8.43934C9.34196 8.72064 9.5 9.10218 9.5 9.5C9.5 9.89782 9.34196 10.2794 9.06066 10.5607C8.77936 10.842 8.39782 11 8 11ZM16 11C15.6022 11 15.2206 10.842 14.9393 10.5607C14.658 10.2794 14.5 9.89782 14.5 9.5C14.5 9.10218 14.658 8.72064 14.9393 8.43934C15.2206 8.15804 15.6022 8 16 8C16.3978 8 16.7794 8.15804 17.0607 8.43934C17.342 8.72064 17.5 9.10218 17.5 9.5C17.5 9.89782 17.342 10.2794 17.0607 10.5607C16.7794 10.842 16.3978 11 16 11Z"
                                                  fill="black"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_42_11364">
                                                <rect width="24"
                                                      height="24"
                                                      fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade"
                     id="task-file"
                     role="tabpanel"
                     aria-labelledby="task-file-tab">
                    <div class="_files-container file-container">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>