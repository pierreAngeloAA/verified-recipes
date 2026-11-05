package verify;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
class ClientFactory {
    private final RestTemplateBuilder builder;

    ClientFactory(RestTemplateBuilder builder) {
        this.builder = builder;
    }

    RestTemplate create() {
        return builder.build();
    }
}
