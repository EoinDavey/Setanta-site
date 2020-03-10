#!/bin/bash
TMP=/tmp/$1
sed "/---CONTENT---/{
s/---CONTENT---//g
r src/appendices/$1
}" src/apptemplate.tex > $TMP
latexmk -pdf -output-directory=out/appendices $TMP
rm $TMP
