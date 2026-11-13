package recipe

import "slices"

type User struct {
	Name string
	Age  int
}

func ByAge(users []User) {
	slices.SortFunc(users, func(a, b User) bool {
		return a.Age < b.Age
	})
}
