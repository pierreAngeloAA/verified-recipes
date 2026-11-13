import java.util.*;
class Main {
  public static void main(String[] args) throws Exception {
    List<String> l = java.util.stream.Stream.of("a").toList();
    l.add("b");
  }
}
