---
title: Stop when I say so
---

# Nuair-a loops

In the previous section we learned about *le idir* loops. They were very [[useful|úsáideach]] for repeating pieces of code, but we needed to know how many times we wanted to loop before it started. What if we don't know how many times we need to loop? Or what if we want to loop [[forever|go deo]]? This is where "nuair-a" loops come in.

"nuair a" translates roughly as "when" or "while". We use the `nuair-a`{.setanta} keyword to denote a new type of loop.

"le idir" loops were defined by providing a start and a stop value, `nuair-a`{.setanta} loops are instead defined by providing a [[condition|conníoll]] that can be checked every time the loop loops.

The syntax for a `nuair-a`{.setanta} loop is:

```{.setanta .numberLines}
nuair-a < condition > {
    <code to be repeated>
}
```

The way a *nuair-a* loop works is:

1. When *Setanta* reaches a `nuair-a`{.setanta} loop, it first checks if the condition is [[true|fíor]], like how a `má`{.setanta} statement would. If the condition is [[false|bréagach]] it exits the loop and continues on afterwards. If the condition is true, then it moves to step 2.
2. Step 2 is execute the code between the curly braces `{ }`.
3. After executing the code, the *Setanta* interpreter [[returns|filleann]] to step 1.

Here's a quick [[example|sampla]]:

## Example

{{{
>-- Make variable called "x" with value 0
x := 0

>-- Make a nuair-a loop, the condition is "x < 3"
nuair-a x < 3 {
    >-- Write x
    scríobh(x)
    >-- Increase x by 1
    x += 1
}
}}}

Running that code we can see that it writes "0", then "1", then "2". Why?

- The first line [[creates|cruthaíonn]] a new [[variable|athróg]] `x` and starts it with value 0.
- Next we create a new `nuair-a`{.setanta} loop with the condition `x < 3`{.setanta}.
- *Setanta* checks this condition, is `x` less than 3? Well `x` is currently 0, so yes.
- The check was successful so *Setanta* executes the code inside the braces. It first writes `x` (currently 0), then increases `x` by 1. (*Using the short-hand "`x += 1`{.setanta}" for "`x = x + 1`{.setanta}"*).
- Now `x` is equal to 1.
- *Setanta* now returns to the condition, is `x` still less than 3? Yes. So we once again execute the code inside the braces. Causing "1" to be written on the console and `x` to be increased to 2.
- This happens once again now that `x` is equal to 2. This is still less than 3 so we write "2" and increase `x` to 3.
- This time when *Setanta* checks the condition `x < 3`{.setanta} it finds that it's false, as now `x` is 3. This means we are finished with the loop and the program is over.

## Looping forever!

What if we want to run a loop forever? For example a program that prints "Hello", waits 2 seconds, prints "Hello", waits 2 seconds, prints "Hello" [[etc|srl.]] etc. We can do this by specifying some condition that will never be false.

We could write something that's always true like `1 == 1`{.setanta} or `10 + 20 == 30`{.setanta}, but the easiest thing to do is just use the boolean `fíor`{.setanta}, which just means "true". It's the most true thing we can have!

This means we can write a loop that never ends by writing:

```{.setanta .numberLines}
nuair-a fíor {
}
```

Let's try out our program to print "Hello" and sleep for 2 seconds.

Before we start, I should point out that when *Setanta* code is [[running|ag rith]] in the [[editor|eagarthóir]] the <iron-icon class="play" icon="av:play-arrow"></iron-icon> button becomes a <iron-icon class="play" icon="av:stop"></iron-icon> button. Clicking <iron-icon class="play" icon="av:stop"></iron-icon> will stop the program. We'll need this to stop our infinite loop (*We'll see another way of stopping loops soon*).

Ok, back to our program. Let's fill in `scríobh("Hello")`{.setanta} and `coladh(2000)`{.setanta} between the curly braces to have it be executed forever. Try it out!

{{{
nuair-a fíor {
    scríobh("Hello")
    coladh(2000)
}
}}}
