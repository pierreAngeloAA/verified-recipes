fn main() {
    let mut v: Vec<f64> = vec![2.5, 1.0];
    v.sort_by(|a, b| a.total_cmp(b));
    assert_eq!(v, [1.0, 2.5]);
}
