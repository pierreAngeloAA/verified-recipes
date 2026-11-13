package recipe

import "testing"

func TestRoll(t *testing.T) {
	for range 1000 {
		if n := Roll(); n < 1 || n > 6 {
			t.Fatalf("roll out of range: %d", n)
		}
	}
}
