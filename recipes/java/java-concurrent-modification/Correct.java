import java.util.*;
class Main {
  public static void main(String[] args) throws Exception {
    List<Integer> l = new ArrayList<>(List.of(1, 2, 3, 4));
    l.removeIf(x -> x % 2 == 0);
    if (!l.equals(List.of(1, 3))) System.exit(1);
  }
}
