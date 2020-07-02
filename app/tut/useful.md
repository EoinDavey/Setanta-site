---
title: Some Useful Actions
next: game-time
next-text: Game Time!
prev: action
prev-text: Time for Action
---

# Maths Tips

Before we move onto [[more complex|níos casta]] *Setanta* [[features|gnéithe]], let's look at some [[useful|úsáideach]] actions and [[operators|oibritheoirí]] that we can use with what we already know.

We saw early in the tutorial that *Setanta* supports addition, multiplication, subtraction and division (using `+`, `*`, `-` and `/`). *Setanta* supports more useful operators and actions to make calculations easier!

## More Operators

*Setanta* has 2 more operators that we haven't seen yet. They are the "modulo" [[operator|oibritheoir]] (`%`), and the integer division operator (`//`).

### Modulo

The modulo operator (%) is an operator you might not be familiar with, but it's extremely useful.

The modulo operator takes two numbers, and returns the [[remainder|fuílleach]] when one is [[divided|roinnte]] by the other.

e.g. `7 % 2`{.setanta} is equal to 1, because 7 has remainder 1 when divided by 2. `11 % 4` has remainder 3, because 11 has remainder 3 when divided by 4.

This operator is extremely useful because it allows us to check lots of things. [[For example|Mar shampla]], we can check if a number is [[odd|corr]] or [[even|réidh]] by checking if has remainder 1 or 0 when divided by 2. Try it out here!

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

We can use this to check if a number is [[prime|príomha]]! A prime number will have exactly 2 [[divisors|roinnteoirí]].

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

The integer division operator (`//`) is just like the division operator, except it rounds down after dividing, so you always get a [[whole number|slánuimhir]].

Try it out here:

{{{
scríobh(5 / 2)
scríobh(5 // 2)
}}}

## Maths actions

[[Earlier|Níos luaithe]] in the tutorial we got lots of use out of `rand@mata`{.setanta} and `randUimh@mata`{.setanta} to get [[random|randamach]] numbers. However, those are not the only maths actions we have.

Here is a quick [[list|liosta]] of actions and [[values|luachanna]] you can access: Don't worry if you don't know what some of the actions do. They're [[available|ar fáil]] for anyone who needs them.

### Values

| Name | Description | Example |
|:------|:-----:|----:|
| `pí` | Pi [[constant|tairiseach]] (3.1415...) | `pi@mata`{.setanta} |
| `e` | e constant (2.71828..) | `e@mata`{.setanta} |

### Actions

| Name | Description | Example |
|:------|:-----:|----:|
| `fréamh` | Square [[root|fréamh]] | `fréamh@mata(4) == 2`{.setanta} |
| `cearn` | Square [[function|feidhm]] (`x * x`)  |  `cearn@mata(2) == 4`{.setanta} |
| `dearbh` | Absolute value | `abs@mata(-2) == 2`{.setanta} |
| `eas` | Exponential (`e^x`) | `eas@mata(1) == e@mata`{.setanta} |
| `cmhcht` | [[Power|cumhacht]] (`x^y`) | `cmhcht@mata(2, 4) == 16`{.setanta} |
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

The only operations and actions we've seen so far with [[text|téacs]] have been using `+` to add two pieces
of text together, using `fad`{.setanta} to get the [[length|fad]] of the text, and using [[square brackets|lúibíní cearnacha]]
(`[ ]`) to access ([[index|innéacs]]) specific letters.

There is much more we can do with text though! Let's look at some useful actions.

## go_téacs / To Text

Use `go_téacs` to [[convert|athraigh]] any [[value|luach]] to a text representation. "[[go téacs|to text]]" translates as "to text".

For example `go_téacs([1, 2, 3]) == "[1, 2, 3]"`{.setanta} and `go_téacs(scríobh) == "< gníomh
scríobh >"`{.setanta}

## Athchuir / Replace

[[Athchuir|Replace]] translates as "replace". You can use the `athchuir` action to replace parts of text with
another piece of text. For example you could replace every [[sad|brónach]] face (":(") in a piece of text with a [[happy|sona]] face (":)").

If you remember how we had to use the `@` [[symbol|siombail]] to use `fad`{.setanta} to get the length of the
text (`fad@"hey" == 3`{.setanta}), we also have to use the `@` symbol to use `athchuir`.

Check out some [[examples|samplaí]]:

{{{
our_text := "Hello :("
>-- Replace each ":(" in `our_text` with ":)"
scríobh(athchuir@our_text(":(", ":)"))

>-- Replace the "Hello" with "Goodbye"
scríobh(athchuir@our_text("Hello", "Goodbye"))
}}}

## Roinn / Split

"[[Roinn|Split]]" means "split" or "divide". We can use the `roinn` action to split up a [[piece|píosa]] of text at
[[certain points|pointí áirithe]]. For example we could use `roinn` with [[commas|camóga]] to divide up a comma separated list like `"Setanta,
is, fun"`{.setanta} into the list `["Setanta", "is", "fun"]`{.setanta}. Or we could use `roinn` with
spaces to separate a sentence into a list of [[words|focail]].

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

## Cuid / Part

"[[Cuid|Part]]" means "part" or "piece", and the `cuid` action allows us to [[extract|bain as]] a
piece of text. We give the action 2 [[positions|áiteanna]] as [[arguments|argóintí]], and it returns
the text [[between|idir]] those 2 positions (not including the second).

e.g. `cuid@"hello"(1, 4)`{.setanta} returns `"ell"`{.setanta} because the text between index 1 and
index 4 is `"ell"`{.setanta}

## go_liosta/ To List

`go_liosta` (meaning "to list") is an action that returns a list of the [[characters|carachtair]]
of the text.

e.g. `go_liosta("Setanta")`{.setanta} returns `["S", "e", "t", "a", "n", "t", "a"]`{.setanta}.

# List Tips

Lists share many of the same actions as text including `fad` and `cuid`. But they also have the
following actions available.

## Sórtáil / Sort

"[[Sórtaíl|Sort]]" translates as "sort", the `sórtáil` action sorts a list into
[[increasing|méadaitheach]] order.

For example: `sórtáil@[1, 3, 2]`{.setanta} returns `[1, 2, 3]`{.setanta}.

**_NB: Sorting is done in place. i.e. the list will be changed when `sórtáil` is called_**

## Nasc / Join

"[[Nasc|Join]]" translates as "join". The `nasc` action can be used to turn a list into text,
joining the [[elements|baill]] together with some piece of text. This text is passed in as an argument.

For example: `nasc@[1, 2, 3](", ")`{.setanta} returns `"1, 2, 3"`{.setanta}

# The Docs

If you need to [[look up|cuardach]] these actions and values, or want to see what else is available, you can find
the [[whole list|liosta iomlán]] on [docs.try-setanta.ie](https://docs.try-setanta.ie).
