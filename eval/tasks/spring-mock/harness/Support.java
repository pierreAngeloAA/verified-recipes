package verify;

import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;

interface Greeter {
    String greet();
}

@SpringBootConfiguration
class GreeterApp {
    @Bean
    Greeter greeter() {
        return () -> "real";
    }
}
