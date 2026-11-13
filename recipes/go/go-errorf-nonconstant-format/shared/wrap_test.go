package recipe

import "testing"

func TestMessageKeptVerbatim(t *testing.T) {
	if got := Fail("upload 100% done").Error(); got != "upload 100% done" {
		t.Fatalf("got %q", got)
	}
}
