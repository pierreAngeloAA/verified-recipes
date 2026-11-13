use std::rc::Rc;
fn main() {
    let shared = Rc::new(1);
    std::thread::spawn(move || println!("{shared}")).join().unwrap();
}
