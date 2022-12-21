---
title: "20: Aggregation"
date: 2020-10-02T12:30:15-05:00
draft: false
---

# Aggregation of Objects

## Gaddis Ch. 14.7

---

## Aggregation

* _Aggregation_: an object of one class is used as an attribute in another class
* Often called **_composition_**
* Creates the _**"has a"** relationship_.

Large book example in Chapter 14

    Instructor
    Textbook
    Course

---

### Example

```cpp
class Tool{
    public:
        [...] // interface not shown for brevity
    private:
        std::string name;
        double      weight;
};

class ToolBox{
    public:
        [...] // interface not shown for brevity
    private:
        Tool inventory[1024]; // aggregation of "Tool" objects
};
```