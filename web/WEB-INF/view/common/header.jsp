<%@ page import="com.util.Encryption.JWTEnum" %>
<%@ page import="com.util.Encryption.EncryptionService" %>
<%@ page import="java.util.HashMap" %><%--
  Created by IntelliJ IDEA.
  User: zlzld
  Date: 2022-08-31
  Time: 오후 8:59
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    String jwtToken  = (String) request.getSession().getAttribute(JWTEnum.JWTToken.name());
    if (jwtToken != null && !jwtToken.equals("")) {
        HashMap<String, Object> token = new EncryptionService().decryptJWT(jwtToken);
        request.setAttribute("token", token);
    }
%>
<header id="l-header">
    <img class="cursor-pointer" src="../../resources/assets/images/icon/black-theme-logo-80x40.svg" data-href="/"/>
    <div class="_option ml-auto my-auto">
        <c:choose>
            <c:when test="${token eq null}">
                <div class="bold-h5 c-basic-white" data-toggle="modal" data-target="#login-modal">로그인</div>
                <div class="bold-h5 c-basic-white" data-target="#register-modal" data-toggle="modal">회원가입</div>
            </c:when>
            <c:otherwise>
                <div class="bold-h5 c-basic-white" data-is-company="false" data-toggle="modal" data-no="${token.get(JWTEnum.NO)}" data-target="#setting-modal">내 정보</div>
                <div class="bold-h5 c-basic-white" id="logout">로그아웃</div>
            </c:otherwise>
        </c:choose>
    </div>
</header>
