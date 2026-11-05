package verify;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@WebMvcTest
class VerifyTest {

    @RestController
    static class HelloController {
        @GetMapping("/hello")
        String hello() {
            return "hi";
        }
    }

    @SpringBootConfiguration
    @EnableAutoConfiguration
    @Import(HelloController.class)
    static class App {
    }

    @Autowired
    MockMvc mockMvc;

    @Test
    void servesTheController() throws Exception {
        mockMvc.perform(get("/hello")).andExpect(status().isOk()).andExpect(content().string("hi"));
    }
}
