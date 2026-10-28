# Rebuilds the prototype menu (version dropdown, tabs, desktop/mobile toggle) on every page.
import re

# (label, desktop file, mobile file or None)
ROUNDS = [
    ("Round 1", [("Intro", "Concepts Overview.dc.html", None), ("Concept A", "Concept A.dc.html", None),
                 ("Concept B", "Concept B.dc.html", None), ("Concept C", "Concept C.dc.html", None)]),
    ("Round 2", [("Variant 1", "Round 2 Variant 1.dc.html", "Round 2 Variant 1 Mobile.dc.html"),
                 ("Variant 2", "Round 2 Variant 2.dc.html", "Round 2 Variant 2 Mobile.dc.html"),
                 ("Variant 3", "Round 2 Variant 3.dc.html", "Round 2 Variant 3 Mobile.dc.html")]),
    ("Round 3", [("Homepage", "Round 3.dc.html", "Round 3 Mobile.dc.html")]),
]
F = "font-family:Figtree, sans-serif; font-weight:600; font-size:14px"
NAVSTYLE = "position:fixed; top:12px; left:50%; transform:translateX(-50%); z-index:10000; display:flex; align-items:center; gap:4px; padding:4px; border-radius:8px; background:rgba(20,20,20,0.88); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); box-shadow:0 8px 24px rgba(0,0,0,0.3)"
TAB = f"height:32px; padding:0 18px; border-radius:5px; display:flex; align-items:center; {F}; text-decoration:none; white-space:nowrap"
CHEV = '<svg aria-hidden="true" viewBox="0 0 10 6" width="10" height="6" style="display:block"><path d="M1 1l4 4 4-4" fill="none" stroke="#FFFFFF" stroke-width="1.5"></path></svg>'
CUR = ' aria-current="true"'
SEP = '<span aria-hidden="true" style="width:1px; height:20px; margin:0 6px; background:rgba(255,255,255,0.2)"></span>'
# Hover for pages without the Claude Design runtime (style-hover isn't applied there)
HOVER = '<style>[data-name="Concept switcher"] a[data-sw]:not([aria-current]):hover { background-color:rgba(255,255,255,0.12) !important; }</style>'


def href(f):
    return f.replace(" ", "%20")


def locate(page):
    for r, tabs in ROUNDS:
        for label, d, m in tabs:
            if page == d:
                return r, "desktop"
            if page == m:
                return r, "mobile"
    raise KeyError(page)


def build(page):
    cur, device = locate(page)
    items = []
    for r, tabs in ROUNDS:
        on = r == cur
        items.append(f'<a data-sw="1" href="{href(tabs[0][1])}"{CUR if on else ""} style="display:flex; align-items:center; justify-content:space-between; gap:16px; height:36px; padding:0 12px; border-radius:5px; {F}; text-decoration:none; white-space:nowrap; color:{"#291647" if on else "#FFFFFF"}; background:{"#C68EFD" if on else "transparent"}"' + ("" if on else ' style-hover="background-color:rgba(255,255,255,0.12)"') + f'>{r}</a>')
    dd = ('<details data-name="Version" style="position:relative">'
          '<style>[data-name="Version"] > summary::-webkit-details-marker { display:none; } [data-name="Version"][open] > summary svg { transform:rotate(180deg); }</style>'
          f'<summary aria-label="Version: {cur}" style="list-style:none; height:32px; padding:0 12px 0 14px; border-radius:5px; border:1px solid rgba(255,255,255,0.25); box-sizing:border-box; display:flex; align-items:center; gap:10px; {F}; color:#FFFFFF; cursor:pointer; white-space:nowrap">{cur}{CHEV}</summary>'
          '<div style="position:absolute; left:0; top:40px; min-width:140px; padding:4px; border-radius:8px; background:rgba(20,20,20,0.95); box-shadow:0 8px 24px rgba(0,0,0,0.3); display:flex; flex-direction:column; gap:2px">' + "".join(items) + '</div></details>')
    tabs = []
    for label, d, m in dict(ROUNDS)[cur]:
        target = m if (device == "mobile" and m) else d
        if target == page:
            tabs.append(f'<a data-sw="1" href="{href(target)}" aria-current="page" style="{TAB}; background:#C68EFD; color:#291647; cursor:pointer">{label}</a>')
        else:
            tabs.append(f'<a data-sw="1" href="{href(target)}" style="{TAB}; color:#FFFFFF; transition:background-color .2s ease" style-hover="background-color:rgba(255,255,255,0.12)">{label}</a>')
    toggle = ""
    pair = next(((d, m) for label, d, m in dict(ROUNDS)[cur] if page in (d, m)), None)
    if pair and pair[1]:
        seg = []
        for name, f in (("Desktop", pair[0]), ("Mobile", pair[1])):
            on = (name.lower() == device)
            seg.append(f'<a data-sw="1" href="{href(f)}"' + (' aria-current="page"' if on else "") + f' style="height:26px; padding:0 12px; border-radius:4px; display:flex; align-items:center; {F}; font-size:13px; text-decoration:none; white-space:nowrap; color:{"#291647" if on else "#FFFFFF"}; background:{"#FFFFFF" if on else "transparent"}"' + ("" if on else ' style-hover="background-color:rgba(255,255,255,0.12)"') + f'>{name}</a>')
        toggle = SEP + '<span role="group" aria-label="Device" style="display:flex; gap:2px; padding:3px; border-radius:6px; border:1px solid rgba(255,255,255,0.25)">' + "".join(seg) + '</span>'
    return f'<nav data-name="Concept switcher" aria-label="Switch version and concept" style="{NAVSTYLE}">' + HOVER + dd + SEP + "".join(tabs) + toggle + "</nav>"


if __name__ == "__main__":
    for _, tabs in ROUNDS:
        for _, d, m in tabs:
            for f in (d, m):
                if not f:
                    continue
                s = open(f, encoding="utf-8").read()
                found = re.findall(r'<nav data-name="Concept switcher".*?</nav>', s, re.S)
                assert len(found) == 1, (f, len(found))
                open(f, "w", encoding="utf-8").write(s.replace(found[0], build(f)))
                print("ok", f)
