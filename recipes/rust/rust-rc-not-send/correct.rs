use std::sync::{Arc, Mutex};
fn main() {
    let shared = Arc::new(Mutex::new(0));
    let s = Arc::clone(&shared);
    std::thread::spawn(move || *s.lock().unwrap() += 1).join().unwrap();
    assert_eq!(*shared.lock().unwrap(), 1);
}
