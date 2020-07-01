BEGIN {
    FS=": "
}
{
    if($0 ~ /^---$/) {
        start = 1 - start;
    }
    if (start) {
        if($1 == "title")
            titles[FILENAME] = $2
        if($1 == "next")
            nexts[FILENAME] = $2 ".md"
        if($1 == "prev")
            prevs[FILENAME] = $2 ".md"
        if($1 == "next-text")
            next_texts[FILENAME] = $2
        if($1 == "prev-text")
            prev_texts[FILENAME] = $2
    }
}
END {
    for (f in titles) {
        nxt = nexts[f]
        if (nxt == "")
            continue
        print f, "=>", nxt
        if (f != prevs[nxt]) {
            print "ERR: Prev of", nxt, "is not", f
            exit 1
        }
        if (next_texts[f] != titles[nxt]) {
            print "ERR: Next-text of", f, "is not", "\"" titles[nxt] "\""
            exit 1
        }
        if (prev_texts[nxt] != titles[f]) {
            print "ERR: Prev-text of", nxt, "is not", "\"" titles[f] "\""
            exit 1
        }
    }
    print "All links OK"
}
