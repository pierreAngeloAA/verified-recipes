package verify;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.restclient.RestTemplateBuilder;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(classes = VerifyTest.App.class, webEnvironment = SpringBootTest.WebEnvironment.NONE)
class VerifyTest {

    @SpringBootConfiguration
    @EnableAutoConfiguration
    static class App {
    }

    @Autowired
    RestTemplateBuilder builder;

    @Test
    void springProvidesTheBuilder() {
        assertNotNull(builder.build());
    }
}
