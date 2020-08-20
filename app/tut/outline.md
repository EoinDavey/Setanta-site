---
title: Outlines
prev: lets-paint
prev-text: Let's Paint
---

# Objects

It's finally time to find out what all the `@` symbols we've been using mean. We've seen `@` being
used a few times so far, in expressions like `ciorcal@stáitse`{.setanta} and
`slánuimh_rand@mata`{.setanta}. To find out what it means, we have to talk about **objects**.

## What are they?

Objects can be thought of as a collection of values. An object can contain anything we want,
numbers, text, actions etc. Each **member** of the object has a name, much like how variables have
names.

For example we could have an object that represents a person. That object could have members called
"`age`", "`address`" or "`favourite_colour`" that store the persons age, address or favourite
colour.

Objects can also have special behaviours that make them more useful to us, but we'll see more on
that soon.

How do we use objects? To do that we have to use the "`@`" symbol.

## What is "@"?

When we want to access a member of an object, we use its name and the "`@`" symbol to do that. The
syntax is:

```
<member name>@<object>
```

Let's say we have an object in a variable called `tree`, and it has a member called `height` that
contains its height. We would write `height@tree`{.setanta} to access it.

When we write `ciorcal@stáitse`{.setanta} we are saying "Get the value with the name `ciorcal` from
the `stáitse`{.setanta} object.", then we can call the action as normal (e.g.
`ciorcal@stáitse(200, 200, 100)`{.setanta}).

We can split the expression `ciorcal@stáitse(200, 200, 100)`{.setanta} into two steps to see this
more clearly. The first step will be getting the `ciorcal` action, and the second will be calling
the action.

First we can use `ciorcal@stáitse`{.setanta} to get the `ciorcal` action, then we can save it in a
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

We make an object by first creating something called an *outline*. Then we can use the outline to
create objects. One outline can be used to create several objects.

For example, we can make an outline for an object that represents a person, then we can create a
whole family of people by creating person objects from that outline.

# Outlines

An outline is exactly what it sounds like, it's an outline of the structure of an object. When we
make an outline we define the name of the outline, and a list of actions that define the objects
behaviour.

We use the `creatlach`{.setanta} keyword to make an outline, "creatlach" is the Irish for "outline" (or "skeleton"). The syntax to make an outline is as follows:

```setanta
creatlach <outline-name> {
    <list of actions>
    ...
}
```

For example, here's how we would create an outline called "`Simple`" that has no special behaviour.

```{.setanta .numberLines}
>-- New outline with no actions
creatlach Simple {
}
```

We can then make an object from the "`Simple`" outline by calling an action called "`Simple`" like
so:

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
