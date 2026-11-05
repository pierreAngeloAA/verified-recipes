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
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootTest(classes = CheckTest.App.class)
@AutoConfigureMockMvc
class CheckTest {
    @RestController
    static class Api {
        @PostMapping("/public") String open() { return "ok"; }
        @GetMapping("/private") String closed() { return "secret"; }
    }

    @SpringBootConfiguration
    @EnableAutoConfiguration
    @Import({Api.class, SecurityConfig.class})
    static class App {}

    @Autowired MockMvc mockMvc;

    @Test void postWithoutCsrfToken() throws Exception {
        mockMvc.perform(post("/public")).andExpect(status().isOk());
    }

    @Test void privateNeedsAuthentication() throws Exception {
        mockMvc.perform(get("/private")).andExpect(status().isUnauthorized());
    }
}
