package verify;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import tools.jackson.databind.json.JsonMapper;

@SpringBootTest(classes = VerifyTest.App.class, webEnvironment = SpringBootTest.WebEnvironment.NONE)
class VerifyTest {

    @SpringBootConfiguration
    @EnableAutoConfiguration
    static class App {
    }

    record Person(@JsonProperty("full_name") String name) {
    }

    @Autowired
    JsonMapper mapper;

    // This method declares no checked exception, which is part of the recipe.
    @Test
    void springProvidesTheMapperAndAnnotationsStillApply() {
        assertEquals("{\"full_name\":\"Ana\"}", mapper.writeValueAsString(new Person("Ana")));
    }
}
