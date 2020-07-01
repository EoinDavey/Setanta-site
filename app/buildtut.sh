#!/bin/bash
set -e
if [ ! -d "tutout/" ]; then
    mkdir -p tutout/assets
fi

(
    cd tut/
    awk -f scripts/gen_toc.awk *.md > all-toc.html
)

for f in tut/*.md; do
    fname=$(basename -s .md $f)
    awk -f tut/scripts/proc.awk $f | pandoc -s --defaults tut/defaults.yaml -o tutout/$fname.html;
done;

cp tut/*.css tutout/
cp -r tut/assets/* tutout/assets/.
