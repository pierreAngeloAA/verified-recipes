fn first(v: &[i32]) -> Result<i32, String> {
    let x = v.first().ok_or("empty list")?;
    Ok(*x)
}
fn main() {
    assert_eq!(first(&[]), Err("empty list".to_string()));
}
