---
title: Comparisons placeholder
---

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
