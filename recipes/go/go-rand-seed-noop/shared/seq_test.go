package recipe

import (
	"slices"
	"testing"
)

func TestSameSeedSameSequence(t *testing.T) {
	a, b := Sequence(42), Sequence(42)
	if !slices.Equal(a, b) {
		t.Fatalf("same seed produced different sequences: %v vs %v", a, b)
	}
}
