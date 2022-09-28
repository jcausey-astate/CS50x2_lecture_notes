---
title: "12 Classes and Objects"
date: 2020-10-02T12:30:15-05:00
draft: false
---

# Classes and Objects

## Gaddis Ch. 13

---

## Introduction

* Procedural (structured) Programming
    - Concerned with processes (_actions_) that occur in a program.
    - Basic unit of modularity is the _function_.
* Object-Oriented Programming (OOP)
    - Focuses on the data (_things_) and the functions that operate on it.
    - Basic unit of modularity is the _class_ (or structure).

---

## OOP Central Concepts

* Encapsulation
    - Bundling
    - Data / Implementation Hiding
        + Principle of *least privilege*.
    - Public Interface

* Class Hierarchies (Inheritance)
    - Factoring out common data/behavior.
    - Standardizing a common (public) interface.

---

## OOP Terminology

_**Class**_ - basically like a _structure_.  Encapsulates data and functions that are related.

* The class is the _blueprint_ describing the new type of thing.

_**Object**_ - an instance of a class.

* The object is the real thing that is built by following the blueprint.

_**Attributes**_ - a class's _member data_

_**Methods**_ - a class's _member functions_

<span style="color: crimson;">We will use `class` and `struct` somewhat interchangeably.</span>

---

## Format of a Class

```cpp
class ClassName 
{
    declaration;
    declaration;
};
```

**Example**

```
struct Rectangle {  |   class Rectangle {
    double length;  |       public:
    double width;   |           double length;
    double area;    |           double width;
};                  |           double area();
                    |   };
```

---

## Access Specifiers

**`public`** - Available both inside and _outside_ the class definition.

**`private`** - Only available _inside_ the class definition.

**`protected`** - Similar to `private` (we'll see this later).

<br>

* Order doesn't matter.

* Default is `private` for `class`.  (Default is `public` for `struct`.)
  * This is the _only_ difference between `class` and `struct` in C++.

---

## Methods

* Prototype in _class declaration_
* Definition usually in separate _implementation file_.
    - May also be in same file.
* _Scope resolution operator_ ( `::` ) – used to establish ownership of an identifier
    - Must be used when splitting method definitions from the class declaration.
* Private methods – what good are they?

---

## Accessors and Mutators

* Provides a way to safely access data members.
* Principle of _least privilege_.
* Stale data (Avoid it!)
* Allows the class to disallow incorrect states.

---

## Constructors

* Allow an object to be _instantiated_ (created) in an already-working state.
    - Contrast this with the _uninitialized_ state that regular data and `struct`s begin with.
* Constructors _do not_ have any return type.
* Constructors have the same name as the class.
* _Default constructor_ is a constructor that takes no parameters; used to create a "default" or "blank" object.
* Constructors may take parameters to allow _initialization_ during instantiation.
* Classes do not always have a default constructor.
