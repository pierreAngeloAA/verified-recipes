class Main {
  public static void main(String[] args) throws Exception {
    Thread t = new Thread(() -> { while (!Thread.currentThread().isInterrupted()) Thread.onSpinWait(); });
    t.start(); t.interrupt(); t.join(5000);
    if (t.isAlive()) System.exit(1);
  }
}
