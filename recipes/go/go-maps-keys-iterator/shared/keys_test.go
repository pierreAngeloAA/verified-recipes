package recipe

import (
	"slices"
	"testing"
)

func TestSortedKeys(t *testing.T) {
	got := SortedKeys(map[string]int{"b": 2, "a": 1})
	if !slices.Equal(got, []string{"a", "b"}) {
		t.Fatalf("got %v", got)
	}
}
