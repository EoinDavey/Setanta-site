---
title: In the Loop
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

# Nesting

Loops can contain any code you like, including other loops! These are known as [[*nested loops*|lúba neadaithe]].

Each time the [[outer|amuigh]] loop does one loop, the inner loop will run until it's finished. This can be used to get some complicated behaviour.

## Example

Let's look at the [[simplest|is simplí]] example of nested loops, one loop inside the other:

{{{
le i idir (0, 3) {
    le j idir (0, 3) {
        scríobh("Outer:", i, "Inner:", j)
    }
}
}}}

Both of these loops start at 0 and run up to 3. Each [[iteration|atriall]] of the [[inner|inmheánach]] loop prints out the current value of `i`, the outer loop variable, and `j`, the inner loop variable.

If you run the code you will see that the inner loop goes through each of it's values (0, 1, and 2) for each value of the outer loop.

## Colour cycle

This [[technique|teicníc]] can be used for many things. For example, say we have a list of colours, and a list of sizes, we can draw a circle of each colour, and each size by using nested loops.

Let's start with our list of colours and one *le idir* loop to loop through the colours:

```{.setanta .numberLines}
colours := ["glas", "buí", "bándearg", "gorm"]

>-- Outer loop loops through the colours
le i idir (0, fad@colours) {
    colour := colours[i]

    >-- Change colour
    dath@stáitse(colour)
}
```

Now we can add our list of sizes, let's use 3 sizes, 50, 100 and 200. We put in an inner loop that loops through the sizes.

```{.setanta .numberLines}
colours := ["glas", "buí", "bándearg", "gorm"]

sizes := [50, 100, 200]

>-- Outer loop loops through the colours
le i idir (0, fad@colours) {
    colour := colours[i]

    >-- Change colour
    dath@stáitse(colour)

    >-- Inner loop loops through the sizes
    le j idir (0, fad@sizes) {
        size := sizes[j]
    }
}
```

**We are careful here to use different names for the loop variables (`i` and `j`) so that we can refer to them at the same time**.

Now inside the inner loop we have access to a size and a colour. Let's use the `glan@stáitse`{.setanta} action the clear the stage ("[[glan|clean]]" translates as "clean"), then draw a circle of that size.

Where do we draw the circle? Let's use `fadX@stáitse`  and `fadY@stáitse` to get the [[mid-point|lárphointe]] of the stage. To find the [[middle|lár]] we should divide by 2.

```{.setanta .numberLines}
colours := ["glas", "buí", "bándearg", "gorm"]

sizes := [50, 100, 200]

>-- Outer loop loops through the colours
le i idir (0, fad@colours) {
    colour := colours[i]

    >-- Change colour
    dath@stáitse(colour)

    >-- Inner loop loops through the sizes
    le j idir (0, fad@sizes) {
        size := sizes[j]

        >-- Clear the stage
        glan@stáitse()

        >-- Draw the circle at the midpoint with radius `size`
        ciorcal@stáitse(fadX@stáitse / 2, fadY@stáitse / 2, size)
    }
}
```

The final step we should take is to wait (sleep) for a short time before moving on to the next circle. This is just to [[leave|fág]] the circles on the screen long enough for us to see them. We just add a call to `coladh`{.setanta} to the inner loop, after we draw the circle.

Let's try it out:

{{{s
colours := ["glas", "buí", "bándearg", "gorm"]

sizes := [50, 100, 200]

>-- Outer loop loops through the colours
le i idir (0, fad@colours) {
    colour := colours[i]

    >-- Change colour
    dath@stáitse(colour)

    >-- Inner loop loops through the sizes
    le j idir (0, fad@sizes) {
        size := sizes[j]

        >-- Clear the stage
        glan@stáitse()

        >-- Draw the circle at the midpoint with radius `size`
        ciorcal@stáitse(fadX@stáitse / 2, fadY@stáitse / 2, size)

        coladh(400)
    }
}
}}}

# Stop!

Let's say we want to write a program that will let the user type in a list of text until they say "stop", then we'll print the list back to them.

We can use the [[`léigh`|read]] action (meaning "read") to read user input. Let's start out with a `nuair-a fíor`{.setanta} loop. We'll see how to exit the loop later.

```{.setanta .numberLines}
>-- Create an empty list
list := []

>-- Loop forever
nuair-a fíor {
    >-- Read from the console with léigh
    text := léigh()

    >-- Add `text` to the end of the list
    list += [text]
}
```

This program will forever keep asking the user for input, then add that input into the `list`.

We'd like to exit the loop when the user says "Stop", how do we do that?

## DIY

One way we can do it is by using a condition in our `nuair-a`{.setanta} loop. We'll make a new variable called `keep_going`, that starts out equal to `fíor` ("true"). We'll use this variable as the condition.

```{.setanta .numberLines}
>-- Create an empty list
list := []

keep_going := fíor

nuair-a keep_going {
    >-- Read from the console with léigh
    text := léigh()

    >-- Add `text` to the end of the list
    list += [text]
}
```

This program will keep looping while `keep_going` is `fíor`{.setanta}. Therefore we can stop the loop by changing the value of `keep_going` when the user inputs "Stop".

Let's use a `má`{.setanta} statement to check if they've said "Stop".

```{.setanta .numberLines}
>-- Create an empty list
list := []

keep_going := fíor

nuair-a keep_going {
    >-- Read from the console with léigh
    text := léigh()

    má text == "Stop" {
        >-- They said "Stop"
    } nó {
        >-- They didn't say "Stop".

        >-- Add `text` to the end of the list
        list += [text]
    }
}
```

Now we can tell *Setanta* to change `keep_going` to `bréag`{.setanta} ("false") when they say "Stop" by adding `keep_going = bréag`{.setanta} inside the `má`{.setanta} statement.

```{.setanta .numberLines}
>-- Create an empty list
list := []

keep_going := fíor

nuair-a keep_going {
    >-- Read from the console with léigh
    text := léigh()

    má text == "Stop" {
        >-- They said "Stop"
        keep_going = bréag
    } nó {
        >-- They didn't say "Stop".

        >-- Add `text` to the end of the list
        list += [text]
    }
}
```

Now let's add a line to write the list after the loop is finished, (`scríobh(list)`{.setanta}).

You can try out the program and see that it works: Run the program and enter a few words into the console, then enter "Stop" and you'll see that the program stops and prints the list.

{{{
>-- Create an empty list
list := []

keep_going := fíor

nuair-a keep_going {
    >-- Read from the console with léigh
    text := léigh()

    má text == "Stop" {
        >-- They said "Stop"
        keep_going = bréag
    } nó {
        >-- They didn't say "Stop".

        >-- Add `text` to the end of the list
        list += [text]
    }
}
scríobh(list)
}}}

Here's a GIF of it in action:

![It works!](assets/bris-diy-demo.gif)

## A Better Way

That code worked, but it was very messy! Surely there's an easier way. Lucky for us, there is. Setanta includes a special keyword called "[[`bris`{.setanta}|break]]". "Bris" translates as "Break", and it allows us to **break** out of a loop.

When *Setanta* reads the `bris`{.setanta} keyword inside a loop it stops what it's doing, and leaves the loop immediately.

Try it out here:

{{{
>-- Loop from 0 to 10
le i idir (0, 10) {
    má i == 5 {
        bris
    }
    scríobh(i)
}
}}}

Running this code we see that it writes "0", "1", "2", "3" and "4". Why does it stop at 4? The outer loop goes from 0 to 10. The secret lies in the `má`{.setanta} statement on line 3. It checks if `i` is equal to 5, and if it is it executes the `bris`{.setanta} statement, causing the computer to immediately stop what it's doing and leave the loop.

### Challenge

Move the `scríobh(i)`{.setanta} line so that it also prints "5".

[[Click here to see the answer|Move the scríobh(i) line above the má statement]]

### Let's fix our old code

This was the code we wrote earlier:

```{.setanta .numberLines}
>-- Create an empty list
list := []

keep_going := fíor

nuair-a keep_going {
    >-- Read from the console with léigh
    text := léigh()

    má text == "Stop" {
        >-- They said "Stop"
        keep_going = bréag
    } nó {
        >-- They didn't say "Stop".

        >-- Add `text` to the end of the list
        list += [text]
    }
}
scríobh(list)
```

Now we can get rid of all that messy logic with `keep_going` and replace it all with a single `bris`{.setanta} statement! Check it out:

{{{
>-- Create an empty list
list := []

nuair-a fíor {
    >-- Read from the console with léigh
    text := léigh()

    má text == "Stop" {
        >-- If they said Stop, leave the loop
        bris
    }

    >-- Add `text` to the end of the list
    list += [text]
}
scríobh(list)
}}}

This code is much simpler and works exactly the same as before!

# Keep Going!

In contrast to the `bris`{.setanta} statement, *Setanta* has another keyword called `chun-cinn`{.setanta}. "chun cinn" translates roughly as "forward". Unlike `bris`{.setanta} which exits the loop completely, `chun-cinn`{.setanta} leaves the current iteration of the loop, and moves on to the next.

Check out this code:

{{{s
colours := ["buí", "gorm", "dubh", "dearg", "bandearg", "glas"]

le i idir (0, fad@colours) {
    colour := colours[i]

    >-- Switch colour
    dath@stáitse(colour)

    >-- Get random coordinates
    x := randUimh@mata(0, fadX@stáitse)
    y := randUimh@mata(0, fadY@stáitse)

    >-- Draw circle
    ciorcal@stáitse(x, y, 100)
}
}}}

That program has a list of colours, and for each colour it draws a circle randomly on the stage of that colour.

What if we want to skip the colours who's name begins with a "g"? We could wrap the whole inside of the loop in a big `má`{.setanta} statement, but that would be a bit messy.

We can instead use the `chun-cinn`{.setanta} statement to skip to the next colour if the current colour begins with a "g".

We can access elements of strings using their index just like we did with lists, by using square brackets (`[ ]`). To check if the name of the colour starts with "g" we just check if `colour[0] == "g"`{.setanta}, because 0 is the index of the first letter.

Lets add the following check to the start of our loop:

```{.setanta .numberLines}
má colour[0] == "g" {
    chun-cinn
}
```

That will cause *Setanta* to stop and move on to the next iteration if the colour starts with "g". Try it out:

{{{s
colours := ["buí", "gorm", "dubh", "dearg", "bandearg", "glas"]

le i idir (0, fad@colours) {
    colour := colours[i]

    má colour[0] == "g" {
        chun-cinn
    }

    >-- Switch colour
    dath@stáitse(colour)

    >-- Get random coordinates
    x := randUimh@mata(0, fadX@stáitse)
    y := randUimh@mata(0, fadY@stáitse)

    >-- Draw circle
    ciorcal@stáitse(x, y, 100)
}
}}}

As you can see by running the code, all the "g" colours ("glas", "gorm") are gone!
