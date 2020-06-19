BEGIN {
    ORS=""
}
{
    if ($0 ~ /^{{{/) {
        block = 2;
        if ($0 ~ /^{{{s$/) {
            print "<div class=\"centerer\"><div class=\"editor-wrapper\"><mini-editor stageopen initial=\"";
        } else {
            print "<div class=\"centerer\"><div class=\"editor-wrapper\"><mini-editor initial=\"";
        }
    } else if ($0 ~ /^}}}$/) {
        block = 0;
        print "\"></mini-editor></div></div>\n";
    } else if(block != 0) {
        $0 = escapeHTML($0);
        if (block == 1)
            print "\n";
        print;
        block = 1;
    } else {
        a = gensub(/\[\[([^|]*)\|([^|]*)\]\]/, "<tut-tooltip alt=\"\\2\">\\1</tut-tooltip>", "g", $0)
        print a "\n";
    }
}
function escapeHTML(t) {
    gsub(/&/,  "\\&amp;", t);
    gsub(/</,  "\\&lt;", t);
    gsub(/>/,  "\\&gt;", t);
    gsub(/"/, "\\&quot;", t);
    return t;
}
