static mut COUNT: u32 = 0;
fn main() {
    let r = unsafe { &COUNT };
    println!("{r}");
}
