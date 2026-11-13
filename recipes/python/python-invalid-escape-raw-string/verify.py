from support import check

def correct():
    compile(r're.findall(r"\d+", s)', "x.py", "exec")

def mistake():
    compile(r're.findall("\d+", s)', "x.py", "exec")

check(__file__, correct, mistake)
