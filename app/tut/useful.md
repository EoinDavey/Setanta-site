---
title: Some Useful Actions
prev: action
prev-text: Time for Action
---

# Maths Tips

Before we move onto more complex *Setanta* features, let's look at some useful actions and operators that we can use with what we already know.

We saw early in the tutorial that *Setanta* supports addition, multiplication, subtraction and division (using `+`, `*`, `-` and `/`). *Setanta* supports more useful operators and actions to make calculations easier!

## More Operators

*Setanta* has 2 more operators that we haven't seen yet. They are the "modulo" operator (`%`), and the integer division operator (`//`).

### Modulo

The modulo operator (%) is an operator you might not be familiar with, but it's extremely useful.

The modulo operator takes two numbers, and returns the remainder when one is divided by the other.

e.g. `7 % 2`{.setanta} is equal to 1, because 7 has remainder 1 when divided by 2. `11 % 4` has remainder 3, because 11 has remainder 3 when divided by 4.

This operator is extremely useful because it allows us to check lots of things. For example, we can check if a number is odd or even by checking if has remainder 1 or 0 when divided by 2. Try it out here!

{{{
le i idir (0, 10) {
    má i % 2 == 1 {
        scríobh(i, "is odd")
    } nó {
        scríobh(i, "is even")
    }
}
}}}

We can also use `%` to check if one number is divisible by another. A number is divisible by another number if it leaves 0 remainder when you divide by it. e.g. `10 % 2`{.setanta} and `10 % 5`{.setanta} are both 0 because 10 is divisible by 2 and 5.

We can use this to check if a number is prime! A prime number will have exactly 2 divisors.

```{.setanta .numberLines}
>-- Action to check is `x` prime
gníomh is_prime(x) {
    >-- Variable to count divisors
    divisors := 0

    >-- Check all numbers from 1 to x
    le i idir (1, x + 1) {
        >-- If x % i == 0 then i is a divisor
        má x % i == 0 {
            >-- Add 1 to divisor count
            divisors += 1
        }
    }

    >-- If divisors == 2, then x is prime
    >-- If divisors isn't 2, then x not prime
    toradh divisors == 2
}
```

Let's try it out! Run this code and try some primes and non-primes:

{{{
gníomh is_prime(x) {
    divisors := 0
    le i idir (1, x + 1)
        má x % i == 0
            divisors += 1
    toradh divisors == 2
}

uimhir := go_uimh(ceist("Enter a number"))
má is_prime(uimhir)
    scríobh(uimhir, "is prime")
nó
    scríobh(uimhir, "is not prime")
}}}

### Integer division

We've seen the division operator (`/`) in use already. e.g. `10 / 5 == 2`{.setanta}.

The integer division operator (`//`) is just like the division operator, except it rounds down after dividing, so you always get a whole number.

Try it out here:

{{{
scríobh(5 / 2)
scríobh(5 // 2)
}}}

## Maths actions

Earlier in the tutorial we got lots of use out of `rand@mata`{.setanta} and `randUimh@mata`{.setanta} to get random numbers. However, those are not the only maths actions we have.

Here is a quick list of actions and values you can access: Don't worry if you don't know what some of the actions do. They're available for anyone who needs them.

### Values

| Name | Description | Example |
|:------|:-----:|----:|
| `pí` | Pi constant (3.1415...) | `pi@mata`{.setanta} |
| `e` | e constant (2.71828..) | `e@mata`{.setanta} |

### Actions

| Name | Description | Example |
|:------|:-----:|----:|
| `fréamh` | Square root | `fréamh@mata(4) == 2`{.setanta} |
| `cearn` | Square function (`x * x`)  |  `cearn@mata(2) == 4`{.setanta} |
| `dearbh` | Absolute value | `abs@mata(-2) == 2`{.setanta} |
| `eas` | Exponential (`e^x`) | `eas@mata(1) == e@mata`{.setanta} |
| `cmhcht` | Power (`x^y`) | `cmhcht@mata(2, 4) == 16`{.setanta} |
| `log` | Logarithm | `log@mata(2)`{.setanta} |
| `logb` | Logarithm in some base | `logb@mata(16, 2) == 4`{.setanta} |
| `sin`  | Sine                  | `sin@mata(pi@mata/2)`{.setanta} |
| `cos`  | Cosine             | `cos@mata(0)`{.setanta} |
| `tan`  | Tangent                 | `tan@mata(pi@mata)`{.setanta} |
| `asin` | Inverse sine      | `asin@mata(0)`{.setanta} |
| `acos` | Inverse cosine | `acos@mata(pi@mata)`{.setanta} |
| `atan` | Inverse tangent    | `atan@mata(0)`{.setanta} |
| `rand` | Random number from 0 to 1 | `rand@mata()`{.setanta} |
| `randUimh` | Random whole number in some range | `randUimh@mata(5, 10)`{.setanta} |

# Text Tips

The only operations and actions we've seen so far with text have been using `+` to add two pieces
of text together, using `fad`{.setanta} to get the length of the text, and using square brackets
(`[ ]`) to access (index) specific letters.

There is much more we can do with text though! Let's look at some useful actions.

## go_téacs

Use `go_téacs` to convert any value to a text representation. `go_téacs` translates as "to text".

For example `go_téacs([1, 2, 3]) == "[1, 2, 3]"`{.setanta} and `go_téacs(scríobh) == "< gníomh
scríobh >"`{.setanta}

## Athchuir

Athchuir translates as "replace". You can use the `athchuir` action to replace parts of text with
another piece of text. For example you could replace every sad face (":(") in a piece of text with a happy face (":)").

If you remember how we had to use the `@` symbol to use `fad`{.setanta} to get the length of the
text (`fad@"hey" == 3`{.setanta}), we also have to use the `@` symbol to use `athchuir`.

Check out some examples:

{{{
our_text := "Hello :("
>-- Replace each ":(" in `our_text` with ":)"
scríobh(athchuir@our_text(":(", ":)"))

>-- Replace the "Hello" with "Goodbye"
scríobh(athchuir@our_text("Hello", "Goodbye"))
}}}

## Roinn

"Roinn" means "split" or "divide". We can use the `roinn` action to split up a piece of text at
certain points. For example we could use `roinn` with commas to divide up a comma separated list like `"Setanta,
is, fun"`{.setanta} into the list `["Setanta", "is", "fun"]`{.setanta}. Or we could use `roinn` with
spaces to separate a sentence into a list of words.

Try it out:

{{{
>-- Ask the user for their full name
full_name := ceist("Enter your full name: ")

>-- Use roinn to split the text into pieces
names := roinn@full_name(" ")

>-- Access the first and second elements of the `names` list
scríobh("Your first name is:", names[0])
scríobh("Your second name is:", names[1])
}}}

![Full name demo](assets/full-name.gif)

## Cuid

"Cuid" means "part" or "piece", and the `cuid` action allows us to extract a piece of text. We give
the action 2 positions as arguments, and it returns the text between those 2 positions (not
including the second).

e.g. `cuid@"hello"(1, 4)`{.setanta} returns `"ell"`{.setanta} because the text between index 1 and
index 4 is `"ell"`{.setanta}

## go_liosta

`go_liosta` (meaning "to list") is an action that returns a list of the characters of the text.

e.g. `go_liosta("Setanta")`{.setanta} returns `["S", "e", "t", "a", "n", "t", "a"]`{.setanta}.
