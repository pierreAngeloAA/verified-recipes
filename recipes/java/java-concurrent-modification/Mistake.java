import java.util.*;
class Main {
  public static void main(String[] args) throws Exception {
    List<Integer> l = new ArrayList<>(List.of(1, 2, 3, 4));
    for (Integer x : l) if (x % 2 == 0) l.remove(x);
  }
}
