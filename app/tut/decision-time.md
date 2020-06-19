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

**Remember that *Setanta* doesn't require you to type the fadas, so you can type `ma`{.setanta} or `no`{.setanta} if you need to**

{{{
fav_food := ceist("What's your favourite food?")

>-- Put your logic in here

scríobh("I love that food")
}}}

[[Click here to see the answer |má fav_food == &quot;Chocolate&quot; { scríobh(&quot;Chocolate is the best&quot;) } nó { scríobh(&quot;I love that food&quot;) }]]

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

# Chaining

You can combine `má`{.setanta} and `nó`{.setanta} into one statement to chain together `má`{.setanta} statements. This allows you to check different conditions one after the other, with the first successful check being executed.

For example; Here is some code that asks the user for their [[age|aois]], and tells them if they are an [[adult|duine fásta]], a [[teenager|déagóir]] or a [[child|páiste]]. 

{{{
aois := go_uimh(ceist("Cén aois thú?"))

má aois > 18 {
    scríobh("Is duine fásta thú")
} nó má aois >= 13 {
    scríobh("Is déagóir thú")
} nó {
    scríobh("Is páiste thú")
}
}}}

Try it out with some different ages, try an adult age, a teenager age and a child's age!

## Explained

There are a few things to notice about that program. First thing we should explain is the first line. We used the `go_uimh` action, which we haven't seen before.

`go_uimh` is shorthand for "[[go uimhir|to number]]" which means "to number". This action takes text and converts it to a number. In our case, the `ceist` action returns the text the user typed. We need to turn it into a number so that we can compare it with 18 and 13 to decide if they are an adult, a teenager or a child. In our case, the `ceist` action returns the text the user typed. We need to turn it into a number so that we can compare it with 18 and 13 to decide if they are an adult, a teenager or a child.

After the user has given us their age, it gets stored in the `aois` variable, and the computer moves on to the `má`{.setanta} statement.

1. First it checks if `aois` is greater than 18. If it is, it will write [[`"Is duine fásta thú"`{.setanta}|You're an adult]] and then skip to the end of the statement.
2. If the first check failed, the computer will try the next check, which is checking if `aois` is greater than *or equal to* 13. If that's true then it will write [[`"Is déagóir thú"`{.setanta}|You're a teenager]] and skip to the end of the statement.
3. Finally if both of those checks failed, then the user must be younger than 13, so it prints [[`"Is páiste thú"`{.setanta}|You're a child]].
