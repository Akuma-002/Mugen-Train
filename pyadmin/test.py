def test(x):
    out = 1
    for i in range(1, x):
        out*=i
    out*=x
    return out
