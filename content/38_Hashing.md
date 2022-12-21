---
title: '38: Hashing'
subtitle: 'Drozdek, Ch. 10'
author: Jason L Causey
date:  2022-12-05
draft: false
---

## Hashing

## Drozdek, Chapter 10

---

## What is Hashing?

Searching often involves looking for a .term[key], which is a way of uniquely
identifying a record.

If the key is known, a .term[hash table] can be created using the value of the
key as the only indication of position.

Searching is then a $O(1)$ operation...

If you know the key, you can go _directly_ to the correct record in the table.

In practice, we can never perfectly achieve this, but we can get close.

---

## You may have seen this before.

If you have ever used _dictionaries_ in Python, you are familiar with the concept of looking up a _value_ in a collection by using a _key_ that is not restricted to being an integer.

Many languages have a concept of an _associative array_ - that is just another name for this same kind of collection.

In C++ we have the `std::map` and `std::multimap` STL containers that provide this kind of collection.

The generic term is a _key-value store_.  

.orange[Note that none of these container types necessarily implies the underlying implementation is a hash table, but they all allow the kind of access that a hash table is designed to optimize.]

---

## Terminology

The simplest possible example of a hash table is the C++ array.  The key
is the index into the array.

For any more complex data than non-negative integers, we must somehow
convert the non-integer key to a value we can use as an index.

We call a function that does this a .term[hash function].ref[1].
$$
h(k) \rightarrow i
$$

A hash function that perfectly transforms all different keys into
different numbers is called a .term[perfect hash function].

$$
h(k_n) \rightarrow i_n,  \;  \textrm{s.t.} \;  i_n \neq i_m \; \forall \; n \neq m
$$



.footnote[
.ref[1]:  The term _hash function_ is also used to describe the family of _cryptographic hash functions_, whose job is to provide a unique but unpredictable one-way mapping from an input data blob to an output signature representation.  Cryptographic hash functions are different from the hash functions described here, and have very different operating characteristics.
]

---

## Terminology

So, a hash table must be large enough to accommodate all unique keys to be
stored...

Ideally, a function must be found that will convert all possible
unique keys to unique table indices.

--

.red[This is often difficult to achieve.]

--

An .term[imperfect hash function] is one that produces the same number for two
or more different keys.

Two keys that hash to the same value result in a .term[collision].

---

## Example

Hash strings by adding up the integer (ASCII) values of each character
in the string.

"abc" would hash to 294  (97 + 98 + 99)  
$$h( \textnormal{ abc } ) \; \rightarrow \; 294$$

---

## Example

Hash strings by adding up the integer (ASCII) values of each character
in the string.

"abc" would hash to 294  (97 + 98 + 99)
$$h( \textnormal{ abc } ) \; \rightarrow \; 294$$

.red[Problem:  So would "cba" or "bac" or "bca" or "acb" or "cab"!]

---

## Example

Hash strings by adding up the integer (ASCII) values of each character
in the string.

"abc" would hash to 294  (97 + 98 + 99)
$$h( \textnormal{ abc } ) \; \rightarrow \; 294$$

.red[Problem:  So would "cba" or "bac" or "bca" or "acb" or "cab"!]

A good hash function must try to avoid collisions, while still being as
efficient as possible.

.green[For the lookup to be fast, the hash function must be fast!].ref[1]

.footnote[
.ref[1]: This is a sharp contrast to cryptographic hash functions, where speed is _not_ always a desirable feature.
]

---

## How Many Hash Functions Are There?

To assign positions to $n$ items in a table of $m$ positions (with $n \leq m$),
there are $m^n$ possible hash functions.

The number of perfect hash functions is $\frac{m!}{(m-n)!}$.  This is the number of placements of the items in the table.

For 50 elements in a 100-element table,  there are $100^{50}$ = $10^{100}$ hash
functions, of which only $10^{94}$ are perfect.

Sounds like it would be easy to find one... right?

---

## Types of Hash Functions $h(K)$ : Division

A hash function must guarantee that the number it returns is a _valid index_ to one of the table cells.

If $K$ (the key) is a number, modulo division can be used: $$h(K) = K \bmod {TSize}$$
This works best with a prime number as ${TSize}$

If ${TSize}$  is not prime, you can try $$h(K) = (K \bmod p) \bmod {TSize}$$ for some
prime number $p > {TSize}$.

This method is a good fall-back method if very little is known about the
keys.

Can work for non-numeric keys if a simple way exists to produce a unique
numeric representation of the key.

---

## Types of Hash Functions $h(K)$ : Folding

Key is divided into parts, then the parts are combined (or folded)
together.

Two types of folding:  .term[shift folding] and .term[boundary folding]

.small-90[.example[
**Example:**  SSN   `123-45-6789`

You could split into 123, 456, 789 and add them (1368), then mod by
${TSize}$.

This is shift-folding
]]
.small-90[.example[
You could take the same 3 parts: 123, 456, 789, and reverse every other
part:  123, 654, 789.  Then add (1566), and mod by ${TSize}$.  

This is boundary-folding.
]]
Folding is fast (especially in binary).  Shift-folding is just an `XOR`.

---

## Types of Hash Functions $h(K)$ : Mid-Square

Key is squared and the middle part is used as the hash value.

If the key is non-numeric, you first must produce a number...

.example[
**Example:**  3121.  $3121^{2} = 9740641$.  The middle part (406) could be used
as the index into a hash table of 1000 elements.
]

In practice, powers of 2 are used for table size, and the middle part of
the binary representation is chosen as the hash index.

.center[
$3121^2$ in binary: 
.tt[
.orange[1001010].blue[0101000010].orange[1100001]

.blue[0101000010] = 322]
]

---

## Types of Hash Functions $h(K)$ : Extraction

One part of the key is chosen to represent the address.

Again, this assumes a numeric key (or the ability to make it numeric).

.example[
**Example:**  SSN  `123-45-6789`   You might choose the first 4 digits: 1234
as the address, or maybe the first two and last two:  1289
]

You need some knowledge of the keys to do this well... the part you leave
out should convey little unique information.

---

## Types of Hash Functions $h(K)$ : Radix Transformation

Simply change the key (numeric) from its own numeric base to a different
one.

.example[
**Example:**  345 in base 9 is 423... Then you can mod by ${TSize}$ if necessary.
]

This may not really help avoid collisions...  it just changes the problem.

.example[
**Example:**  345 and 264 converted to nonal (base 9) are 423 and 323,
respectively.  In a table with 100 items, the addresses (mod 100) would
both be 23 (.red[collision])!
]

---

## Types of Hash Functions $h(K)$ : Universal Hash Functions

When very little is known about keys, a universal class of hash functions can be used. 

A class of functions is universal when for any sample, a randomly chosen member of that class will be expected to distribute the sample evenly with a low probability of collision .ref[1].

$H$ is universal if no pair of distinct keys are mapped onto the same index by a randomly chosen function $h$ with probability $\frac{1}{TSize}$.

.example[
**Example:**  For a prime $p \geq |keys|$ and random $a$ and $b$:

.small-80[
$$
H=\lbrace h\_{a, b}(K): h\_{a, b}(K)=((a K+b) \bmod p) \bmod {TSize} \textrm{ and }  0 \leq a, b<p \rbrace
$$
]]

.footnote[.ref[1]: Carter and Wegman, 1979]

---

## Hash Table Size

A larger hash table can reduce the number of collisions...

But only if your hash function produces unique-enough addresses to take
advantage of the increase in table size.

.example[
**Example:**  If you are hashing based on the ASCII value of the first
letter of a string, the value will be in the integer range $[0,127]$.

Making a hash table larger than 128 would just waste space.
]

---

## Handling Collisions

In many cases, a perfect hash function cannot be found, or is
impractical (too difficult or too computationally complex).

.green[Some method of dealing with collisions must be found.]

---

## Handling Collisions : Open Addressing

If the address returned by the hash function is in use, probe other
addresses until an empty one is found.

Sequence is $norm(h(K) + p(1))$, $norm(h(K) + p(2))$

$norm$ is a normalization (most likely $\bmod {TSize}$)

$p(n)$ is the probing function, which could just be the series of counting
numbers $\lbrace1,2, \dots, n\rbrace$; this is called .term[linear probing].

.highlight-red[Linear probing tends to produce clusters in the table.]

---

### Open Addressing (continued)

Polynomial probing can be used instead...

Careful planning is necessary for table size, and probing function.

.highlight-red["Secondary clustering" can result.]

---

## Handling Collisions : Random probing

$p(n) = c \bmod {TSize}$ where $c$ is a random integer, $0 \leq c \leq \infty$

.small[In C: .highlight-grey[`rand() % TSize`].  You can do this in C++, but there are better generators .ref[1].]

Be sure you can find your key again!

(Hint: You need to make clever use of `srand()` or similar ways to seed the generator.)

.footnote[
.ref[1]: See <https://en.cppreference.com/w/cpp/header/random>
]

---

## Handling Collisions : Double hashing

Uses two hash functions, $h$ for primary location and $h_p$ to resolve conflicts.  Sequence:

$$
h(K), h(K) + h_p(K),\dots,h(K)+ i\cdot h_p(K),\dots
$$

Requires you to find not one but _two_ hash functions.

Both need to be fast.   Second may be a function of the first, e.g. $h_p(K) = i\cdot h(K) + 1$.

If the second hash function is chosen well, it will generally eliminate
secondary clustering.

---

## Handling Collisions : Chaining

Each table entry is actually a linked list of the keys that hash to that
address.

.blue[This type of table cannot overflow.]

A collision (on insert) just results in a new key being added to the
list at _address_.

Lots of collisions (long lists) can seriously degrade performance.

* Ordering the lists can help...

Requires additional space for pointers

.small[_You can take this further and use any secondary collection instead of the list; keep storage overhead in mind._]

---

## Handling Collisions : Coalesced Hashing

A version of chaining where each table entry has a storage location for
the address of the "next" element in the collision list.

Items are inserted using probing, but the address of where it ends up is
stored in the "link" field of the last full table entry examined.

.small-80[
* Usually, the item is stored in the last available empty space in the table; the "next" elements effectively form a list in which all colliding elements reside.
]

Alternatively, you can use a "cellar" (additional space) to store the
overflow.
.small-80[
* This can be dynamically allocated... or not.  It is often just "extra allocation" beyond the maximum value of the table's published size ($TSize$).
* If the cellar overflows, you are back to regular coalesced hashing (it goes back into the "normal" table).
]

---

## Handling Collisions : Bucket Addressing

Each table entry has storage space for multiple items (a bucket of
items).

Colliding hashes are stored at the same address, as long as an empty
bucket is available.

If a bucket is full, either open addressing or chaining (or some other
overflow management method) must be used to allow more elements to be
added...

---

## Hash Table Deletion

Simply remove the data – unless there was a collision...

.red[In open addressing, deleting may break the pattern of probes...]

You could leave a marker indicating that an element in position $i$ with
key $K$ has been deleted, but that probing for other keys should continue.

* Inserting new keys would overwrite a space-filler entry if possible.
* Table can become overloaded with "deleted entry" markers, making 
    searches take longer than desired.
    * To avoid this, occasionally shift existing elements "up" the table to
fill the deleted locations.  (The book calls this "purging" the table of
deletion markers.)

---

## Perfect Hash Functions

Unless the set of possible keys is known in advance, it is usually not
possible to find a perfect hash function...

However, if the keys are known, a perfect hash function can be computed.

.example[
**Example:**  A lookup table for the reserved words for a programming
language.
]

A perfect hash function that also requires only as many cells in the
table as the number of data items is called a .term[minimal perfect hash].

---

## Perfect Hash Functions

Minimal perfect hash functions avoid both wasted time (for collision
resolution) and space (for empty table cells).

Algorithms for choosing perfect hash functions are usually tedious.

For 50 elements in a 100 element table, only 1 in a million of the
possible hash functions are perfect.

---

## Perfect Hash Functions : Cichelli’s Method

Designed for hashing a relatively small number of reserved words:

```text
h(word) = (length(word) 
            + g(firstletter(word))
            + g(lastletter(word))
          ) mod Tsize
```

Where $g$ is the function to be constructed.

$g$ assigns values to letters so that the resulting hash function returns
a unique hash for all words in a predefined language (set of words).

The values assigned by $g$ to specific letters do not have to be unique.

Cichelli’s Algorithm is given in the book on pg. 539-540.

---

## Perfect Hash Functions : FHCD Algorithm

An extension of Cichilli’s Algorithm.

Hash is of the form

```text
h(word) = (h0(word) 
            + g(h1(word))
            + g(h2(word))
          ) mod Tsize
```

Produces a table of g-values that must be stored in memory during
operation (to make hashing efficient).

See section 10.4.2 in the textbook.

---

## Extendable Hashing

If the size of the hash table may change, additional complexity is added
to the hashing algorithms.

See the book pgs. 571-573.
