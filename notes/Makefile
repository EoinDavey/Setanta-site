.SUFFIXES: .md .pdf

.PHONY: clean

MDFILES := $(wildcard src/*.md)
TGTFILES := $(MDFILES:src/%.md=out/%.pdf)

default: $(TGTFILES)

$(TGTFILES): out/%.pdf : src/%.md ;
	pandoc -f markdown -t latex -o $@ src/$*.md

clean:
	${RM} ${TGTFILES}
