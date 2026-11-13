package recipe

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func status(path string) int {
	rec := httptest.NewRecorder()
	NewMux().ServeHTTP(rec, httptest.NewRequest(http.MethodGet, path, nil))
	return rec.Code
}

func TestRoutes(t *testing.T) {
	if got := status("/"); got != http.StatusOK {
		t.Fatalf("GET / returned %d, want 200", got)
	}
	if got := status("/missing"); got != http.StatusNotFound {
		t.Fatalf("GET /missing returned %d, want 404", got)
	}
}
