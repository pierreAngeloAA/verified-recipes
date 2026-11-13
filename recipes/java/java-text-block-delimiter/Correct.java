class Main {
  public static void main(String[] args) throws Exception {
    String s = """
        hi
        """;
    if (!s.equals("hi\n")) System.exit(1);
  }
}
