---
title: "07b2 Supplement 1: `get`, `getline`, and Formatted Output"
date: 2021-01-13T12:00:00-05:00
draft: false
---

# Formatted Output,<br>`getline()`, `<cmath>`

## Gaddis Ch. 2, 3 Supplement

---

### Formatted Output

The `<iomanip>` library supplies a set of _stream manipulators_ that may be used in conjunction with the stream insertion operator to format output.  
<pre style='font-size: .85em'>
Manipulator            Description
-----------------------------------------------------------
std::setw( w )         set the width of the next item in the
                       stream to 'w'
std::setprecision( p ) set number of significant figures in 
                       output to 'p', or set the number of 
                       decimal places to 'p' if used in 
                       conjunction with 'fixed'.
std::fixed             set numeric output to fixed-point 
                       mode (use the number of decimal 
                       places specified by 'setprecision'; 
                       no scientific notation)
std::showpoint         always show the decimal point 
std::left              set alignment to left-aligned
std::right             set alignment to right-aligned
</pre>

---

### Example

``` cpp
double price = 100.0 / 3.0;  // 33.3333333...
std::cout << std::setprecision(2) << std::fixed;
std::cout << "Total price: $" 
          << std::setw(8) << price << "\n";
std::cout << "100 items:   $" 
          << std::setw(8) << 100 * price << "\n";
```
Output:
<pre>
Total price: $   33.33
100 items:   $ 3333.33
</pre>

---

## `getline()`

In order to read a `std::string` that may contain whitespace from an input stream, the `getline()` function should be used:

``` cpp
std::string full_name;

std::cout << "Enter your first and last name: ";
getline(std::cin, full_name);

std::cout << "Hello, " << full_name << "!\n";
```

`getline()` will read an entire line of user input (until the `<ENTER>` key is pressed).  The _syntax_ is: <br />
<tt>getline( <i>source_stream</i> , <i>destination_string</i> )</tt> <br />

<small>Where _`source stream`_ is any input stream and _`destination string`_ is a variable of type `std::string`.</small>

---

### Mixing `getline()` and `>>`

**Problem:** Stream extraction ( `>>` ) leaves the delimiting whitespace in the input stream (usually a `'\n'`).

* `getline()` is _newline-delimited_ by default.  
    - It will appear that the `getline()` was "skipped".  Actually, it saw the `'\n'` and stopped.
* To remove the `'\n'`, use: <br /> _`stream_name`_`.ignore()`
    - Ex:  `std::cin.ignore();`
    - Better:<small style="font-size: 87%;">
 ``` cpp
 std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
 ```
</small>

---

## `cin.get()`

The `cin.get()` function can be used to read a single character, which may be whitespace, from the standard input stream.

**Example**
``` cpp
char ch;
// Reading the <ENTER> key with `>>` alone is difficult... 
// So, use `get()`:
std::cout << "Press <ENTER> to continue...";
std::cin.get(ch); // Will wait for the enter key, then continue.
```

The `get()` function also works with other streams, in general the syntax is: <br />
_`stream`_`.get(`*`character_var`*`)`


---

## In case the stream goes bad...

If you are working with an open stream, several things can cause the stream to no longer be in the "good" state.  The most common are:

* Failure of stream extraction operator to convert the apparent type it "sees" to the type requested on its right-hand side.
* End-of-file (or end of stream) encountered during a "read" operation.

In these cases you may be able to remedy the problem -- perhaps by removing unwanted characters from the stream with `ignore()`, or by moving the stream position "earlier" in the stream in case of EOF -- then resume operation.  The `clear()` method will help with this by clearing the stream's _state flags_:

``` cpp
std::cin.clear();  // clears the state flags on `cin`
```
