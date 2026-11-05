package verify;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Import;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
class HelloController {
    @GetMapping("/hello")
    String hello() {
        return "hi";
    }
}

@SpringBootConfiguration
@EnableAutoConfiguration
@Import(HelloController.class)
class HelloApp {
}
