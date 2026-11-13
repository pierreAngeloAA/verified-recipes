package recipe

import "testing"

func TestBreakStopsIterator(t *testing.T) {
	var seen []int
	for v := range Count(10) {
		if v == 2 {
			break
		}
		seen = append(seen, v)
	}
	if len(seen) != 2 {
		t.Fatalf("got %v", seen)
	}
}
