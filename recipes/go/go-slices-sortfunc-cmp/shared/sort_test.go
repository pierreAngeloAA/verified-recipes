package recipe

import "testing"

func TestByAge(t *testing.T) {
	users := []User{{"b", 30}, {"a", 20}}
	ByAge(users)
	if users[0].Name != "a" {
		t.Fatalf("got %v", users)
	}
}
