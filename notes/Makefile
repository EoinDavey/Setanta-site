.SUFFIXES: .md .pdf

.PHONY: clean default

MDFILES  := $(wildcard src/*.md)
TEXFILES := $(wildcard src/*.tex)
MDTGTS   := $(MDFILES:src/%.md=out/%.pdf)
TGTFILES := $(MDFILES:src/%.md=out/%.pdf) out/interim.pdf out/final-report.pdf

CHAPS := $(wildcard src/chaps/*.tex)

default: $(TGTFILES)

$(MDTGTS): out/%.pdf : src/%.md ;
	pandoc -f markdown -t latex -o $@ --template template.latex src/$*.md

clean:
	${RM} ${TGTFILES}

out/interim.pdf : src/interim.tex
	pdflatex --output-directory out src/interim.tex

out/final-report.pdf : src/final-report.tex $(CHAPS)
	pdflatex --output-directory out src/final-report.tex
