---
title: Outlines
prev: lets-paint
prev-text: Let's Paint
---

# Objects

It's finally time to find out what all the `@` [[symbols|siombailí]] we've been using mean. We've seen `@` being
used a few times so far, in expressions like `ciorcal@stáitse`{.setanta} and
`slánuimh_rand@mata`{.setanta}. To find out what it means, we have to talk about
[[**objects**|oibiachtaí]].

## What are they?

Objects can be thought of as a [[collection|bailiúchán]] of [[values|luachanna]]. An [[object|oibiacht]] can contain [[anything|aon rud]] we want,
[[numbers|uimhreacha]], [[text|téacs]], [[actions|gníomhartha]] etc. Each [[**member**|ball]] of the object has a [[name|ainm]], much like how [[variables|athróga]] have
[[names|ainmneacha]].

[[For example|Mar shampla]] we could have an object that represents a [[person|duine]]. That object could have [[members|baill]] called
[[`age`|aois]], [[`address`|seoladh]] or [[`favourite_colour`|dath is fearr liom]] that store the persons age, address or favourite
colour.

Objects can also have [[special behaviours|iompair speisialta]] that make them more [[useful|úsáideach]] to us, but we'll see more on
that soon.

How do we use objects? To do that we have to use the "`@`" [[symbol|siombail]].

## What is "@"?

When we want to access a member of an object, [[we use|úsáidimid]] its name and the "`@`" symbol to do that. The
syntax is:

```
<member name>@<object>
```

Let's say we have an object in a [[variable|athróg]] called [[`tree`|ainm]], and it has a member called [[`height`|airde]] that
contains its height. We would write `height@tree`{.setanta} to access it.

When we write `ciorcal@stáitse`{.setanta} we are saying "[[Get|Faigh]] the [[value|luach]] with the name `ciorcal` from
the `stáitse`{.setanta} object.", then we can [[call|glaoigh ar]] the action as normal (e.g.
`ciorcal@stáitse(200, 200, 100)`{.setanta}).

We can [[split|scar]] the expression `ciorcal@stáitse(200, 200, 100)`{.setanta} into [[two steps|dhá chéim]] to see this
[[more clearly|níos soiléire]]. The [[first step|céad chéim]] will be getting the `ciorcal` [[action|gníomh]], and the [[second|dara]] will be calling
the action.

[[First|Ar dtús]] we can use `ciorcal@stáitse`{.setanta} to get the `ciorcal` action, then we can save it in a
variable, let's call that variable `ciorcal_action`{.setanta}.

```{.setanta .numberLines}
ciorcal_action := ciorcal@stáitse
```

Now we can call that action as before by writing:

```{.setanta .numberLines}
ciorcal_action := ciorcal@stáitse
ciorcal_action(200, 200, 100)
```

Try it out to see that it works!:

{{{s
ciorcal_action := ciorcal@stáitse
ciorcal_action(200, 200, 100)
}}}

## Creation

We make an object by [[first creating something|cruthaigh rud ar dtús]] called an [[*outline*|creatlach]]. Then we can use the outline to
create objects. One outline can be used to create [[several|roinnt]] objects.

For example, we can make an outline for an object that represents a person, then we can create a
whole [[family|teaglach]] of people by creating person objects [[from that outline|ón gcreatlach sin]].

# Outlines

An outline is [[exactly|go díreach]] what it sounds like, it's an outline of the [[structure|struchtúr]] of an object. When we
make an outline we [[define|sainigh]] the name of the outline, and a [[list|liosta]] of actions that define the objects
[[behaviour|iompar]].

We use the `creatlach`{.setanta} keyword to make an outline, "creatlach" is the Irish for "outline" (or "skeleton"). The syntax to make an outline is as follows:

```setanta
creatlach <outline-name> {
    <list of actions>
    ...
}
```

For example, here's how we would create an outline called [[`Simple`|simplí]] that has no special behaviour.

```{.setanta .numberLines}
>-- New outline with no actions
creatlach Simple {
}
```

This creates an action called `Simple`, that will create an object from the `Simple` outline and
return it.

We can then make an object from the "`Simple`" outline by calling `Simple` like so:

```{.setanta .numberLines}
>-- New outline with no actions
creatlach Simple {
}

>-- Create an object from the Simple outline
simple_object := Simple()
```

The "`simple_object`" object is exactly as it sounds, simple. It doesn't have any member yet. Let's
add a member called "`mem`" now with the value `"Our new member"`{.setanta}. The syntax is just like updating a variable:

```{.setanta .numberLines}
>-- New outline with no actions
creatlach Simple {
}

>-- Create an object from the Simple outline
simple_object := Simple()

>-- Add a new member to simple_object
mem@simple_object = "Our new member"
```

Now we can use `mem@simple_object` to access the value we stored in that member.

```{.setanta .numberLines}
>-- New outline with no actions
creatlach Simple {
}

>-- Create an object from the Simple outline
simple_object := Simple()

>-- Add a new member to simple_object
mem@simple_object = "Our new member"

>-- Access the member and write
scríobh(mem@simple_object)
```

Try it out!

{{{
>-- New outline with no actions
creatlach Simple {
}

>-- Create an object from the Simple outline
simple_object := Simple()

>-- Add a new member to simple_object
mem@simple_object = "Our new member"

>-- Access the member and write
scríobh(mem@simple_object)
}}}

## Challenge

Fill in the following code so that it prints "My age is \<your age\>". e.g. "My age is 18".

{{{
>-- Create an empty outline called Person
creatlach Person {
}

>-- Create an object called `me`
me := Person()

>-- Set age@me to your age

>-- Print "My age is <your age>"
}}}

[Click here to see the solution](/editor/EhEKBlNjcmlwdBCAgIDgy-WTCg)

## Why Objects?

At this point you might be thinking "Why do we need objects? They seem just like variables". Lets
take a look at a quick example of why objects are useful.

The setup is this: We want to write a program that will draw a square, print its area and its
perimeter.

To start, let's make an empty outline called "`Circle`", and make an action called "`makeCircle`" that
will create an empty object, and fill in some details. We want to record the x-coordinate,
y-coordinate, radius and colour of our circle.

```{.setanta .numberLines}
>-- Empty outline definition
creatlach Circle {
}

>-- Action to make a circle object with x, y, radius and colour
gníomh makeCircle(x, y, rad, colour) {
    >-- Create blank circle
    c := Circle()

    >-- Set our parameters
    x@c = x
    y@c = y
    rad@c = rad
    colour@c = colour

    >-- Return the circle
    toradh c
}
```

Now we can create three actions, one to draw the circle, one to get the area, and one to get the
perimeter. **Each of these actions only needs to take one parameter, the circle**.

```{.setanta .numberLines}
>-- Draw the circle
gníomh drawCirc(circ) {
    >-- Set the colour
    dath@stáitse(colour@circ)

    >-- Draw the circle
    ciorcal@stáitse(x@circ, y@circ, rad@circ)
}

>-- Return the area, area = pi * r^2
gníomh getArea(circ) {
    toradh pi@mata * rad@circ * rad@circ
}

>-- Return the perimeter, perimeter = 2 * pi * r
gníomh getPerimeter(circ) {
    toradh 2 * pi@mata * rad@circ
}
```

Now we can use our `makeCircle` action to create a circle, and our three other actions to draw it,
print the area and print the perimeter.

```{.setanta .numberLines}
c := makeCircle(100, 100, 50, "dearg")
drawCirc(c)
scríobh("Area is:", getArea(c))
scríobh("Perimeter is:", getPerimeter(c))
```

Try out the whole program! Switch to the console to see the text output.

{{{s
>-- Empty outline definition
creatlach Circle {
}

>-- Action to make a circle object with x, y, radius and colour
gníomh makeCircle(x, y, rad, colour) {
    >-- Create blank circle
    c := Circle()

    >-- Set our parameters
    x@c = x
    y@c = y
    rad@c = rad
    colour@c = colour

    >-- Return the circle
    toradh c
}

>-- Draw the circle
gníomh drawCirc(circ) {
    >-- Set the colour
    dath@stáitse(colour@circ)

    >-- Draw the circle
    ciorcal@stáitse(x@circ, y@circ, rad@circ)
}

>-- Return the area, area = pi * r^2
gníomh getArea(circ) {
    toradh pi@mata * rad@circ * rad@circ
}

>-- Return the perimeter, perimeter = 2 * pi * r
gníomh getPerimeter(circ) {
    toradh 2 * pi@mata * rad@circ
}

c := makeCircle(100, 100, 50, "dearg")
drawCirc(c)
scríobh("Area is:", getArea(c))
scríobh("Perimeter is:", getPerimeter(c))
}}}

## Behaviour

This is nice pattern, but it's messy. Can we write this in a nicer way?

This is where outline actions come in, we can move our actions like "`drawCirc`", "`getPerimeter`"
and "`getArea`" into the definition of the outline.

To do this we use the keyword "`seo`{.setanta}", which means "this". The "`seo`{.setanta}" keyword has a
special function, when we use it in an outline action, it refers to whatever object made from that
outline is calling the action.

When we create an object from an outline, that object is called an **instance** of that outline.
When we use the `seo`{.setanta} keyword in a outline action, it refers to whatever instance of the
outline is being used to call the action.

This is easier to see in practice. Let's change our "`drawCirc`" action into an outline action.
First let's copy the action as-is into the outline definition. Our outline definition looks like
this now:

```{.setanta .numberLines}
creatlach Circle {

    >-- Draw the circle
    gníomh drawCirc(circ) {
        >-- Set the colour
        dath@stáitse(colour@circ)

        >-- Draw the circle
        ciorcal@stáitse(x@circ, y@circ, rad@circ)
    }
}
```

Now we can get rid of the `circ` argument and we can use the "`seo`{.setanta}" keyword instead.

```{.setanta .numberLines}
creatlach Circle {

    >-- Draw the circle
    gníomh drawCirc() {
        >-- Set the colour
        dath@stáitse(colour@seo)

        >-- Draw the circle
        ciorcal@stáitse(x@seo, y@seo, rad@seo)
    }
}
```

Previously when we wanted to call `drawCirc` with a particular circle object `c`, we would write
`drawCirc(c)`. Now that `drawCirc` is an outline action, we can write `drawCirc@c()` to call it.

When we do this, because `c` is an instance of `Circle`, everywhere we used `seo`{.setanta}, it will
point to `c`.

Let's turn "`getArea`" and "`getPerimeter`" into outline actions too. We move them into the outline
definition, get rid of the "`circ`" argument, and use `seo`{.setanta} instead. We should also rename
`drawCirc` to just `draw`, to make it easier to read.

```{.setanta .numberLines}
creatlach Circle {

    >-- Draw the circle
    gníomh draw() {
        >-- Set the colour
        dath@stáitse(colour@seo)

        >-- Draw the circle
        ciorcal@stáitse(x@seo, y@seo, rad@seo)
    }

    >-- Return the area, area = pi * r^2
    gníomh getArea() {
        toradh pi@mata * rad@seo * rad@seo
    }

    >-- Return the perimeter, perimeter = 2 * pi * r
    gníomh getPerimeter() {
        toradh 2 * pi@mata * rad@seo
    }
}
```

Now we can replace our calls to "`getArea`" and "`getPerimeter`" with this:

```{.setanta .numberLines}
c := makeCircle(100, 100, 50, "dearg")
c@draw()
scríobh("Area is:", c@getArea())
scríobh("Perimeter is:", c@getPerimeter())
```

`getArea`, `getPerimeter` and `draw` are all outline actions, so Setanta will make the
`seo`{.setanta} keyword point to `c`, because it is an instance of `Circle`.

Try it out!:

{{{s
creatlach Circle {

    >-- Draw the circle
    gníomh draw() {
        >-- Set the colour
        dath@stáitse(colour@seo)

        >-- Draw the circle
        ciorcal@stáitse(x@seo, y@seo, rad@seo)
    }

    >-- Return the area, area = pi * r^2
    gníomh getArea() {
        toradh pi@mata * rad@seo * rad@seo
    }

    >-- Return the perimeter, perimeter = 2 * pi * r
    gníomh getPerimeter() {
        toradh 2 * pi@mata * rad@seo
    }
}

>-- Action to make a circle object with x, y, radius and colour
gníomh makeCircle(x, y, rad, colour) {
    >-- Create blank circle
    c := Circle()

    >-- Set our parameters
    x@c = x
    y@c = y
    rad@c = rad
    colour@c = colour

    >-- Return the circle
    toradh c
}

c := makeCircle(100, 100, 50, "dearg")
draw@c()
scríobh("Area is:", getArea@c())
scríobh("Perimeter is:", getPerimeter@c())
}}}

## Constructor

Outline actions are useful, but can we get rid of the need for the `makeCircle` action?

Yes we can! *Setanta* let's you create a special outline action called a **constructor**. A
constructor is an action that is called when an object is made from the outline.

To make a constructor, you create an outline action with the name "nua", which means "new". Then
when you create an object from that outline, the arguments you use are passed into the constructor
action.

### Quick Example

Let's see a quick example, we'll make an outline called `Person`, and give it a constructor that takes
one argument, `name`.

```{.setanta .numberLines}
creatlach Person {
    gníomh nua(name) {
    }
}
```

Let's add code into the constructor to write the `name` that's passed in:

```{.setanta .numberLines}
creatlach Person {
    gníomh nua(name) {
        scríobh("Created a person called", name)
    }
}
```

Now when we create a new person, you can pass in the name you want:

```{.setanta .numberLines}
creatlach Person {
    gníomh nua(name) {
        scríobh("Created a person called", name)
    }
}

me := Person("Eoin")
```

Try it out! You'll see that `"Created a person called Eoin"`{.setanta} is written on the console.

{{{
creatlach Person {
    gníomh nua(name) {
        scríobh("Created a person called", name)
    }
}

me := Person("Eoin")
}}}

### Circle Constructor

Now we can get rid of our `makeCircle` action, and use a constructor instead. Let's create our
constructor that takes the same arguments, `x`, `y`, `rad` and `colour`. We can use the
`seo`{.setanta} keyword to store those arguments in the instance we are creating.

```{.setanta .numberLines}
gníomh nua(x, y, rad, colour) {
    x@seo = x
    y@seo = y
    rad@seo = rad
    colour@seo = colour
}
```

Now we can totally get rid of the `makeCircle` action, and instead of creating `c` by writing:

```{.setanta}
c := makeCircle(100, 100, 50, "dearg")
```

we can write:

```{.setanta}
c := Circle(100, 100, 50, "dearg")
```

Our final program looks like this:

```{.setanta .numberLines}
creatlach Circle {

    gníomh nua(x, y, rad, colour) {
        x@seo = x
        y@seo = y
        rad@seo = rad
        colour@seo = colour
    }

    >-- Draw the circle
    gníomh draw() {
        >-- Set the colour
        dath@stáitse(colour@seo)

        >-- Draw the circle
        ciorcal@stáitse(x@seo, y@seo, rad@seo)
    }

    >-- Return the area, area = pi * r^2
    gníomh getArea() {
        toradh pi@mata * rad@seo * rad@seo
    }

    >-- Return the perimeter, perimeter = 2 * pi * r
    gníomh getPerimeter() {
        toradh 2 * pi@mata * rad@seo
    }
}

c := Circle(100, 100, 50, "dearg")
draw@c()
scríobh("Area is:", getArea@c())
scríobh("Perimeter is:", getPerimeter@c())
```

Let's give it a try!

{{{s
creatlach Circle {

    gníomh nua(x, y, rad, colour) {
        x@seo = x
        y@seo = y
        rad@seo = rad
        colour@seo = colour
    }

    >-- Draw the circle
    gníomh draw() {
        >-- Set the colour
        dath@stáitse(colour@seo)

        >-- Draw the circle
        ciorcal@stáitse(x@seo, y@seo, rad@seo)
    }

    >-- Return the area, area = pi * r^2
    gníomh getArea() {
        toradh pi@mata * rad@seo * rad@seo
    }

    >-- Return the perimeter, perimeter = 2 * pi * r
    gníomh getPerimeter() {
        toradh 2 * pi@mata * rad@seo
    }
}

c := Circle(100, 100, 50, "dearg")
draw@c()
scríobh("Area is:", getArea@c())
scríobh("Perimeter is:", getPerimeter@c())
}}}
