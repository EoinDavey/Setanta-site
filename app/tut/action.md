---
title: Time for Action
prev: nuair-a
prev-text: In the Loop
---

# Less talk more action 

Throughout this tutorial we've used lots of actions to do [[everything|gach rud]] from [[reading text|ag léamh téacs]] to [[drawing shapes|ag tarraingt cruthanna]].

But, we don't always have to depend on the actions that come with *Setanta*, we can make our own!

## Quick revision

Actions are things like `scríobh`{.setanta} and `coladh`{.setanta}. Actions take [[**arguments**|argóintí]] and use them to perform some action.

You call an action by using [[brackets|lúibíní]] `( )` and placing the arguments inside the brackets.

e.g: `scríobh("Dia duit")`{.setanta}, `ciorcal@stáitse(100, 100, 100)`{.setanta}, `léigh()`{.setanta}

Some actions also have [[**results**|torthaí]] that can be used like any other [[value|luach]]

e.g: `aois := ceist("Cén aois thú")`{.setanta}

# Gníomh Statements

To make [[our own action|ár ngníomh féin]] we use the [[`gníomh`{.setanta}|action]] keyword. "gníomh", unsurprisingly translates as "action". We define the name of our action, what arguments it takes and the code to execute when we call the action. We'll see how to make your function have a [[result|toradh]] later.

The syntax for a `gníomh`{.setanta} statement is:

```{.setanta .numberLines}
gníomh <action name> ( <list of argument names> ) {
    <action code>
}
```

Here is a quick example: Let's make an action called `say_hello`, `say_hello` will take no arguments, and write "Hey" on the console.

```{.setanta .numberLines}
gníomh say_hello () {
    scríobh("Hey")
}
```

As you can see we have filled in `say_hello` as the action name, the list of arguments is [[empty|folamh]], and the action code is `scríobh("Hey")`{.setanta}.

We call this new action with `say_hello()`. Let's try it out!

{{{
gníomh say_hello () {
    scríobh("Hey")
}

say_hello()
}}}

As you can see, calling `say_hello()` caused "Hey" to be written on the console! What's going on here?

### [[Explanation|Míniú]]

When *Setanta* reads an action call like `say_hello`, [[it jumps|léimeann sé]] to where you defined the action and executes the code you wrote. So when you call `say_hello()`, it jumps to the code in the `say_hello` action, which was `scríobh("Hey")`{.setanta} and runs it, causing "Hey" to be written on the console.

# Arguments

How do we make actions that take arguments?
You do this by picking names for your arguments, and then when the action is
called the argument values are attached to variables with those names.

Let's write an action to draw a [[blue circle|ciorcál gorm]] in the middle of the screen, with
the radius given as an argument. We'll call the action `mid_circle`.

Let's start with some code to draw a circle in the middle with radius 100, and
we'll see how to change this to be an argument after.

We use `fadX@stáitse`{.setanta} and `fadY@stáitse`{.setanta} to get the
midpoints and use `ciorcal@stáitse`{.setanta} to draw the circle.

```{.setanta .numberLines}
gníomh mid_circle() {
    >-- Change to blue
    dath@stáitse("gorm")

    >-- Get midpoint
    mid_x := fadX@stáitse / 2
    mid_y := fadY@stáitse / 2

    >-- Draw the circle
    ciorcal@stáitse(mid_x, mid_y, 100)
}
```

We call this with `mid_circle()`, try it out:

{{{s
gníomh mid_circle() {
    >-- Change to blue
    dath@stáitse("gorm")

    >-- Get midpoint
    mid_x := fadX@stáitse / 2
    mid_y := fadY@stáitse / 2

    >-- Draw the circle
    ciorcal@stáitse(mid_x, mid_y, 100)
}

mid_circle()
}}}

Now we want to get rid of that fixed radius of 100, and replace it with an
argument. Let's call the argument `radius`. We place the name of the argument
between the brackets `( )` in the defining line of the action:

```{.setanta .numberLines}
gníomh mid_circle(radius) {
    mid_x := fadX@stáitse / 2
    mid_y := fadY@stáitse / 2
    ciorcal@stáitse(mid_x, mid_y, 100)
}
```

Inside the action we can now refer to the name `radius` anywhere we'd like to
use the argument. So let's replace the 100 value with `radius`.

```{.setanta .numberLines}
gníomh mid_circle(radius) {
    mid_x := fadX@stáitse / 2
    mid_y := fadY@stáitse / 2
    ciorcal@stáitse(mid_x, mid_y, radius)
}
```

Now we can call `mid_circle` with one argument and it'll draw the circle for us,
let's try calling it with `200`{.setanta} (`mid_circle(200)`{.setanta}).

{{{s
gníomh mid_circle(radius) {
    mid_x := fadX@stáitse / 2
    mid_y := fadY@stáitse / 2
    ciorcal@stáitse(mid_x, mid_y, radius)
}

mid_circle(200)
}}}

Now we can use our `mid_circle` action as many times as we want, and we don't
need to write out all that code again.

{{{s
gníomh mid_circle(radius) {
    mid_x := fadX@stáitse / 2
    mid_y := fadY@stáitse / 2
    ciorcal@stáitse(mid_x, mid_y, radius)
}

mid_circle(100)
mid_circle(200)
mid_circle(300)
}}}

## More than one argument

You can expand the list of arguments to take [[as many arguments as you like|an oiread argóintí is mian leat]] by
separating the names of the variables with commas (`,`).

e.g. `gníomh i_need_3_args(arg_1, arg_2, arg_3) {}`{.setanta}

## Challenge

Create an action called `rand_circs` that takes 3 arguments `n`, `radius` and `colour`, that draws `n` random circles with radius `radius` and colour `colour` on the stage.

{{{s
gníomh rand_circs(>-- Args here --<) {
    >-- Fill me in
}
}}}

[Click here to open a solution in the main editor](https://try-setanta.ie/editor/EhEKBlNjcmlwdBCAgIDAjsqDCg){target="_blank"}
