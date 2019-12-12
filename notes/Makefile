.SUFFIXES: .md .pdf

.PHONY: clean

MDFILES  := $(wildcard src/*.md)
TEXFILES := $(wildcard src/*.tex)
MDTGTS   := $(MDFILES:src/%.md=out/%.pdf)
TEXTGTS  := $(TEXFILES:src/%.tex=out/%.pdf)
TGTFILES := $(MDFILES:src/%.md=out/%.pdf) $(TEXFILES:src/%.tex=out/%.pdf)

default: $(TGTFILES)

$(MDTGTS): out/%.pdf : src/%.md ;
	pandoc -f markdown -t latex -o $@ --template template.latex src/$*.md

$(TEXTGTS): out/%.pdf : src/%.tex ;
	pdflatex --output-directory out src/$*.tex

clean:
	${RM} ${TGTFILES}
