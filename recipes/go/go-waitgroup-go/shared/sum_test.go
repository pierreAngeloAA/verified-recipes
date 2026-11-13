package recipe

import "testing"

func TestSum(t *testing.T) {
	if got := Sum(100); got != 4950 {
		t.Fatalf("got %d", got)
	}
}
