from support import check
import importlib.util, tempfile, os
path = os.path.join(tempfile.mkdtemp(), "cfg.py"); open(path, "w").write("X = 1")

def correct():
    spec = importlib.util.spec_from_file_location("cfg", path)
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert mod.X == 1

def mistake():
    import imp
    imp.load_source("cfg", path)

check(__file__, correct, mistake)
