---
title: Game Time!
prev: useful
prev-text: Some Useful Actions
---

# Bounce Game

Let's combine all our [[knowledge|eolas]], with some new [[actions|gníomhartha]] to make a [[game|cluiche]]! Let's make a game [[like|cosúil le]] *Pong*
or *Breakout*. We'll have a [[paddle|slacán]] on the [[bottom|bun]] of the [[stage|stáitse]] that we have to move back and forth
to catch a [[bouncing ball|liathróid ag preabadh]].

# Draw Loop

To [[control|smachtaigh]] the [[graphics|grafaicí]] for our game, we'll use something called a "draw loop". A [[draw|tarraing]] loop is a
[[simple|simpli]] [[concept|coincheap]]. We make an [[action|gníomh]] to draw our game elements on the stage, and we call it over and
over in a loop until the game is over.

After each call we should [[sleep|codladh]] for a few milliseconds to avoid too much flicker on the [[screen|scáileán]].

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

Let's get started with our paddle. We want a paddle that we can [[move around|bog timpeall]] on the bottom of the
stage. We'll set up some [[variables|athróga]] and then use some stage actions in the `draw_stage` action to
draw the paddle.

Let's make variables called `paddle_height` and `paddle_width`. For the [[height|airde]] we can use something
like 20, as a small but [[visible|infheicthe]] [[value|luach]]. For the paddle [[width|leithead]] we can [[divide|roinn]] the stage width so the
paddle is always 20% of the stage wide. We can use our integer division operator (`//`) to make sure
we round down to a [[whole number|slánuimhir]].

Let's add the following code to the [[top|barr]] of the [[program|ríomhchlár]].

```{.setanta .numberLines}
paddle_height := 20
paddle_width := fadX@stáitse // 5
```

Now we can make 2 more variables, `paddle_x` and `paddle_y`, these are the x and y
[[coordinates|comhordnáidí]] of
the paddle. [[Specifically|Go sonrach]] the [[top right corner|cúinne ag an mbarr ar dheis]]. We want to start with the paddle in the bottom [[left|ar chlé]]
of the stage, so let's set `paddle_x` to be `0`{.setanta}. To get the paddle on the bottom you
might be tempted to set `paddle_y` to be `fadY@stáitse` (the height of the stage), but this won't
work, we need to subtract the paddle height to account for [[how tall|cé chomh hard]] the paddle is.

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

Before we draw our paddle, we should [[clear|glan]] the stage of any [[old|sean]] things we drew [[before|roimhe seo]]. We use the
`glan@stáitse`{.setanta} action to do this. "Glan" translates as "clean" or "clear", and it clears the stage.

After we clear the stage we can [[change|athraigh]] the [[colour|dath]], I'd like to draw a [[red|dearg]] paddle, so I'll type
`dath@stáitse("dearg")`{.setanta} to change the colour to "dearg" (red).

Now we can draw our paddle! We can use the `dronLán@stáitse` action (short for "dronuilleog lán" meaning "[[full rectangle|dronuilleog lán]]") to draw a
rectangle. We need to give it 4 [[arguments|argóintí]], the x [[coordinate|comhordanáid]], the y coordinate, the width and the
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

**[[Don't forget|Ná dean dearmad]] to [[press|brúigh ar]] <iron-icon class="play" icon="av:stop"></iron-icon> to stop the program
otherwise it will go [[forever|go deo]]!**

You should see a [[small|beag]] red paddle being drawn at the bottom of the stage.

## Move the Paddle

Now that we can draw the paddle, how do we move it? We can use the "méarchlár" (meaning "[[keyboard|méarchlár]]")
action to get keyboard presses from the user!

First let's make a new action called `key_control`. This is the action that will be called when the
user presses a [[key|eochair]]. It takes one argument, the key that was pressed.

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

*Run this program, press the [[arrow|saighead]] keys on your keyboard and then check the
[[console|consól]]*.

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

You should see that "ArrowRight", "ArrowLeft", "ArrowDown" or "ArrowUp" have been printed in your
console. We can change the code in the `key_control` action to behave differently depending on what
key was pressed.

Let's add a [[new|nua]] variable called `paddle_speed` to control the [[speed|luas]] of the paddle (how far to move the paddle when the user
presses an arrow key). I'll start with a value of 50 as I think it works well.

Then we can change the code in the `key_control` action to change the `paddle_x` variable to move
the paddle left and right depending on the key that was pressed:

```{.setanta .numberLines}
gníomh key_control(key) {
    má key == "ArrowLeft" {
        paddle_x -= paddle_speed
    } nó má key == "ArrowRight" {
        paddle_x += paddle_speed
    }
}
```

As you can see if the left arrow is pressed we [[decrease|laghdaigh]] the x coordinate, and if the right arrow is
pressed we [[increase|méadaigh]] the x coordinate.

Try out the code now: The paddle should move when you press the arrow keys!

{{{s
paddle_height := 20
paddle_width := fadX@stáitse // 5

paddle_x := 0
paddle_y := fadY@stáitse - paddle_height

paddle_speed := 50

gníomh draw_stage() {
    >-- Clear the stage
    glan@stáitse()

    dath@stáitse("dearg") >-- Red pen

    dronLán@stáitse(paddle_x, paddle_y, paddle_width, paddle_height)
}

gníomh key_control(key) {
    má key == "ArrowLeft" {
        paddle_x -= paddle_speed
    } nó má key == "ArrowRight" {
        paddle_x += paddle_speed
    }
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

# The Ball

Next let's add a [[ball|liathróid]] to [[bounce|preab]] around the stage. Just like with the paddle we'll add 2 new
variables for the x and y coordinates of the ball, `ball_x` and `ball_y`, let's start the ball in
the top left corner (0, 0).

Let's add another variable for the [[radius|ga]] of the ball, `ball_rad`, and start it with a value of 30.

[[Finally|Faoi dheireadh]] then we need two more variables to control the [[direction|treo]] the ball is [[moving|ag dul]] in. We call
these `ball_dx` and `ball_dy`. `ball_dx` is the change of the ball in the x direction, and `ball_dy`
is the change in the y direction. We'll start with a value of 2 for each, meaning the ball will
start off moving [[diagonally|fiarthrasna]] towards the bottom right.

```{.setanta .numberLines}
ball_x := 0
ball_y := 0

ball_rad := 40

ball_dx := 2
ball_dy := 2
```

## Draw the Ball

Let's add the [[logic|loighic]] to draw the ball to our `draw_stage` action. We'll switch the colour of the pen
to [[blue|gorm]] ("gorm"), and use the `ciorcalLán` (meaning "[[full circle|ciorcal lán]]") to draw the ball.

```{.setanta .numberLines}
gníomh draw_stage() {
    >-- Clear the stage
    glan@stáitse()

    dath@stáitse("dearg") >-- Red pen

    >-- Draw paddle
    dronLán@stáitse(paddle_x, paddle_y, paddle_width, paddle_height)

    dath@stáitse("gorm") >-- Blue pen

    >-- Draw ball
    ciorcalLán@stáitse(ball_x, ball_y, ball_rad)
}
```

## Ball Movement

We want the ball to move, let's make a new action called `update_ball` that will be called in our
draw loop. We should use this action to move the ball a [[tiny|beag bídeach]] amount (`ball_dx` and `ball_dy`
specifically).

```{.setanta .numberLines}
gníomh update_ball() {
    ball_x += ball_dx
    ball_y += ball_dy
}
```

Now we include a call to `update_ball` into our draw loop

```{.setanta .numberLines}
>-- Loop forever
nuair-a fíor {
    >-- Call the draw_stage action
    draw_stage()

    >-- Update ball
    update_ball()

    >-- Sleep for a few milliseconds
    codladh(10)
}
```
 
Let's run the code we have so far:

{{{s
paddle_height := 20
paddle_width := fadX@stáitse // 5

paddle_x := 0
paddle_y := fadY@stáitse - paddle_height

paddle_speed := 50

ball_x := 0
ball_y := 0

ball_rad := 40

ball_dx := 2
ball_dy := 2

gníomh draw_stage() {
    >-- Clear the stage
    glan@stáitse()

    dath@stáitse("dearg") >-- Red pen

    >-- Draw paddle
    dronLán@stáitse(paddle_x, paddle_y, paddle_width, paddle_height)

    dath@stáitse("gorm") >-- Blue pen

    >-- Draw ball
    ciorcalLán@stáitse(ball_x, ball_y, ball_rad)
}

gníomh update_ball() {
    ball_x += ball_dx
    ball_y += ball_dy
}

gníomh key_control(key) {
    má key == "ArrowLeft" {
        paddle_x -= paddle_speed
    } nó má key == "ArrowRight" {
        paddle_x += paddle_speed
    }
}

méarchlár(key_control)

>-- Loop forever
nuair-a fíor {
    >-- Call the draw_stage action
    draw_stage()

    >-- Update ball
    update_ball()

    >-- Sleep for a few milliseconds
    codladh(10)
}
}}}

![No collisions!](assets/no-collision-game.gif)

Oh no! The ball just flies off the screen! This is because we haven't programmed in what the ball
should do when it hits the paddle or the [[walls|ballaí]]. Let's do that now.

## Bounce

To add bouncing logic we should change our `update_ball` action. Let's start with the walls and
we'll do the paddle logic after.

Before we [[update|nuashonraigh]] the balls position, we can [[check|seiceáil]] if it will go past each of the walls, and if it
will we should turn it around.

For example, if the x coordinate is going to be [[less than|níos lú ná]] 0, then it will have gone past the
left wall, so we should [[turn|cas]] the ball around in the x direction. Similarly if the x coordinate is
[[greater than|níos mó ná]] `fadX@stáitse` we should turn the ball around in the x direction. If the y coordinate
is less than 0, then the ball is going off the top side so we should change it's y direction.

Let's put two new variables in our `update_ball` action called `pred_x` and `pred_y`, these will be
the [[predicted position|an suíomh atá tuartha]] of the ball, then we can use these values to check if it's going to go over
an edge.

```{.setanta .numberLines}
gníomh update_ball() {
    >-- Predicted coordinates
    pred_x := ball_x + ball_dx
    pred_y := ball_y + ball_dy

    >-- We'll do our bounce logic here


    >-- After bounce checks, update ball position
    ball_x += ball_dx
    ball_y += ball_dy
}
```

Now we [[insert|cuir isteach]] our checks if the predicted positions are over an edge. To change the direction of the
ball in the `x` direction we want to make `ball_dx` equal to it's [[negative|diúltach]]. The same can be done
with `ball_dy`.

When the ball goes over the bottom edge, the game is [[over|thart]]. We can use the `stop` action to
completely stop the program.

```{.setanta .numberLines}
gníomh update_ball() {
    >-- Predicted coordinates
    pred_x := ball_x + ball_dx
    pred_y := ball_y + ball_dy

    má pred_x < 0 {
        >-- Gone over the left edge
        >-- Change ball_dx direction
        ball_dx = -ball_dx
    }
    má pred_x > fadX@stáitse {
        >-- Gone over the right edge
        >-- Change ball_dx direction
        ball_dx = -ball_dx
    }
    má pred_y < 0 {
        >-- Gone over the top edge
        >-- Change ball_dy direction
        ball_dy = -ball_dy
    }
    má pred_y > fadY@stáitse {
        >-- Gone over the bottom edge
        scríobh("GAME OVER")
        stop()
    }

    >-- After bounce checks, update ball position
    ball_x += ball_dx
    ball_y += ball_dy
}
```

## Paddle Bounce

Now that we've taken care of the top, left and right edges, we need to take care of the paddle.

When we detect that the ball is going to go past the paddle, we can do an [[additional|breise]] check to see if
the paddle is under the ball by checking if the `ball_x` is [[between|idir]] `paddle_x` and `paddle_x +
paddle_width`.

If the ball has touched the paddle we can turn it around as if it hit a wall.

```{.setanta .numberLines}
gníomh update_ball() {
    >-- Predicted coordinates
    pred_x := ball_x + ball_dx
    pred_y := ball_y + ball_dy

    má pred_x < 0 {
        >-- Gone over the left edge
        >-- Change ball_dx direction
        ball_dx = -ball_dx
    }
    má pred_x > fadX@stáitse {
        >-- Gone over the right edge
        >-- Change ball_dx direction
        ball_dx = -ball_dx
    }
    má pred_y < 0 {
        >-- Gone over the top edge
        >-- Change ball_dy direction
        ball_dy = -ball_dy
    }
    má pred_y > fadY@stáitse {
        >-- Gone over the bottom edge
        scríobh("GAME OVER")
        stop()
    }

    má pred_y > paddle_y {
        >-- Ball gone past paddle_y
        >-- Check if paddle is underneath
        má pred_x >= paddle_x & pred_x <= paddle_x + paddle_width {
            >-- Turn ball_dy around
            ball_dy = -ball_dy
        }
    }

    >-- After bounce checks, update ball position
    ball_x += ball_dx
    ball_y += ball_dy
}
```

Let's try it out!

{{{s
paddle_height := 20
paddle_width := fadX@stáitse // 5

paddle_x := 0
paddle_y := fadY@stáitse - paddle_height

paddle_speed := 50

ball_x := 0
ball_y := 0

ball_rad := 40

ball_dx := 2
ball_dy := 2

gníomh draw_stage() {
    >-- Clear the stage
    glan@stáitse()

    dath@stáitse("dearg") >-- Red pen

    >-- Draw paddle
    dronLán@stáitse(paddle_x, paddle_y, paddle_width, paddle_height)

    dath@stáitse("gorm") >-- Blue pen

    >-- Draw ball
    ciorcalLán@stáitse(ball_x, ball_y, ball_rad)
}

gníomh update_ball() {
    >-- Predicted coordinates
    pred_x := ball_x + ball_dx
    pred_y := ball_y + ball_dy

    má pred_x < 0 {
        >-- Gone over the left edge
        >-- Change ball_dx direction
        ball_dx = -ball_dx
    }
    má pred_x > fadX@stáitse {
        >-- Gone over the right edge
        >-- Change ball_dx direction
        ball_dx = -ball_dx
    }
    má pred_y < 0 {
        >-- Gone over the top edge
        >-- Change ball_dy direction
        ball_dy = -ball_dy
    }
    má pred_y > fadY@stáitse {
        >-- Gone over the bottom edge
        scríobh("GAME OVER")
        stop()
    }

    má pred_y > paddle_y {
        >-- Ball gone past paddle_y
        >-- Check if paddle is underneath
        má pred_x >= paddle_x & pred_x <= paddle_x + paddle_width {
            >-- Turn ball_dy around
            ball_dy = -ball_dy
        }
    }

    >-- After bounce checks, update ball position
    ball_x += ball_dx
    ball_y += ball_dy
}

gníomh key_control(key) {
    má key == "ArrowLeft" {
        paddle_x -= paddle_speed
    } nó má key == "ArrowRight" {
        paddle_x += paddle_speed
    }
}

méarchlár(key_control)

>-- Loop forever
nuair-a fíor {
    >-- Call the draw_stage action
    draw_stage()

    >-- Update ball
    update_ball()

    >-- Sleep for a few milliseconds
    codladh(10)
}
}}}


![It works!](assets/collisions-game-simple.gif)

Ta-Da! [[It works|Oibríonn sé]]. The ball bounces around off the walls and the paddle, but the game ends if the ball
goes over the bottom edge.

# Challenge

There are lots of changes we could make to our game to make it [[better|níos fearr]]. Here's just a few things you
could try:

- Try and keep [[score|scór]], the score increases with every bounce off the paddle. Print the score when the
  game is over
- Implement a [[lives|saolta]] [[system|córas]]. The [[player|imreoir]] starts with some amount of lives and each time the ball
  bounces off the bottom [[they lose|cailleann siad]] a life.
- The collisions are currently calculated with the center of the ball `ball_x, ball_y`. Add or
  subtract the radius of the ball to make the collisions work with the edge of the ball instead.
