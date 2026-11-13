fn first(v: &[i32]) -> Result<i32, String> {
    let x = v.first()?;
    Ok(*x)
}
fn main() {
    first(&[1]).unwrap();
}
