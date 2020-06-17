---
title: What is programming?
---
# Programming is...

Before we start [[learning|ag foghlaim]] how to write and use *Setanta*, we should ask:

> [[What is programming|Cad é ríomhchlarú]]?

[[Computers|Ríomhairí]] today are very [[smart|cliste]], they can do calculations no human could ever do in their head, and in the blink of an eye. However, computers need a lot of [[help|cabhair]], and programming is how we help them.

When we write programs, we write down [[instructions|treoracha]] for the computer to follow.

### What's a programming language?

A [[programming language|teanga ríomhchlárúcháin]] is a language that the computer can understand, and we use it to write our instructions.

Modern programming languages are also designed so that people can understand them too. *Setanta* is one of those languages, but it's a little bit different.

Almost every programming language is designed to be close to English, but *Setanta* is different. When we write *Setanta* code, it's almost like we are writing the instructions in Irish.

# Simple instructions.

To introduce programming and *Setanta*, let's look at some simple instructions.

## Scríobh

"[[Scríobh|Write]]" is the Irish word for "write". *Setanta* has an [[action|gníomh]] called `scríobh`{.setanta} that we can use to write [[text|téacs]] onto the console. We use the `scríobh`{.setanta} action like this:

```setanta
scríobh("Your text in here")
```

You can put any [[text|téacs]] you like in between the double quotes (") and `scríobh`{.setanta} will write it out on the console. Try it out here!

{{{
scríobh("Put your text here")
}}}

Change the text "Put your text here" to something else and run the code. See if you can make it print your name! Here's a quick GIF of something you could change it to.

![Changing scríobh text](assets/change-scriobh-text.gif)

## Calculations

We've seen that *Setanta* can write text, but we can do much more than that. [[For example|Mar shampla]], *Setanta* can do [[calculations|áirimh]] for you! Run this code and see how *Setanta* does all the [[maths|matamaitic]] for you.

{{{
scríobh("Answer:", 28 + 36 * 2)
}}}

You can change the [[values|luachanna]] of the [[numbers|uimhreacha]] or add in more. Try replacing "`28 + 36 * 2`{.setanta}" with a different maths expression. You can use all the [[symbols|siombailí]] that you already know, for example:

> "`+`" for addition, "`-`" for subtraction, "`*`" for multiplication and "`/`" for division.

You can also use [[brackets|lúibíní]] to build up [[complicated|casta]] expressions, Try printing these with `scríobh`{.setanta} in the editor above:

```setanta
1 + 2 * (3 - 4) / 5
1 + 2 - (3 + (4 - 5))
```

You can also use numbers with decimal points, such as `1.2`{.setanta} or `123.4`{.setanta}

## Comparisons

We saw that you can use symbols such as `+, -, *` and `\` in *Setanta* to do maths. *Setanta* also allows us to [[compare|cuir i gcomparáid]] numbers. Try running this code:

{{{
scríobh(100 == 50 * 2)
}}}

As you can see, the code writes "[[fíor|true]]", which translates as "true".
This makes sense because we know that 100 is equal to 50 times 2.

Notice that we used two equals signs (`==`) instead of one (`=`), we'll see why we did that later. For now, we just use `==` when we want to check if things are [[equal|cothrom]].

We also have access to a suite of other ways of doing comparisons:

 Operator    Meaning
----------  ---------
`==`        Check if two values are equal.
`!=`        Check if two values are **not** equal.
`>`         Check if the left value is [[greater than|níos mó ná]] the right.
`<`         Check if the left value is [[less than|níos lú ná]] the right.
`>=`        Check if the left value is greater *or equal to* the right.
`<=`        Check if the left value is less *or equal to* the right.

### Test your knowledge

Here is some partially filled out *Setanta* code. [[Replace|Athchuir]] the "&lt;replace-me&gt;" text with the [[correct|ceart]] operator to check if `100`{.setanta} is less than
`20 * 6 - 18 * (2 * 1/2)`{.setanta}

{{{
scríobh(100 <replace-me> 20 * 6 - 18 * (2 * 1/2))
}}}

If you get stuck, click [[this text to see the answer|the answer is scríobh(100 < 20 * 6 - 18 * (2 * 1/2))]].

You should see that the code prints "fíor", which is correct.

# Combining Instructions

When the computer is following the instructions in our *Setanta* program. It starts at the top and works its way down the list. This means if we want to do one instruction after the other, all we have to do is put it on the next line. Check out this code:

{{{
scríobh("Before sleeping")
codladh(2000)
scríobh("After sleeping")
}}}

If you run this code, it will first print "Before sleeping", then it will pause for 2 seconds and print "After sleeping". This is because we used the [[`codladh`{.setanta}|sleep]] action.  "Codladh" translates into English as "sleep".

The `codladh`{.setanta} action takes a number of milliseconds (in this case 2000), and when the computer reaches the `codladh`{.setanta} instruction, it will wait for that many milliseconds before proceeding.

The steps the computer takes are:

1. Read the first line "`scríobh("Before sleeping")`{.setanta}" and write "Before sleeping" on the console as instructed.
2. Read the second line "`codladh(2000)"`{.setanta} and sleep for 2000 milliseconds (2 seconds).
3. Read the third line "`scríobh("After sleeping")`{.setanta}" and write "After sleeping" on the console.
4. Finished.
