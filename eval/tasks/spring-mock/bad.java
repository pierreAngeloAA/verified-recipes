package verify;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest(classes = GreeterApp.class)
class GreeterTest {
    @MockBean Greeter greeter;
    @Autowired Greeter injected;

    @Test
    void usesMock() {
        when(greeter.greet()).thenReturn("mock");
        assertEquals("mock", injected.greet());
    }
}
