---
title: Tutorial Introduction
next: what-is-programming
next-text: What is programming?
---

# Welcome!

**_Welcome to the *Setanta* tutorial!_**

[[We hope|Tá súil againn]] you're ready to learn all about [[programming|ríomhchlárúchán]], [[Irish|Gaeilge]] and how they go [[hand in hand|lámh i lámh]].

There's just a few things to cover before you're [[ready|réidh]] to start!

## Translations

If you see a word with an underline like [[this|you found me]], it's a word with a
[[translation|aistriúchán]].
Hover over or click on the word to see it's translation. [[Try it out!|Bain triail as!]].

## Setanta Editors

Throughout this [[tutorial|teagasc]] you will find *Setanta* [[editors|eagarthóirí]] like this.

{{{
>-- This is a Setanta editor.
scríobh("Dia duit!")
}}}

Editors are where we can write *Setanta* programs. We type a [[program|ríomhchlár]] into the [[box|bosca]] [[on the left|ar chlé]], and we press <iron-icon class="play" icon="av:play-arrow"></iron-icon> to start it.
The [[results|torthaí]] of the program will be shown [[on the right|ar dheis]].

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

Click on the <iron-icon class="clear" icon="icons:clear"></iron-icon> button to clear the console.

### Demo 

![Entering your name](assets/intro-name.gif)

## The Stage

Each [[editor|eagarthóir]] has 2 tabs you can switch between. One that shows the console, and another that shows the [[stage|stáitse]].

The stage is where we can use *Setanta* programs to draw [[pictures|pictiúir]] or animations, and even to make [[games!|cluichí]]

Run the following program, then click on the "Stáitse/Stage" tab to view the stage.

{{{
dath@stáitse("dearg")
ciorcal@stáitse(200, 200, 100)
}}}

You should see a [[red circle|ciorcal dearg]].

![Red Circle](assets/circle-red.gif)

# try-setanta.ie/editor

The editors that we'll use in the tutorial are small versions of the try-setanta.ie main editor. If you'd like to try out your code on a bigger screen, or save your code and share it with others, you should visit [try-setanta.ie/editor](https://try-setanta.ie/editor).

# Let's get started!

Now that you've seen how to use the editors and translations, it's time to get started learning Setanta. You can move onto the next section by clicking the "Next Page" link in the contents panel, or by clicking the "Next Page" button at the bottom of the page.
