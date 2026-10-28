# Builds search-modal.js from tools/search-modal.src.js, filling in the answers and sources
# from the Search and Discovery prototype so the two stay in step. Run from the repo root.
lines = open("Search and Discovery.dc.html", encoding="utf-8").read().split("\n")


def block(opener, closer):
    start = next(i for i, l in enumerate(lines) if l.startswith(opener))
    end = next(i for i, l in enumerate(lines) if i > start and l == closer)
    return "\n".join(lines[start + 1:end])


src = open("tools/search-modal.src.js", encoding="utf-8").read()
out = src.replace("/*KNOWLEDGE*/", block("  knowledge = [", "  ];")).replace("/*SUBJECTS*/", block("  subjectAnswers = {", "  };"))
open("search-modal.js", "w", encoding="utf-8").write(out)
print("wrote search-modal.js")
