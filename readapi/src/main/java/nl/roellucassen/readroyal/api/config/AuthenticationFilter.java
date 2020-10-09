package nl.roellucassen.readroyal.api.config;

import nl.roellucassen.readroyal.api.logic.Factory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class AuthenticationFilter extends OncePerRequestFilter {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

        String header = httpServletRequest.getHeader("Authorization");

        if (header == null) {
filterChain.doFilter(httpServletRequest, httpServletResponse);
        } else {
            final String jwttoken = header.replace("Bearer ", "");
            if (jwttoken == null || Factory.getInstance().parse(jwttoken) == null) {
                httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "The token is not valid.");
                filterChain.doFilter(httpServletRequest, httpServletResponse);
            }

            final String userId = Factory.getInstance().parse(jwttoken);

            // TODO get this from auth request
            List<String> authorities = new ArrayList<>();
            authorities.add("ROLE_USER");
            // Authenticate the user
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userId, null, authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
            SecurityContextHolder.getContext().setAuthentication(auth);
            this.logger.info("Authenticated: " + SecurityContextHolder.getContext().getAuthentication().isAuthenticated());
            filterChain.doFilter(httpServletRequest, httpServletResponse);
        }


    }
}
