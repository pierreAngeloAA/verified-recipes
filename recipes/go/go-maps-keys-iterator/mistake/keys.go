package recipe

import (
	"maps"
	"sort"
)

func SortedKeys(m map[string]int) []string {
	keys := maps.Keys(m)
	sort.Strings(keys)
	return keys
}
