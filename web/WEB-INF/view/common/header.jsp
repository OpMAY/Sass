<%--
  Created by IntelliJ IDEA.
  User: zlzld
  Date: 2022-08-31
  Time: 오후 8:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    Integer userNo = (Integer) request.getSession().getAttribute("user");
    request.setAttribute("userNo", userNo);
%>
<header id="l-header">
    <img class="cursor-pointer" src="../../resources/assets/images/icon/black-theme-logo-80x40.svg" data-href="/"/>
    <div class="_option ml-auto my-auto">
        <c:if test="${userNo ne null}">
            <div class="bold-h5 c-basic-white" data-toggle="modal" data-target="#setting-modal">내 정보</div>
            <div class="bold-h5 c-basic-white" id="logout">로그아웃</div>
        </c:if>
        <c:if test="${userNo eq null}">
            <div class="bold-h5 c-basic-white" data-toggle="modal" data-target="#login-modal">로그인</div>
            <div class="bold-h5 c-basic-white" data-target="#register-modal" data-toggle="modal">회원가입</div>
        </c:if>
    </div>
</header>
