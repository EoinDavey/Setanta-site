function basename(file) {
    sub(".*/", "", file)
    return file
}

match($0, /^title: (.*)$/, m){
    titles[basename(FILENAME)] = m[1]
}

match($0, /^next: (.*)$/, m){
    nxt[basename(FILENAME)] = m[1] ".md"
}

END {
    print "<!-- AUTO-GENERATED FILE DO NOT EDIT -->"
    print "<!-- Generated by scripts/gen_tok.awk -->"
    print "<ul id=\"all-toc\" slot=\"all-toc\">"

    if (START == "") {
        START = "intro.md"
    }

    while(1) {
        print "<li><a href=\"" gensub(/\.md/, ".html", "g", START) "\">" titles[START] "</a></li>"
        if (nxt[START] == "")
            break
        START = nxt[START]
    }

    print "</ul>"
}
