#[no_mangle]
pub extern "C" fn vr_handler() -> i32 { 1 }
fn main() {
    assert_eq!(vr_handler(), 1);
}
