package verify;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootTest(classes = VerifyTest.App.class)
@AutoConfigureMockMvc
class VerifyTest {

    @RestController
    static class ApiController {
        @PostMapping("/public")
        String open() {
            return "ok";
        }

        @GetMapping("/private")
        String closed() {
            return "secret";
        }
    }

    @SpringBootConfiguration
    @EnableAutoConfiguration
    @Import(ApiController.class)
    static class App {
        @Bean
        SecurityFilterChain chain(HttpSecurity http) throws Exception {
            return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/public").permitAll()
                    .anyRequest().authenticated())
                .httpBasic(Customizer.withDefaults())
                .build();
        }
    }

    @Autowired
    MockMvc mockMvc;

    @Test
    void postWorksWithoutACsrfToken() throws Exception {
        mockMvc.perform(post("/public")).andExpect(status().isOk());
    }

    @Test
    void theRestOfTheChainStillApplies() throws Exception {
        mockMvc.perform(get("/private")).andExpect(status().isUnauthorized());
    }
}
