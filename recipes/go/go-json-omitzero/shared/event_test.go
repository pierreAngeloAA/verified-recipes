package recipe

import (
	"encoding/json"
	"testing"
)

func TestZeroTimeIsOmitted(t *testing.T) {
	out, err := json.Marshal(Event{Name: "deploy"})
	if err != nil {
		t.Fatal(err)
	}
	if string(out) != `{"name":"deploy"}` {
		t.Fatalf("got %s", out)
	}
}
