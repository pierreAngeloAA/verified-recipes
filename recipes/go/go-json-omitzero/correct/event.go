package recipe

import "time"

type Event struct {
	Name string    `json:"name"`
	At   time.Time `json:"at,omitzero"`
}
