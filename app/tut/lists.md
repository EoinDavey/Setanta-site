---
title: Lists + Loops
---

# Lists

So far in *Setanta* we've only been using text and numbers in our programs. These have allowed us to do some powerful stuff, but they are also very limiting.

What if we want to deal with more than one piece of text, or more than one number. That's where **lists** come in. Lists, unsurprisingly, allow us to store values in a list.

## How to make a list

Lists are created with square brackets (`[, ]`) around the outside and commas (`,`) to separate the elements of the list, for example: `[100, 200, 300]`{.setanta} is a list with 3 elements. 100 is the first element, 200 is the second, and 300 is the last element. `[]` is an empty list.

Try adding `4` as a fourth element to the list `[1, 2, 3]`{.setanta} here:

{{{
scríobh([1, 2, 3])
}}}

[[Click here to see the answer.|scríobh([1, 2, 3, 4])]]

## Joining lists

Lists can be joined together with the "`+`" operator, just like text and numbers.

{{{
scríobh([10, 20] + [30, 40])
}}}

Using `+` with two lists creates a new list made up of the 2 original lists joined together.

We can use this to add elements to the end or front of existing lists.

{{{
x := [1, 2, 3]
x = x + [4]
scríobh(x)
}}}

### Explanation:

- On the first line, we create a new list `[1, 2, 3]`{.setanta}, and put it in the new variable "`x`".
- On the second line we update the variable `x` with the value `x + [4]`{.setanta}. The value stored in `x` is `[1, 2, 3]`{.setanta}, so this evaluates to `[1, 2, 3] + [4]`{.setanta} which equals `[1, 2, 3, 4]`{.setanta}. We then update the variable `x` to this value.
- On the third line we print `x`, which is now `[1, 2, 3, 4]`{.setanta}.

## Access

Now that we know how to make lists, and how to put values into the lists, how do we get values back out?

The elements of a list are numbered. The first element of the list is element 0, the second is element 1, then 2, then 3, etc. This number is called the **index** of the element.

![List numbering](assets/index-diagram.png)
