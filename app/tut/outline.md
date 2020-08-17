---
title: Outlines
prev: lets-paint
prev-text: Let's Paint
---

# Objects

It's finally time to find out what all the `@` symbols we've been using mean. We've seen `@` being
used a few times so far, in expressions like `ciorcal@stáitse`{.setanta} and
`slánuimh_rand@mata`{.setanta}.

`stáitse`{.setanta} and `mata`{.setanta} are examples of what we call *objects*. Objects can be
thought of as a collection of values. We use the `@` symbol to get the values out of the object.

Objects can contain both actions and values.

## What is "@"?

When we write `ciorcal@stáitse`{.setanta} we are saying "Get the value with the name `ciorcal` from
the `stáitse`{.setanta} object.", then we can call the action as normal (e.g.
`ciorcal@stáitse(200, 200, 100)`{.setanta}).

We can split the expression `ciorcal@stáitse(200, 200, 100)`{.setanta} into two steps to see this
more clearly. The first step will be getting the `ciorcal` action, and the second will be calling
the action.

First we can use `ciorcal@stáitse`{.setanta} to get the `ciorcal` action, then we can save it in a
variable, let's call that variable `c_action`{.setanta}.

```{.setanta .numberLines}
c_action := ciorcal@stáitse
```

Now we can call that action as before by writing:

```{.setanta .numberLines}
c_action := ciorcal@stáitse
c_action(200, 200, 100)
```

Try it out to see that it works!:

{{{s
c_action := ciorcal@stáitse
c_action(200, 200, 100)
}}}

## How do we make an object?

We make an object by first creating something called an *outline*. Then we can use the outline to
create objects. One outline can be used to create several objects.

For example, we can make an outline for an object that represents a person, then we can create a
whole family of people by creating person objects from that outline.

# Outlines
