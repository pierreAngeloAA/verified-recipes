fn main() {
    // SAFETY: no other threads exist yet
    unsafe { std::env::set_var("VR_TEST", "1") };
    assert_eq!(std::env::var("VR_TEST").unwrap(), "1");
}
