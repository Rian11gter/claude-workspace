import fitz, json, re, sys

def roman(n):
    vals = [(10, "x"), (9, "ix"), (5, "v"), (4, "iv"), (1, "i")]
    s = ""
    for v, r in vals:
        while n >= v:
            s += r; n -= v
    return s

norm = lambda s: re.sub(r"\s+", " ", s).strip()
doc = fitz.open(sys.argv[1])
pages = [norm(p.get_text()) for p in doc]
heads = json.load(open("headings.json"))

# halaman fisik tempat isi (BAB I) dimulai: halaman yang diawali "BAB I PENDAHULUAN"
body_start = next(i for i, t in enumerate(pages) if t.startswith("BAB I PENDAHULUAN"))
toc_idx = next(i for i, t in enumerate(pages) if t.startswith("DAFTAR ISI"))
res = {}
for h in heads:
    key = norm(h)
    if h == "HALAMAN JUDUL":
        res[h] = "i"; continue
    if h == "KATA PENGANTAR":
        idx = next(i for i, t in enumerate(pages) if t.startswith("KATA PENGANTAR"))
    else:
        cands = [i for i, t in enumerate(pages) if i > toc_idx and i >= body_start - 0 and key in t]
        if not cands:
            print("TIDAK DITEMUKAN:", h); continue
        idx = cands[0]
    res[h] = roman(idx + 1) if idx < body_start else str(idx - body_start + 1)
json.dump(res, open("toc_pages.json", "w"), indent=1)
print("total halaman fisik:", len(pages), "| isi mulai hal. fisik", body_start + 1, "| halaman isi:", len(pages) - body_start)
print(res)
