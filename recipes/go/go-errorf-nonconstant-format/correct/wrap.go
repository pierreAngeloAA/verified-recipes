package recipe

import "errors"

func Fail(msg string) error {
	return errors.New(msg)
}
