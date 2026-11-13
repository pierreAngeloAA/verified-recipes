import java.util.*;
class Main {
  public static void main(String[] args) throws Exception {
    byte[] b = {1, (byte) 255};
    if (!Base64.getEncoder().encodeToString(b).equals("Af8=") || !HexFormat.of().withUpperCase().formatHex(b).equals("01FF")) System.exit(1);
  }
}
