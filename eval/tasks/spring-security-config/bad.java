package verify;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
class SecurityConfig {
    @Bean
    SecurityFilterChain chain(HttpSecurity http) throws Exception {
        return http.csrf().disable().and()
            .authorizeHttpRequests(a -> a.requestMatchers("/public").permitAll().anyRequest().authenticated())
            .httpBasic(Customizer.withDefaults())
            .build();
    }
}
