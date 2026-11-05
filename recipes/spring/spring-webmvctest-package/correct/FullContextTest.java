package verify;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest(classes = VerifyTest.App.class)
@AutoConfigureMockMvc
class FullContextTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    void servesTheController() throws Exception {
        mockMvc.perform(get("/hello")).andExpect(status().isOk()).andExpect(content().string("hi"));
    }
}
