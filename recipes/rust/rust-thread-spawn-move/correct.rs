fn main() {
    let v = vec![1, 2];
    let h = std::thread::spawn(move || v.len());
    assert_eq!(h.join().unwrap(), 2);
}
