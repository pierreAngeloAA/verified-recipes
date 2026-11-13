class Main {
  public static void main(String[] args) throws Exception {
    var d = java.time.LocalDate.parse("2026-1-5", java.time.format.DateTimeFormatter.ofPattern("yyyy-M-d"));
    if (d.getMonthValue() != 1) System.exit(1);
  }
}
