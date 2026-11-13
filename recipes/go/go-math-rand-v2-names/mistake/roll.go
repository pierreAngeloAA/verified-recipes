package recipe

import "math/rand/v2"

func Roll() int {
	return rand.Intn(6) + 1
}
