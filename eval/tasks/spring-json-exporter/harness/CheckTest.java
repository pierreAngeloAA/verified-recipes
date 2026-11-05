package verify;

import static org.junit.jupiter.api.Assertions.assertEquals;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@SpringBootTest(classes = CheckTest.App.class, webEnvironment = SpringBootTest.WebEnvironment.NONE)
class CheckTest {
    @SpringBootConfiguration
    @EnableAutoConfiguration
    @Import(Exporter.class)
    static class App {}

    @Autowired Exporter exporter;

    @Test void exports() {
        assertEquals("{\"a\":1}", exporter.export(Map.of("a", 1)));
    }
}
