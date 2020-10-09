package nl.roellucassen.readroyal.api.logic;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.RSASSASigner;
import com.nimbusds.jose.crypto.RSASSAVerifier;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.gen.RSAKeyGenerator;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import nl.roellucassen.readroyal.api.exception.JWTExpirationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.security.interfaces.RSAPublicKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Component("TokenManager")
public class TokenManagerImpl implements TokenManager {

    private RSAKey key;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public TokenManagerImpl() {
        try {
            key = new RSAKeyGenerator(2048).keyID(UUID.randomUUID().toString()).generate();
        } catch (JOSEException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String issueToken(String userId, String userRole) {
        try {
            Date expirationDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));
            JWSSigner signer = new RSASSASigner(key);
            JWTClaimsSet cs = new JWTClaimsSet.Builder().subject(userId).expirationTime(expirationDate).claim("User_Role", userRole).build();
            SignedJWT signedJWT = new SignedJWT(new JWSHeader.Builder(JWSAlgorithm.RS256).keyID(key.getKeyID()).build(), cs);
            signedJWT.sign(signer);
            String token = signedJWT.serialize();
            logger.info("A JWT_token has been issued for userid: " + userId);
            return token;

        } catch (Exception ex) {

            return null;

        }
    }

    @Override
    public String parse(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            RSAPublicKey publicKey = key.toRSAPublicKey();
            JWSVerifier verifier = new RSASSAVerifier(publicKey);
            boolean success = signedJWT.verify(verifier);
            if (success) {
                Date expirationDate = signedJWT.getJWTClaimsSet().getExpirationTime();
                if (expirationDate.before(Date.from(Instant.now()))) {
                    throw new JWTExpirationException("The jwttoken has been expired: Date in token = " + expirationDate + " and date now =" + Date.from(Instant.now()));
                }
                String userRole = signedJWT.getJWTClaimsSet().getStringClaim("User_Role");
                String userId = signedJWT.getJWTClaimsSet().getSubject();
                return userId;
            } else {
                logger.info("The jwttokensignature has changed. This token is invalid");
                return null;
            }
        } catch (Exception ex) {
          logger.error(ex.getMessage());
            return null;
        }
    }

}
