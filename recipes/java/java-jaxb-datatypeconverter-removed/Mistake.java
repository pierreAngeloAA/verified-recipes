import javax.xml.bind.DatatypeConverter;
class Main {
  public static void main(String[] args) throws Exception {
    System.out.println(DatatypeConverter.printBase64Binary(new byte[] {1}));
  }
}
