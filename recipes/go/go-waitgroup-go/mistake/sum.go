package recipe

import (
	"sync"
	"sync/atomic"
)

func Sum(n int) int64 {
	var wg sync.WaitGroup
	var total atomic.Int64
	for i := range n {
		go func() {
			wg.Add(1)
			defer wg.Done()
			total.Add(int64(i))
		}()
	}
	wg.Wait()
	return total.Load()
}
