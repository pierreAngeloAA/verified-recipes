extern "C" {
    fn abs(x: i32) -> i32;
}
fn main() {
    assert_eq!(unsafe { abs(-3) }, 3);
}
