package recipe

import "testing"

func TestIndex(t *testing.T) {
	if got := Index([]string{"a", "b"}, "b"); got != 1 {
		t.Fatalf("got %d", got)
	}
}
