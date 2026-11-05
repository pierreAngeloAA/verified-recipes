package verify;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

class VerifyTest {
    void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
    }
}
