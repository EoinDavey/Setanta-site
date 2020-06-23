---
title: Lists + Loops
---

# Lists

So far in *Setanta* we've only been using text and numbers in our programs. These have allowed us to do some powerful stuff, but they are also very limiting.

What if we want to deal with more than one piece of text, or more than one number. That's where **[[lists|liostaí]]** come in. Lists, unsurprisingly, allow us to [[store|stóráil]] values in a [[list|liosta]].

## How to make a list

Lists are created with [[square brackets|lúibíní cearnach]] (`[, ]`) around the outside and commas (`,`) to [[separate|scar]] the [[elements|baill]] of the list, for example: `[100, 200, 300]`{.setanta} is a list with 3 elements. 100 is the first element, 200 is the second, and 300 is the last element. `[]` is an empty list.

Try adding `4` as a fourth element to the list `[1, 2, 3]`{.setanta} here:

{{{
scríobh([1, 2, 3])
}}}

[[Click here to see the answer.|scríobh([1, 2, 3, 4])]]

## Joining lists

Lists can be [[joined together|ceangailte le chéile]] with the "`+`" operator, just like text and numbers.

{{{
scríobh([10, 20] + [30, 40])
}}}

Using `+` with two lists creates a [[new list|liosta nua]] made up of the 2 original lists joined together.

We can use this to add elements to the [[end|deireadh]] or [[front|tosach]] of existing lists.

{{{
x := [1, 2, 3]
x = x + [4]
scríobh(x)
}}}

### Explanation:

- On the first line, [[we create|cruthaímid]] a new list `[1, 2, 3]`{.setanta}, and put it in the new variable "`x`".
- On the second line we [[update|nuashonraigh]] the variable `x` with the value `x + [4]`{.setanta}. The value stored in `x` is `[1, 2, 3]`{.setanta}, so this evaluates to `[1, 2, 3] + [4]`{.setanta} which equals `[1, 2, 3, 4]`{.setanta}. We then update the variable `x` to this value.
- On the third line we print `x`, which is now `[1, 2, 3, 4]`{.setanta}.

## Access

Now that we know how to make lists, and how to put values into the lists, how do we get values back out?

The [[elements of a list|baill liosta]] are [[numbered|uimhrithe]]. The first element of the list is element 0, the second is element 1, then 2, then 3, etc. This number is called the [[**index**|innéacs]] of the element.

![List numbering](assets/index-diagram.png)

We use square brackets (`[]`) again to access an element at a specific index. We wrap the index in square brackets and place it [[after|tar éis]] the list. e.g. if we have a list called `our_list`, we can access the first element by writing `our_list[0]`{.setanta}, the second element by writing `our_list[1]`{.setanta}, and so on. Here's an example you can play with:

{{{
>-- Make a new list
list := [10, 20, 30, 40]

>-- Access index 0 (the first element)
first := list[0]

scríobh(first)
}}}

Try changing the `0`{.setanta} on line 5 to a different number and see what happens.

### Out of bounds

Our list `[10, 20, 30, 40]`{.setanta} in the last example is only 4 elements [[long|ar fad]], so what happens if we try and get access to the 5th element (index 4)? Try it out:

{{{
[10, 20, 30, 40][4]
}}}

You should get an [[error|earráid]] saying "[[Tá 4 thar teorainn an liosta|4 is outside the limits of the list]]" which translates as "4 is outside the limits of the list".

![Out of bounds error](assets/out-of-bounds.png)

If a list has some [[length|fad]] L, then the only valid indices are 0, 1, 2 ... up to L - 1.

## Length

We often want to know [[how many|cé mhéad]] elements are in a list. To do this we can use the word "[[fad|length]]" meaning "length". If our list is called `our_list`, we write `fad@our_list`{.setanta} to get the length. Try it out!:

{{{
scríobh(fad@[1, 2, 3])
}}}

*([[We will see|feicfimid]] what the "@" symbol does in the future)*

# Loop-de-loop

Now that we have our lists, what can we do with them. The main tool that we will use with lists are called "[[loops|lúba]]".

Loops give us a way of taking some piece of code and repeating it over and over. We'll take a look at [[types|cineálacha]] of loops, and then see how we can use them with lists.

## Le idir

Our first type of loop we're going to look at is called the "[[le|with]] [[idir|between]]" loop. "le idir" translates as "with between". This loop is called "with between" because it allows us to loop **with** some variable, **between** two values.

The syntax for a "le idir" loop is:

```{.setanta .numberLines}
le <variable> idir (<start>, <finish>) {
    <code to repeat>
}
```

How a "le idir" loop works is:

1. The *Setanta* interpreter creates a new variable, with the name we gave ("\<variable\>"). This is called the **loop variable**.
2. Then it assigns this variable the "\<start\>" value.
3. It runs the code between the curly braces (`{ }`).
4. It then [[increases|méadaíonn]] the value in the loop variable.
5. It checks if the loop variable is equal to the "\<finish\>" variable. If it is, [[it exits|scoireann sé]] the "le idir" loop and [[continues|leanann]] on after.
6. If the loop variable wasn't equal to the finish value, then it [[returns|filleann]] to step 3.

This might be a little confusing to read, but it's easy to see with an example. Let's run the following code:

## Example

{{{
le i idir (0, 5) {
    scríobh(i)
}
scríobh("Finished")
}}}

Running this code you should see that it writes "0", then "1", then "2", "3", and "4". It then writes "[[Finished|Críochnaithe]]".

### Explanation

To execute the "le idir" loop, *Setanta* creates a new variable called "`i`". We could choose any name for this variable, but in our example we chose "`i`".

*Setanta* first assigns the start value (in our case `0`{.setanta}) to `i`, and then runs the code in the curly braces. This code is `scríobh(i)`{.setanta}. So the first thing that gets written is "0".

Next *Setanta* increases the value of `i`, so now `i` contains the value `1`{.setanta}. It then checks, is `i` equal to the finish value (in our case `5`{.setanta})? It isn't, so it returns to step 3 and runs the code [[inside the brackets|taobh istigh de na lúibíní]].
Again this is `scríobh(i)`{.setanta}. Now however `i` is `1`{.setanta}, so "1" is written on the console.

This continues for 2, 3 and 4.

Finally after *Setanta* runs the code for `4`{.setanta} it increases the value of `i` to `5`{.setanta}. Now however it checks if `i` is equal to the finish value, and this time it is. This tells *Setanta* that we are finished, so it exits the loop and continues on to the next statement.

The next statement is `scríobh("Finished")`{.setanta}, so it writes "Finished" on the console. This is the last statement so the program finishes.
