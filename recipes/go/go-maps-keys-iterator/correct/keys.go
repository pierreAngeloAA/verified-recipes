package recipe

import (
	"maps"
	"slices"
)

func SortedKeys(m map[string]int) []string {
	return slices.Sorted(maps.Keys(m))
}
