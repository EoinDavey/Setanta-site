.SUFFIXES: .md .pdf

.PHONY: clean

MDFILES := $(wildcard *.md)

.md.pdf:
	pandoc -f markdown -t latex -o $*.pdf $*.md

default: $(MDFILES:.md=.pdf)

clean:
	${RM} *.pdf
