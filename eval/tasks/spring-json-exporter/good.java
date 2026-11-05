package verify;

import org.springframework.stereotype.Component;
import tools.jackson.databind.json.JsonMapper;

@Component
class Exporter {
    private final JsonMapper mapper;

    Exporter(JsonMapper mapper) {
        this.mapper = mapper;
    }

    String export(Object value) {
        return mapper.writeValueAsString(value);
    }
}
