package recipe

import (
	"sync"
	"sync/atomic"
)

func Sum(n int) int64 {
	var wg sync.WaitGroup
	var total atomic.Int64
	for i := range n {
		wg.Go(func() {
			total.Add(int64(i))
		})
	}
	wg.Wait()
	return total.Load()
}
