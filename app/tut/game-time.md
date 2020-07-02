---
title: Game Time!
prev: useful
prev-text: Some Useful Actions
---

# Bounce Game

Let's combine all our knowledge, with some new actions to make a game! Let's make a game like *Pong*
or *Breakout*. We'll have a paddle on the bottom of the stage that we have to move back and forth
to catch a bouncing ball.

# Draw Loop

To control the graphics for our game, we'll use something called a "draw loop". A draw loop is a
simple concept. We make an action to draw our game elements on the stage, and we call it over and
over in a loop until the game is over.

After each call we should sleep for a few milliseconds to avoid too much flicker on the screen.

To start we'll make a new action called `draw_stage`, and we'll start our draw loop.

```{.setanta .numberLines}
gníomh draw_stage() {
    >-- We'll fill in our drawing logic in here later
}

>-- Loop forever
nuair-a fíor {
    >-- Call the draw_stage action
    draw_stage()

    >-- Sleep for a few milliseconds
    codladh(10)
}
```

# The Paddle

Let's get started with our paddle. We want a paddle that we can move around on the bottom of the
stage. We'll set up some variables and then use some stage actions in the `draw_stage` action to
draw the paddle.

Let's make variables called `paddle_height` and `paddle_width`. For the height we can use something
like 20, as a small but visible value. For the paddle width we can divide the stage width so the
paddle is always 20% of the stage wide. We can use our integer division operator (`//`) to make sure
we round down to a whole number.

Let's add the following code to the top of the program.

```{.setanta .numberLines}
paddle_height := 20
paddle_width := fadX@stáitse // 5
```

Now we can make 2 more variables, `paddle_x` and `paddle_y`, these are the x and y coordinatesoof
the paddle. Specifically the top right corner. We want to start with the paddle in the bottom left
of the stage, so let's set `paddle_x` to be `0`{.setanta}. To get the paddle on the bottom you
might be tempted to set `paddle_y` to be `fadY@stáitse` (the height of the stage), but this won't
work, we need to subtract the paddle height to account for how thick the paddle is.

Now our variables at the top of the program look like this:

```{.setanta .numberLines}
paddle_height := 20
paddle_width := fadX@stáitse // 5

paddle_x := 0
paddle_y := fadY@stáitse - paddle_height
```

## Draw the Paddle

Now that we know where our paddle is, and how big it is, let's add the logic on how to draw it to
the `draw_stage` action.

Before we draw our paddle, we should clear the stage of any old things we drew before. We use the
`glan@stáitse`{.setanta} action to do this. "Glan" translates as "clean" or "clear", and it clears the stage.

After we clear the stage we can change the colour, I'd like to draw a red paddle, so I'll type
`dath@stáitse("dearg")`{.setanta} to change the colour to "dearg" (red).

Now we can draw our paddle! We can use the `dronLán@stáitse` action (short for "dronuilleog lán" meaning "full rectangle") to draw a
rectangle. We need to give it 4 arguments, the x coordinate, the y coordinate, the width and the
height.

Now our `draw_stage` action looks like this:

```{.setanta .numberLines}
gníomh draw_stage() {
    >-- Clear the stage
    glan@stáitse()

    dath@stáitse("dearg") >-- Red pen

    dronLán@stáitse(paddle_x, paddle_y, paddle_width, paddle_height)
}
```

Let's try out our program now:

{{{s
paddle_height := 20
paddle_width := fadX@stáitse // 5

paddle_x := 0
paddle_y := fadY@stáitse - paddle_height

gníomh draw_stage() {
    >-- Clear the stage
    glan@stáitse()

    dath@stáitse("dearg") >-- Red pen

    dronLán@stáitse(paddle_x, paddle_y, paddle_width, paddle_height)
}

>-- Loop forever
nuair-a fíor {
    >-- Call the draw_stage action
    draw_stage()

    >-- Sleep for a few milliseconds
    codladh(10)
}
}}}

**Don't forget to press <iron-icon class="play" icon="av:stop"></iron-icon> to stop the program
otherwise it will go forever!**

You should see a small red paddle being drawn at the bottom of the stage.

## Move the Paddle

Now that we can draw the paddle, how do we move it? We can use the "méarchlár" (meaning "keyboard")
action to get keyboard presses from the user!

First let's make a new action called `key_control`. This is the action that will be called when the
user presses a key. It takes one argument, the key that was pressed.

```{.setanta .numberLines}
gníomh key_control(key) {
}
```

Let's fill in `scríobh(key)` for now.

```{.setanta .numberLines}
gníomh key_control(key) {
    scríobh(key)
}
```

Now we can tell *Setanta* to use this action with the keyboard by passing it to the
`méarchlár`{.setanta} action by calling `méarchlár(key_control)`{.setanta}. Let's add that to our
program.

{{{s
paddle_height := 20
paddle_width := fadX@stáitse // 5

paddle_x := 0
paddle_y := fadY@stáitse - paddle_height

gníomh draw_stage() {
    >-- Clear the stage
    glan@stáitse()

    dath@stáitse("dearg") >-- Red pen

    dronLán@stáitse(paddle_x, paddle_y, paddle_width, paddle_height)
}

gníomh key_control(key) {
    scríobh(key)
}

méarchlár(key_control)

>-- Loop forever
nuair-a fíor {
    >-- Call the draw_stage action
    draw_stage()

    >-- Sleep for a few milliseconds
    codladh(10)
}
}}}
