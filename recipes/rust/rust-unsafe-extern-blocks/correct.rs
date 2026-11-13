unsafe extern "C" {
    safe fn abs(x: i32) -> i32;
}
fn main() {
    assert_eq!(abs(-3), 3);
}
