---
title: Game Time!
prev: useful
prev-text: Some Useful Actions
---

# Bounce Game

Let's combine all our knowledge, with some new actions to make a game! Let's make a game like *Pong*
or *Breakout*. We'll have a paddle on the bottom of the screen that we have to move back and forth
to catch a bouncing ball.

## Draw Loop

To control the graphics for our game, we'll use something called a "draw loop". A draw loop is a
simple concept. We make an action to draw our game elements on the stage, and we call it over and
over in a loop until the game is over.

After each call we should sleep for a few milliseconds to avoid too much flicker on the screen.

To start we'll make a new action called `draw_screen`, and we'll start our draw loop.

```{.setanta .numberLines}
gníomh draw_screen() {
    >-- We'll fill in our drawing logic in here later
}

>-- Loop forever
nuair-a fíor {
    >-- Call the draw_screen action
    draw_screen()

    >-- Sleep for a few milliseconds
    codladh(10)
}
```
