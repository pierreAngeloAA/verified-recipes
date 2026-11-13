import java.util.*;
class Main {
  public static void main(String[] args) throws Exception {
    Object o = 1;
    String r = switch (o) { case Integer i -> "int"; case String s -> "str"; };
  }
}
