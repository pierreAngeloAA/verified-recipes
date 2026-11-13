import java.util.*;
class Main {
  public static void main(String[] args) throws Exception {
    if (!String.format(Locale.ROOT, "%.2f", 9.5).equals("9.50")) System.exit(1);
  }
}
