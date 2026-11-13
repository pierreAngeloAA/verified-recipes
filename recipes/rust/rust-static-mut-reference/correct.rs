use std::sync::atomic::{AtomicU32, Ordering};
static COUNT: AtomicU32 = AtomicU32::new(0);
fn main() {
    COUNT.fetch_add(1, Ordering::Relaxed);
    assert_eq!(COUNT.load(Ordering::Relaxed), 1);
}
