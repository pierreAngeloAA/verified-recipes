package recipe

import "math/rand/v2"

func Sequence(seed uint64) []int {
	r := rand.New(rand.NewPCG(seed, 0))
	out := make([]int, 5)
	for i := range out {
		out[i] = r.IntN(1000)
	}
	return out
}
