package verify;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@SpringBootTest(classes = VerifyTest.App.class, webEnvironment = SpringBootTest.WebEnvironment.NONE)
class VerifyTest {

    interface Greeter {
        String greet();
    }

    @SpringBootConfiguration
    static class App {
        @Bean
        Greeter greeter() {
            return () -> "real";
        }
    }

    @MockitoBean
    Greeter greeter;

    @Autowired
    Greeter injected;

    @Test
    void theMockReplacesTheBean() {
        when(greeter.greet()).thenReturn("mock");

        assertEquals("mock", injected.greet());
    }
}
