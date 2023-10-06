---
title: "Want to handle the unexpected in Python? TRY this. (EXCEPT don’t abuse it)"
description: "A basic introduction to exception handling in Python."
pubDate: "Jan 21 2020"
heroImage: "/blog/angry_code.webp"
tags: ["python","beginner", "exception-handling", "try-statement"]
---

Errors. To us programming beginners, they may as well be as certain as death and taxes. One tiny misstep and everything falls apart. Nor only do we have our own mistakes to deal with, things can go bust when input from external factors takes an unpredictable turn.

While the frustration invoked from a misspelled variable name can be quite the buzzkill, consider the alternative. That annoying pain of having your hard work hung up on an error may be as essential to the wellbeing of the digital as the sensation of pain is to the survival of the living: an unpleasant yet healthy indication that something isn’t right.

However, do we humans succumb completely ceasing all movement to every single instance of discomfort that we encounter? Well, your Python code doesn’t have to either. Enter the **_try_** statement.

The **_try statement_** is very useful in situations when you need to customize exactly what happens when you encounter an error. Disclaimer: it is no replacement for carefully constructed code. It simply presents a means of invoking a specific error without consequence; being able to meticulously map out contingencies/warnings all without interrupting execution.

So how does one actually start writing these **_try statements_**? It’s easy!

## The basic rundown

The **_try statement_** has a syntax that is similar to that of an **_if statement_**. It begins with a block of code containing what to **_try_**, followed by an **_except_** block that contains what to run instead if it produced an error.

```python
def a_simple_try_statement():
    try:
        # Insert code that you would like to test.
    except:
        # Code here will run if the test results in an error.
```

Furthermore you can choose to be explicit and single out specific errors when they are indicated on the **_except_** line. You can include as many **_exception statements_** as you like specifying different code to run with each scenario. Like the **_elif_** **_statement_** only the first instance of the **_exception_** that meets the criteria will be run.

However keep in mind that **you cannot link these together/make more complex statements with logical operators**.

The following is an example that shows the basic syntax of a **_try/except statement_** containing a little more complexity.

```python
def a_way_to_divide_things(thing1,thing2):
    try:
        output = thing1 / thing2
 # If the function receives incompatible variable types:
    except TypeError:
        print("You must include only ints or floats")
 # If the function tries to divide by zero:
    except ZeroDivisionError:
        print("The universe refuses to reveal its secrets")
# Now the code is prepared to handle multiple (but not infinite) possibilities.
```

With this, you can really fine tune your code to precisely handle errors since the Python library is able to distinguish among a multitude of **_exceptions_**. This is only scratching the surface and it is worth referencing [more comprehensive lists of the many options that you can choose from](https://www.tutorialsteacher.com/python/error-types-in-python).

## Variable scope and situations where you may need something ELSE

As you begin crafting your own try statements you may inadvertently break your code as you run into an unexpected error with an **_undefined variable_** after explicitly defining it in the **_try statement_**. While this runs a little counter to intuition, it’s easily prevented with the realization that successfully executed code in the **_try statement_** **will not create global variables**!

Variable scope can be a confusing topic and is one worth investigating further. Let’s just say that what runs successfully in one context might not necessarily in another:

```python
def dysfunctional(stuff, more_stuff):
    try:
        output = stuff / more_stuff
    except:
        print("Yea... this isn't going to work...")
        output = False
    print(output)
# If this wasn't contained in a function, this code will fall apart.
```

So what happens when you need give greater scope to that variable? Before you start crafting ways to sneak some if statements in there, consider his more nonchalant twin: the **else**. It fits right on as the last condition of the **_try/except_** statement… no ifs ands or buts:

```python
def functional(stuff, more_stuff):
    try:
        output = stuff / more_stuff
    except:
        print("Yea... this isn't going to work...")
        output = False
    # Runs if the code executed in the try statement successfully.
    else:
        output = stuff / more_stuff
    # Closes the try statement running regardless of its outcome.
    finally:
        print(output)
# If this code is run outside the function it still works!
```

That last statement also contained a code block preceded by a statement indicated by the word **_finally_**. It’s a way of explicitly ending the **try** statement and it will still execute whether an exception is raised or not.

## ↑FINALLY↓

Of course as with any new tool, the potential for bad habits is there and overuse can be very tempting. For example, during my first week of joining a data science bootcamp, I started to look to it too much as a catch-all solution. Shown here is a function that I wrote to determine the mode from a list of numbers before I really knew how to employ pandas to solve my statistical problems:

```python
# Iterates through unique numbers in a list counting their
# occurrences keeping track of the most frequent.
def mode(dataset):
    ordered = sorted(list(set(dataset)))
    for data in ordered:
        current_count = dataset.count(data)
        # Try-ing too hard to compensate for an empty variable
        # that breaks things during the first run of the for loop.
        try:
            count
        except:
            count = current_count
            the_mode = []
        if count < current_count:
            count = current_count
            the_mode = [data]
        elif count == current_count:
            the_mode.append(data)
        else:
            continue
        # Statement to address the possibility of no numbers
        # actually repeating.
        if ordered == the_mode:
            print(“There is no mode”)
            the_mode = None
    return the_mode
```

While the function does what it sets out to do, the problem is that you really **_don’t have_** to **_try_** anything. The variable “count” could have just as easily been initialized before the loop even began and the code would have been clearer and more concise.

```python
# Iterates through unique numbers in a list counting their
# occurrences keeping track of the most frequent.
def mode(dataset):  
    ordered = sorted(list(set(dataset)
    # Initializing the variable here reduces those 4 lines of code
    # into a single one.
    count=0
    for data in ordered:
        current_count = dataset.count(data)
        if count < current_count:
            count = current_count
            the_mode = [data]
        elif count == current_count:
            the_mode.append(data)
        else:
            continue
        # Statement to address the possibility of no numbers
        # actually repeating.
        if ordered == the_mode:
            print(“There is no mode”)
            the_mode = None
    return the_mode
```

Because **_try_** can easily prevent parts of your code from breaking, if you are not careful it will become a crutch stopping you from finding out the root causes of your exception woes.

The moral of the story, use **_try_** to control the uncontrollable; **_except_** always remember not make things more complicated than you have to!

<figure class="blog-image">
    <img
        alt="Frusterated cat in front of bad code that still works"
        src="/blog/angry_code.webp">
    <figcaption>
        Yes this code really does run! Image composed using <a href="https://krita.org/en/">Krita</a>, <a href="https://www.jetbrains.com/pycharm/">PyCharm</a>, and public domain sources.
    </figcaption>
</figure>
