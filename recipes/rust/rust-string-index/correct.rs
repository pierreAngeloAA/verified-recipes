fn main() {
    let s = String::from("héllo");
    assert_eq!(s.chars().nth(1), Some('é'));
}
