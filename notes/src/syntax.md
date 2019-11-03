# Language Syntax

## Non Technical terms

As the domain of the language is education, the syntax should be as accessible as possible. The fact that we are not tied to the English language allows us to release ourselves from historical terms for different elements of the language, there is no longer a *traditional* term for anything we are doing, other than the english literal translations of the usual terms. 

This means that we can use more accessible, non-technical terms to describe elements of our language. For example the word *gníomh* can be used in place of the term function, *gníomh* directly translates to an "action". Instead of referring to a single file as a "program" or "script" we can refer to it as a "story" (*scéal*) etc. Programming terms have a tendency to be very technical, leaving them cryptic for beginners, for example String, Floating point. These mean nothing to a beginner, we have no need for these terms in this language.

## Syntax family

This language will base many of it's syntactic features from the family of languages with C-style syntax. However, many of it's syntactic features will be derived from the linguistic structure of the Irish language itself.

### Example
Below is an example script in the language. We create a class for a person (*Duine*), then a class for a man (*Fear*) that inherits from *Duine*.

*Fear* has a constructor that takes a name (*ainm*) and defines an action (*gníomh*) called *abair* (speak) that prints a string containing the name.

*Duine* defines a function *siúl* (walk) that takes in an argument *céimeanna* (steps) and loops from 0 to *céimeanna*, printing the string "*Ag siúl*" (walking) each time.

```
Duine {
    gníomh siúl(céimeanna) {
        le céim idir (0, céimeanna) déan {
            scríobh("Ag siúl")
        }
    }
}

Fear ó Duine {
    nua (ainm) {
        [ainm seo] := ainm
    }

    gníomh abair() {
        scríobh(ainm + " is ainm dom agus is fearr mé")
    }
}

sean = Fear("Sean")
[abair sean]()
```
