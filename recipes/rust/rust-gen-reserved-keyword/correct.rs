trait Rng { fn random(&self) -> u8; }
impl Rng for u8 { fn random(&self) -> u8 { 4 } }
fn main() {
    assert_eq!(0u8.random(), 4);
}
