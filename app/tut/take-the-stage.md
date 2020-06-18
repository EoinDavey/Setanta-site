---
title: Take the stage!
---

# Lights, Camera Actions!

To get started drawing [[shapes|cruthanna]] on the stage, we're going to need to first look
at **[[actions|gníomhartha]]**.

We've seen a few actions already, `scríobh`{.setanta} was an action, as well as `codladh`{.setanta}.

Actions are special values that represent an action the computer can take. In the case of `scríobh`{.setanta} that action was writing text on the console, and in the case of `codladh`{.setanta} that action was waiting for some time. In the future we'll see how to make our own actions, but for now we'll look at how to use them.

## Call me!

When we use an action, we say we are [["calling"|ag glaoch ar]] it. Remember how we used the `scríobh`{.setanta} action?

```{.setanta .numberLines}
scríobh("Write me on the console")
```

When the *Setanta* interpreter reads `scríobh("Write me on the console")`{.setanta} it knows to call the `scríobh` action, and to pass it the text `"Write me on the console"`{.setanta}.

The text in the brackets is called an [[*argument*|argóint]]. In the code above, the text `"Write me on the console"`{.setanta} is the argument to `scríobh`{.setanta}.

In the following code we saw before, `2000`{.setanta} is the argument to `codladh`{.setanta}:

```{.setanta .numberLines}
codladh(2000)
```

When this code is ran, the computer passes `2000`{.setanta} to the `codladh` action and then calls it,
causing the program to sleep for 2 seconds.

### Multiple Arguments

Some actions in *Setanta* can take more than 1 argument. When we pass in more than 1 argument we use a [[comma|camóg]] ("`,`") to separate them.

For example: The `scríobh`{.setanta} action can take as many arguments as we want, and it will write them all out with a [[space|spás]] in between them. Try it out here:

{{{
scríobh("First-argument", "second-argument")
}}}

Not all actions can take as many arguments as you want. The `codladh`{.setanta} action needs exactly 1 argument, no more, no less.

*Some actions can also take 0 arguments*

## Challenge

Let's test our [[knowledge|eolas]] of actions!

Here is some code that uses `scríobh`{.setanta} to write "Setanta is fun!".
[[Change|Athraigh]] the code so that it still prints "Setanta is fun!", but uses three arguments instead.

{{{
scríobh("Setanta is fun!")
}}}

[[Click here to see the answer|scríobh(&quot;Setanta&quot;, &quot;is&quot;, &quot;fun!&quot;)]]

## Results

Some actions in *Setanta* return a value after they are called. We call this value the [[result|toradh]] of the action.

To see what I mean, here's a quick example. *Setanta* has a function called "[[`uas`{.setanta}|max]]". "uas" is short for "[[uasmhéid|maximum]]" which translates into English as "maximum".

So what does `uas`{.setanta} do? `uas`{.setanta} is an action that takes 2 numbers as arguments and returns the maximum.

E.g. The result of `uas(3, 2)`{.setanta} is 3.

We can assign variables to the result of actions like 

```{.setanta .numberLines}
biggest := uas(3, 2)
```

In this case, the value of `biggest` will be 3. Try it out here:

{{{
biggest := uas(3, 2)
scríobh(biggest)
}}}

### Example from before

In our first intro to *Setanta* we saw this code:

```{.setanta .numberLines}
ainm := ceist("Cad is ainm duit?")
scríobh("Dia duit", ainm)
```

Now we know enough to see what's going on here!

1. First we use the `ceist`{.setanta} action to print "Cad is ainm duit?" on the console.
2. The user will type their name into the console, and the result will be returned by `ceist`{.setanta} and stored in the `ainm` variable.
3. Then we use the `scríobh`{.setanta} action to write "Dia duit" and the value of the `ainm` variable.

Try it out again to see this all in action!

{{{
ainm := ceist("Cad is ainm duit?")
scríobh("Dia duit", ainm)
}}}

**Try expanding this program to ask the user for their age too**

# Stage actions!

Now that we've learned all about actions, we can finally take to the stage.

We use actions to draw shapes and manipulate the stage. There are a lot of actions at our disposal.

Let's take at our first stage action "[[`ciorcal`{.setanta}|circle]]" which translates as "circle". This action allows us to draw circles on the stage. To access this action we have to [[type|clóscríobh]].

```{.setanta .numberLines}
ciorcal@stáitse
```

We'll see why we have to add the "`@stáitse`{.setanta}" part later on.

Try this code out:

{{{
ciorcal@stáitse(200, 200, 50)
}}}

**Remember that you can use the tabs to switch between the console and the stage**.
