package recipe

import "math/rand"

func Sequence(seed uint64) []int {
	rand.Seed(int64(seed))
	out := make([]int, 5)
	for i := range out {
		out[i] = rand.Intn(1000)
	}
	return out
}
