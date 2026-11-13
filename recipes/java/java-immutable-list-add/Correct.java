import java.util.*;
class Main {
  public static void main(String[] args) throws Exception {
    List<String> l = new ArrayList<>(List.of("a"));
    l.add("b");
    if (l.size() != 2) System.exit(1);
  }
}
