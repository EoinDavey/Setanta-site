.SUFFIXES: .md .pdf

.PHONY: clean default

MDFILES  := $(wildcard src/*.md)
TEXFILES := $(wildcard src/*.tex)
MDTGTS   := $(MDFILES:src/%.md=out/%.pdf)

CHAPS := $(wildcard src/chaps/*.tex)
APDCES := $(wildcard src/appendices/appendix*.tex)
APDCESTGT := $(APDCES:src/appendices/%.tex=out/appendices/%.pdf)

TGTFILES := $(MDFILES:src/%.md=out/%.pdf) out/interim.pdf out/final-report.pdf $(APDCESTGT)

default: $(TGTFILES)

$(MDTGTS): out/%.pdf : src/%.md ;
	pandoc -f markdown -t latex -o $@ --template template.latex src/$*.md

clean:
	${RM} ${TGTFILES}

out/interim.pdf : src/interim.tex
	latexmk -pdf -output-directory=out src/interim.tex

out/final-report.pdf : src/final-report.tex $(CHAPS) $(APDCES)
	latexmk -pdf -output-directory=out src/final-report.tex

$(APDCESTGT): out/appendices/%.pdf : src/appendices/%.tex src/apptemplate.tex
	./buildapp.sh $*.tex
