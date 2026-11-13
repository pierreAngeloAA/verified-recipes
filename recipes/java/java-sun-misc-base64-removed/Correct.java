import java.util.*;
class Main {
  public static void main(String[] args) throws Exception {
    String s = Base64.getEncoder().encodeToString(new byte[] {1});
    if (Base64.getDecoder().decode(s)[0] != 1) System.exit(1);
  }
}
