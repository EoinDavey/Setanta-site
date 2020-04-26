export function defineMode(CodeMirror) {
    CodeMirror.defineSimpleMode("setanta", {
      // The start state contains the rules that are intially used
      start: [
        // The regex matches the token, the token property contains the type
        // You can match multiple tokens at once. Note that the captured
        // groups must span the whole string in this case
        // Rules are matched in the order in which they appear, so there is
        // no ambiguity between this one and the one above
        {regex: />--((?!--<).)*(--<|$)/, token: "comment"},
        {regex: /'([^\'\\]|(\\.))*'/, token: "string"},
        {regex: /"([^\"\\]|(\\.))*"/, token: "string"},
        {regex: /(creatlach)(\s+)([a-zA-ZáéíóúÁÉÍÓÚ_]+)/,
            token: ["def", null, "variable-2"]},
        {regex: /(gn[ií]omh)(\s+)([a-zA-ZáéíóúÁÉÍÓÚ_]+)(\()(.*)(\))/,
            token: ["def", null, "variable-2", null, "variable-3", null]},
        {regex: /(?:seo|tuis|le|bris|idir|chun-cinn|toradh|nuair-a|gn[ií]omh)\b/,
         token: "keyword"},
        {regex: /(?:scr[ií]obh|fad|thar|cuid|mata|coladh|st[aá]itse)\b/, token: "builtin"},
        {regex: /(?:m[áa]|n[oó])(?![a-záéíóú_])/, token: "keyword"},
        {regex: /(?:f[ií]or|br[eé]ag|neamhn[ií])(?![a-záéóíú_])/, token: "atom"},
        {regex: /-?[0-9]+(?:\.[0-9]+)?/i,
         token: "number"},
        {regex: /[-+\/*=<>!]+/, token: "operator"},
        {regex: /[a-zA-ZáéíóúÁÉÍÓÚ][0-9a-zA-ZáéíóúÁÉÍÓÚ$]*/, token: "variable"},
        {regex: /[\{\[\(]/, indent: true},
        {regex: /[\}\]\)]/, dedent: true},
        //{regex: /\/(?:[^\\]|\\.)*?\//, token: "variable-3"},
        //// A next property will cause the mode to move to a different state
        //{regex: /\/\*/, token: "comment", next: "comment"},
        //// You can embed other modes with the mode property. This rule
        //// causes all code between << and >> to be highlighted with the XML
        //// mode.
        //{regex: /<</, token: "meta", mode: {spec: "xml", end: />>/}}
      ],
      //// The multi-line comment state.
      //comment: [
      //  {regex: /.*?\*\//, token: "comment", next: "start"},
      //  {regex: /.*/, token: "comment"}
      //],
      //// The meta property contains global information about the mode. It
      //// can contain properties like lineComment, which are supported by
      //// all modes, and also directives like dontIndentStates, which are
      //// specific to simple modes.
      //meta: {
      //  dontIndentStates: ["comment"],
      //  lineComment: "//"
      //}
    });
}
