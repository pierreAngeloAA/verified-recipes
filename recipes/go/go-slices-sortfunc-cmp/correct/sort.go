package recipe

import (
	"cmp"
	"slices"
)

type User struct {
	Name string
	Age  int
}

func ByAge(users []User) {
	slices.SortFunc(users, func(a, b User) int {
		return cmp.Compare(a.Age, b.Age)
	})
}
