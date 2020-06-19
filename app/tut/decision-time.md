---
title: It's decision time
---

# Lets make a choice.

So far all the programs that we've written always do the same thing.
The code starts at the top and works its way to the bottom. If we want to write programs that are more interesting we need to allow our code to make decisions.

Our main tool for this is called the "[[`má`{.setanta}|if]]" statement. "Má" means "if" in English. The `má`{.setanta} statement allows us to make a [[decision|cinneadh]], It allows us [[to check|seiceáil]] if something is [[true|fíor]], and do one thing if it is, and another if it isn't.

The syntax for a `má`{.setanta} statement is as follows

```{.setanta .numberLines}
má < some check > {
    <code to execute if the check is true>
} nó {
    <code to execute if the check is false>
}
```

*The [[`nó`{.setanta}|or]] section is [[optional|roghnach]]*

## Example

Let's start with the program we wrote [[before|cheana]] to ask the user their name:

```{.setanta .numberLines}
ainm := ceist("Cad is ainm duit?")
scríobh("Dia duit", ainm)
```

We use the [[`ceist`{.setanta}|question]] action to ask the user for their name, store the result in the ainm variable, and then use the `scríobh`{.setanta} action to write it on the console.

Let's expand the program to print a special message if the name entered is "Setanta". We use the `==` operator to [[compare|cuir i gcomparáid]] two pieces of text, and we use the `má`{.setanta} statement to [[control|smachtaigh]] the decision that's made:

{{{
ainm := ceist("Cad is ainm duit?")

má ainm == "Setanta" {
    scríobh("Fáilte romhat Setanta")
} nó {
    scríobh("Dia duit", ainm)
}
}}}

We can run this code, if we enter our name as "Setanta", then the program prints "[[Fáilte romhat Setanta|Welcome Setanta]]", otherwise it prints "Dia duit" as before.

### Demo

![The `má`{.setanta} statement in action](assets/ma-demo.gif)

### Closer look

This is the code we wrote:

```{.setanta .numberLines}
ainm := ceist("Cad is ainm duit?")

má ainm == "Setanta" {
    scríobh("Fáilte romhat Setanta")
} nó {
    scríobh("Dia duit", ainm)
}
```

On line 1, [[we get|faighimid]] the name of the user as before.

On line 3 we wrote `má ainm == "Setanta"`{.setanta}. This makes a check if the `ainm` variable is [[equal|cothrom]] to `"Setanta"`{.setanta}.

On line 4 we filled in `scríobh("Fáilte romhat Setanta")`{.setanta} as the code we want to be ran if the check was true.

On line 5 we used the keyword [[`nó`{.setanta}|or]] to define what to do if the check was [[false|bréagach]].

On line 6 we filled in `scríobh("Dia duit", ainm)`{.setanta} as the code to run if the check was false.

## Challenge

To test your [[understanding|tuiscint]], try and change the following program so that it writes "[[Chocolate is the best|Is é seacláid an ceann is fearr]]" if the user says "[[Chocolate|Seacláid]]" is their favourite food, but says "[[I love that food|Is aoibhinn liom an bia sin]]" if they say something else.

{{{
fav_food := ceist("What's your favourite food?")

>-- Put your logic in here

scríobh("I love that food")
}}}

**TODO**

# Comparisons

We used the `==` operator to check equality in our earlier example, but we can do much more.

*Setanta* allows us to use operators to [[compare|cuir i gcomparáid]] numbers and text in a number of ways.

 Operator    Meaning
----------  ---------
`==`        Check if two values are equal.
`!=`        Check if two values are **not** equal.
`>`         Check if the left value is [[greater than|níos mó ná]] the right.
`<`         Check if the left value is [[less than|níos lú ná]] the right.
`>=`        Check if the left value is greater *or equal to* the right.
`<=`        Check if the left value is less *or equal to* the right.

## Challenge

Here is some partially filled out *Setanta* code. [[Replace|Athchuir]] the "&lt;replace-me&gt;" text with the [[correct|ceart]] operator to check if `100`{.setanta} is less than
`20 * 6 - 18 * (2 * 1/2)`{.setanta}

{{{
scríobh(100 <replace-me> 20 * 6 - 18 * (2 * 1/2))
}}}

[[Click here to see the answer|scríobh(100 &lt; 20 * 6 - 18 * (2 * 1/2))]].

You should see that the code prints "fíor", which is correct.
