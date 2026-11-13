import java.util.*;
class Main {
  public static void main(String[] args) throws Exception {
    Optional<String> o = Optional.empty();
    if (!o.orElse("none").equals("none")) System.exit(1);
  }
}
