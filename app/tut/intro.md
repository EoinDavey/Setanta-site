---
title: Setanta Tutorial Introduction
---

# Following this tutorial

## Translations

If you see a word with an underline like [[this|you found me]], it's a word with a translation.
Hover over or click on the word to see it's translation. [[Try it out!|Bain triail as!]].

## Setanta Editors

Throughout this [[tutorial|teagasc]] you will find *Setanta* [[editors|eagarthóirí]] like this.

{{{
>-- This is a Setanta editor.
scríobh("Dia duit!")
}}}

Editors are where we can write *Setanta* programs. We type a [[program|ríomhchlár]] into the box on the left, and we press <iron-icon class="play" icon="av:play-arrow"></iron-icon> to start it.
The results of the program will be shown on the right.

Press the <iron-icon class="play" icon="av:play-arrow"></iron-icon> [[button|cnaipe]] to run the [[code|cód]].
You should see [["Dia duit!"|&quot;Hello!&quot;]] on the right hand side.

## The Console

On the right hand side of the editor you should see

> Dia Duit!

This is the [[console|consól]]. The console is where we can [[read|léigh]] and [[write|scríobh]] messages. In the previous program we used the `scríobh` action to write "Dia Duit!" to the console.

We can also use the console to send messages to the program. Try running this next program. It should print [["Cad is ainm duit?"|&quot;What's your name?&quot;]] on the console. Type your [[name|ainm]] into the text box and press enter.

{{{
ainm := ceist("Cad is ainm duit?")
scríobh("Dia duit", ainm)
}}}

## The Stage

Each [[editor|eagarthóir]] has 2 tabs you can switch between. One that shows the console, and another that shows the [[stage|stáitse]].

The stage is where we can use *Setanta* programs to draw [[pictures|pictiúir]] or animations, and even to make [[games!|cluichí]]

Run the following program, then click on the "Stáitse/Stage" tab to view the stage.

{{{
dath@stáitse("dearg")
ciorcal@stáitse(200, 200, 100)
}}}

You should see a [[red circle|ciorcal dearg]].

# Test snippet

```{.setanta .numberLines}
má creatlach 0.3 scríobh
"string"
'string two'
>-- hey
>-- ho --< ended
```
