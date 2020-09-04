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
variable, let's call that variable `gníomh_ciorcal`{.setanta}.

```{.setanta .numberLines}
gníomh_ciorcal := ciorcal@stáitse
```

Now we can call that action as before by writing:

```{.setanta .numberLines}
gníomh_ciorcal := ciorcal@stáitse
gníomh_ciorcal(200, 200, 100)
```

Try it out to see that it works!:

{{{s
gníomh_ciorcal := ciorcal@stáitse
gníomh_ciorcal(200, 200, 100)
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

For example, here's how we would create an outline called `Simplí` that has no special behaviour.
"Simplí" translates as "[[simple|simplí]]".

```{.setanta .numberLines}
>-- New outline with no actions
creatlach Simplí {
}
```

[[This creates|Cruthaíonn é seo]] a new action called `Simplí`. When you [[call|glaoigh ar]]
`Simplí`, it will create an object from the `Simplí` outline and return it.

We can then make an object from the "`Simplí`" outline by calling `Simplí` like so:

```{.setanta .numberLines}
>-- New outline with no actions
creatlach Simplí {
}

>-- Create an object from the Simplí outline
oibiacht_simplí := Simplí()
```

We created a new variable called "`oibiacht_simplí`" to store the object. "oibiacht simplí" means "simple object". This object is exactly as it sounds, simple. It doesn't have any [[members|baill]]
yet. Let's add a [[member|ball]] called "`ball`" (meaning "member") [[now|anois]] with the [[value|luach]]
`"Ár mball nua"`{.setanta} ("Our new member"). The syntax is just like [[updating|nuashonrú]] a [[variable|athróg]]:

```{.setanta .numberLines}
>-- New outline with no actions
creatlach Simplí {
}

>-- Create an object from the Simplí outline
oibiacht_simplí := Simplí()

>-- Add a new member to oibiacht_simplí
ball@oibiacht_simplí = "Ár mball nua"
```

Now we can use `ball@oibiacht_simplí` to [[access|faigh]] the value we stored in that member.

```{.setanta .numberLines}
>-- New outline with no actions
creatlach Simplí {
}

>-- Create an object from the Simplí outline
oibiacht_simplí := Simplí()

>-- Add a new member to oibiacht_simplí
ball@oibiacht_simplí = "Ár mball nua"

>-- Access the member and write
scríobh(ball@oibiacht_simplí)
```

[[Try it out!|Ban triail as!]]

{{{
>-- New outline with no actions
creatlach Simplí {
}

>-- Create an object from the Simplí outline
oibiacht_simplí := Simplí()

>-- Add a new member to oibiacht_simplí
ball@oibiacht_simplí = "Ár mball nua"

>-- Access the member and write
scríobh(ball@oibiacht_simplí)
}}}

## Challenge

Fill in the following [[code|cód]] so that it prints "My age is \<your age\>". e.g. "My age is 18".

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

At this point you might be [[thinking|ag ceapadh]] "Why do we need objects? They seem just like
variables". Lets take a look at a [[quick example|sampla gearr]] of why objects are
[[useful|úsáideach]].

The setup is this: We want to [[write|scríobh]] a [[program|ríomhchlár]] that will [[draw|tarraing]]
a [[square|cearnóg]], print its [[area|achar]] and its [[perimeter|imlíne]].

[[To start|Chun tús a chur]], let's [[make|déan]] an [[empty|folamh]] outline [[called|darb ainm]]
[["`Ciorcal`"|Circle]], and make an [[action|gníomh]] called [["`déan_ciorcal`"|make circle]] that will create an empty object,
and fill in some [[details|sonraí]]. We want to [[record|taifead]] the x-coordinate, y-coordinate,
[[radius|ga]] and [[colour|dath]] of our [[circle|ciorcal]]. We'll put these in members called `x`,
`y`, `ga` and `dath`.

```{.setanta .numberLines}
>-- Empty outline definition
creatlach Ciorcal {
}

>-- Action to make a circle object with x, y, radius and colour
gníomh déan_ciorcal(x, y, ga, dath) {
    >-- Create blank circle
    c := Ciorcal()

    >-- Set our parameters
    x@c = x
    y@c = y
    ga@c = ga
    dath@c = dath

    >-- Return the circle
    toradh c
}
```

Now we can create three actions, one to draw the circle, one to get the [[area|achar]], and one to get the
[[perimeter|imlíne]]. We'll call these actions `tarraing`, `achar` and `imlíne`.
**Each of these actions only needs to take one parameter, the circle**.

```{.setanta .numberLines}
>-- Draw the circle
gníomh tarraing(ciorc) {
    >-- Set the colour
    dath@stáitse(dath@ciorc)

    >-- Draw the circle
    ciorcal@stáitse(x@ciorc, y@ciorc, ga@ciorc)
}

>-- Return the area, area = pi * r^2
gníomh achar(ciorc) {
    toradh pi@mata * ga@ciorc * ga@ciorc
}

>-- Return the perimeter, perimeter = 2 * pi * r
gníomh imlíne(ciorc) {
    toradh 2 * pi@mata * ga@ciorc
}
```

Now we can use our `déan_ciorcal` action to create a circle, and our three other actions to draw it,
print the area and print the perimeter.

```{.setanta .numberLines}
c := déan_ciorcal(100, 100, 50, "dearg")
tarraing(c)
scríobh("Area is:", achar(c))
scríobh("Perimeter is:", imlíne(c))
```

Try out the whole program! [[Switch|Athraigh]] to the [[console|consól]] to see the [[text|téacs]]
[[output|aschur]].

{{{s
>-- Empty outline definition
creatlach Ciorcal {
}

>-- Action to make a circle object with x, y, radius and colour
gníomh déan_ciorcal(x, y, ga, dath) {
    >-- Create blank circle
    c := Ciorcal()

    >-- Set our parameters
    x@c = x
    y@c = y
    ga@c = ga
    dath@c = dath

    >-- Return the circle
    toradh c
}

>-- Draw the circle
gníomh tarraing(ciorc) {
    >-- Set the colour
    dath@stáitse(dath@ciorc)

    >-- Draw the circle
    ciorcal@stáitse(x@ciorc, y@ciorc, ga@ciorc)
}

>-- Return the area, area = pi * r^2
gníomh achar(ciorc) {
    toradh pi@mata * ga@ciorc * ga@ciorc
}

>-- Return the perimeter, perimeter = 2 * pi * r
gníomh imlíne(ciorc) {
    toradh 2 * pi@mata * ga@ciorc
}

c := déan_ciorcal(100, 100, 50, "dearg")
tarraing(c)
scríobh("Area is:", achar(c))
scríobh("Perimeter is:", imlíne(c))
}}}

## Behaviour

This is nice pattern, but it's [[messy|míshlachtmhar]]. Can we write this in a [[nicer|níos deise]] way?

This is where outline actions come in, we can move our actions like "`tarraing`", "`imlíne`"
and "`achar`" into the [[definition|sainmhíniú]] of the outline.

To do this we use the keyword "`seo`{.setanta}", which means [["this"|é seo]]. The "`seo`{.setanta}"
keyword has a special [[function|feidhm]], when we use it in an outline action, it refers to
whatever object made from that outline is calling the action.

When we create an object from an outline, that object is called an [[**instance**|asc]] of that outline.
When we use the `seo`{.setanta} keyword in a outline action, it refers to whatever instance of the
outline is being used to call the action.

This is easier to see in practice. Let's change our "`tarraing`" action into an outline action.
First let's copy the action as-is into the outline definition. Our outline definition looks like
this now:

```{.setanta .numberLines}
creatlach Ciorcal {

    >-- Draw the circle
    gníomh tarraing(ciorc) {
        >-- Set the colour
        dath@stáitse(dath@ciorc)

        >-- Draw the circle
        ciorcal@stáitse(x@ciorc, y@ciorc, ga@ciorc)
    }
}
```

Now we can get rid of the `ciorc` argument and we can use the "`seo`{.setanta}" keyword instead.

```{.setanta .numberLines}
creatlach Ciorcal {

    >-- Draw the circle
    gníomh tarraing() {
        >-- Set the colour
        dath@stáitse(dath@seo)

        >-- Draw the circle
        ciorcal@stáitse(x@seo, y@seo, ga@seo)
    }
}
```

[[Previously|Roimhe seo]] when we wanted to call `tarraing` with a particular circle object `c`,
we would write `tarraing(c)`. Now that `tarraing` is an outline action, we can write
`tarraing@c()` to call it.

When we do this, because `c` is an instance of `Ciorcal`, everywhere we used `seo`{.setanta}, it will
point to `c`.

Let's turn "`achar`" and "`imlíne`" into outline actions too. We [[move|bog]] them into the
outline definition, get rid of the "`ciorc`" [[argument|argóint]], and use `seo`{.setanta} instead.

```{.setanta .numberLines}
creatlach Ciorcal {

    >-- Draw the circle
    gníomh tarraing() {
        >-- Set the colour
        dath@stáitse(dath@seo)

        >-- Draw the circle
        ciorcal@stáitse(x@seo, y@seo, ga@seo)
    }

    >-- Return the area, area = pi * r^2
    gníomh achar() {
        toradh pi@mata * ga@seo * ga@seo
    }

    >-- Return the perimeter, perimeter = 2 * pi * r
    gníomh imlíne() {
        toradh 2 * pi@mata * ga@seo
    }
}
```

Now we can replace our calls to "`achar`" and "`imlíne`" with this:

```{.setanta .numberLines}
c := déan_ciorcal(100, 100, 50, "dearg")
tarraing@c()
scríobh("Area is:", achar@c())
scríobh("Perimeter is:", imlíne@c())
```

`achar`, `imlíne` and `draw` are all outline actions, so Setanta will make the
`seo`{.setanta} keyword point to `c`, because it is an instance of `Ciorcal`.

Try it out!:

{{{s
creatlach Ciorcal {

    >-- Draw the circle
    gníomh tarraing() {
        >-- Set the colour
        dath@stáitse(dath@seo)

        >-- Draw the circle
        ciorcal@stáitse(x@seo, y@seo, ga@seo)
    }

    >-- Return the area, area = pi * r^2
    gníomh achar() {
        toradh pi@mata * ga@seo * ga@seo
    }

    >-- Return the perimeter, perimeter = 2 * pi * r
    gníomh imlíne() {
        toradh 2 * pi@mata * ga@seo
    }
}

>-- Action to make a circle object with x, y, radius and colour
gníomh déan_ciorcal(x, y, ga, dath) {
    >-- Create blank circle
    c := Ciorcal()

    >-- Set our parameters
    x@c = x
    y@c = y
    ga@c = ga
    dath@c = dath

    >-- Return the circle
    toradh c
}

c := déan_ciorcal(100, 100, 50, "dearg")
tarraing@c()
scríobh("Area is:", achar@c())
scríobh("Perimeter is:", imlíne@c())
}}}

## Constructor

Outline actions are useful, but can we get rid of the need for the `déan_ciorcal` action?

[[Yes we can!|Is féidir linn!]] *Setanta* [[let's you|ligeann duit]] create a special outline action
called a **constructor**. A [[constructor|cruthaitheoir]] is an action that is called when an object
is made from the outline.

To make a constructor, you create an outline action with the name "nua", which means [["new"|nua]].
Then when you create an object from that outline, the arguments you use are passed into the
constructor action.

### Quick Example

Let's see a quick example, we'll make an outline called `Person`, and give it a constructor that takes
[[one argument|argóint amháin]], `name`.

```{.setanta .numberLines}
creatlach Person {
    gníomh nua(name) {
    }
}
```

Let's add code into the constructor to [[write|scríobh]] the `name` that's passed in:

```{.setanta .numberLines}
creatlach Person {
    gníomh nua(name) {
        scríobh("Created a person called", name)
    }
}
```

Now when we create a new [[person|duine]], you can pass in the name you want:

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

### Ciorcal Constructor

Now we can get rid of our `déan_ciorcal` action, and use a constructor [[instead|in ionad]]. Let's
create our constructor that takes the same [[arguments|argóintí]], `x`, `y`, `ga` and `dath`. We
can use the `seo`{.setanta} keyword to [[store|stóráil]] those arguments in the instance
[[we are creating|atá á chruthú againn]]

```{.setanta .numberLines}
gníomh nua(x, y, ga, dath) {
    x@seo = x
    y@seo = y
    ga@seo = ga
    dath@seo = dath
}
```

Now we can [[totally|go hiomlán]] get rid of the `déan_ciorcal` action, and instead of creating `c` by
writing:

```{.setanta}
c := déan_ciorcal(100, 100, 50, "dearg")
```

we can write:

```{.setanta}
c := Ciorcal(100, 100, 50, "dearg")
```

Our final program looks like this:

```{.setanta .numberLines}
creatlach Ciorcal {

    gníomh nua(x, y, ga, dath) {
        x@seo = x
        y@seo = y
        ga@seo = ga
        dath@seo = dath
    }

    >-- Draw the circle
    gníomh tarraing() {
        >-- Set the colour
        dath@stáitse(dath@seo)

        >-- Draw the circle
        ciorcal@stáitse(x@seo, y@seo, ga@seo)
    }

    >-- Return the area, area = pi * r^2
    gníomh achar() {
        toradh pi@mata * ga@seo * ga@seo
    }

    >-- Return the perimeter, perimeter = 2 * pi * r
    gníomh imlíne() {
        toradh 2 * pi@mata * ga@seo
    }
}

c := Ciorcal(100, 100, 50, "dearg")
tarraing@c()
scríobh("Area is:", achar@c())
scríobh("Perimeter is:", imlíne@c())
```

Let's give it a try!

{{{s
creatlach Ciorcal {

    gníomh nua(x, y, ga, dath) {
        x@seo = x
        y@seo = y
        ga@seo = ga
        dath@seo = dath
    }

    >-- Draw the circle
    gníomh tarraing() {
        >-- Set the colour
        dath@stáitse(dath@seo)

        >-- Draw the circle
        ciorcal@stáitse(x@seo, y@seo, ga@seo)
    }

    >-- Return the area, area = pi * r^2
    gníomh achar() {
        toradh pi@mata * ga@seo * ga@seo
    }

    >-- Return the perimeter, perimeter = 2 * pi * r
    gníomh imlíne() {
        toradh 2 * pi@mata * ga@seo
    }
}

c := Ciorcal(100, 100, 50, "dearg")
tarraing@c()
scríobh("Area is:", achar@c())
scríobh("Perimeter is:", imlíne@c())
}}}
