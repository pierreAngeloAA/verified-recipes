trait Rng { fn gen(&self) -> u8; }
impl Rng for u8 { fn gen(&self) -> u8 { 4 } }
fn main() {
    assert_eq!(0u8.gen(), 4);
}
