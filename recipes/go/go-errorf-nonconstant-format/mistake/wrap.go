package recipe

import "fmt"

func Fail(msg string) error {
	return fmt.Errorf(msg)
}
