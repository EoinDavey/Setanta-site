#!/bin/bash
set -e
if [ ! -d "tutout/" ]; then
    mkdir -p tutout/assets
fi
for f in tut/*.md; do
    fname=$(basename -s .md $f)
    awk -f tut/proc.awk $f | pandoc -s --defaults tut/defaults.yaml -o tutout/$fname.html;
done;
for f in tut/*.css; do
    fname=$(basename $f)
    cp $f tutout/$fname
done;
cp -r tut/assets/* tutout/assets/.
