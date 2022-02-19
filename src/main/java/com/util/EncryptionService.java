package com.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.model.User;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;

import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

@Service

public class EncryptionService {

    public HashMap<String, Object> decodeJWT(String encryptedJWT) {
        try {
            Algorithm algorithm = Algorithm.HMAC256("secret");
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer("auth0")
                    .build(); //Reusable verifier instance
            DecodedJWT jwt = verifier.verify(encryptedJWT);

            String email = jwt.getClaim("email").asString();
            String signature = jwt.getClaim("signature").asString();
            String grant = jwt.getClaim("grant").asString();
            String version = jwt.getClaim("version").asString();
            String access_token = jwt.getClaim("access_token").asString();
            int user_no = jwt.getClaim("user_no").asInt();

            HashMap<String, Object> hashMap = new HashMap<>();
            hashMap.put("email", email);
            hashMap.put("signature", signature);
            hashMap.put("grant", grant);
            hashMap.put("version", version);
            hashMap.put("access_token", access_token);
            hashMap.put("user_no", user_no);

            return hashMap;
        } catch (NullPointerException e) {
            e.printStackTrace();
            return null;
        }
    }

    public String encryptionJWT(User user) throws NoSuchAlgorithmException {
        Algorithm algorithm = Algorithm.HMAC256("secret");
        return JWT.create()
                .withExpiresAt(Time.LongTimeStamp())
                .withClaim("version", Constant.VERSION)
                .withClaim("grant", user.getGrant())
                .withClaim("access_token", user.getAccess_token())
                .withClaim("email", user.getEmail()) //후에 ID로 대체
                .withClaim("user_no", user.getNo())
                .withClaim("signature", encryptionSHA256("secret"))
                .withIssuer("auth0")
                .sign(algorithm);
    }

    /**
     * SHA-256으로 해싱하는 메소드
     *
     * @param msg
     * @return bytes
     * @throws NoSuchAlgorithmException
     */
    public String encryptionSHA256(String msg) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(msg.getBytes());
        return bytesToHex(md.digest());
    }

    /**
     * 바이트를 헥스값으로 변환한다.
     *
     * @param bytes
     * @return
     */
    public String bytesToHex(byte[] bytes) {
        StringBuilder builder = new StringBuilder();
        for (byte b : bytes) {
            builder.append(String.format("%02x", b));
        }
        return builder.toString();
    }

    /**
     * AES256 Encrypt Algorithm
     */
    private final String alg = "AES/CBC/PKCS5Padding";
    private final String key = "0123456789012345";
    private final String iv = key.substring(0, 16); // 16byte

    public String encryptAES(String text) throws Exception {
        Cipher cipher = Cipher.getInstance(alg);
        SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
        IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
        cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivParamSpec);

        byte[] encrypted = cipher.doFinal(text.getBytes("UTF-8"));
        return Base64.getEncoder().encodeToString(encrypted);
    }

    public String decryptAES(String cipherText) throws Exception {
        Cipher cipher = Cipher.getInstance(alg);
        SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(), "AES");
        IvParameterSpec ivParamSpec = new IvParameterSpec(iv.getBytes());
        cipher.init(Cipher.DECRYPT_MODE, keySpec, ivParamSpec);

        byte[] decodedBytes = Base64.getDecoder().decode(cipherText);
        byte[] decrypted = cipher.doFinal(decodedBytes);
        return new String(decrypted, "UTF-8");
    }

}
