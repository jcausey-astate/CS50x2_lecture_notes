---
title: "16 Class Template"
date: 2020-10-02T12:30:16-05:00
draft: false
---

# Templates, Stacks, and Queues

## Gaddis Ch. 16, 19

---

## Function Templates

Function templates provide a pattern for a function that can work with many types of data.

* When written, the data type specifiers are replaced with type parameters.
* When called, the compiler generates a function with actual data types that match those provided in the call.

**Example**

```cpp
template<typename Numeric>
Numeric times10(Numeric num){
     return 10 * num;
}
```

`Numeric` is the _type parameter_ (it can be any valid identifier, but is usually capitalized (`UpperCamelCase` or sometimes `ALL_CAPS`) by convention.

<small><i><b>Tip</b>:  Write the function for a normal data type first, then convert to a function template!</i></small>

---

## Function Template Notes

* Multiple type parameters can be used.
* Function templates can be overloaded (as long as each overload has a unique signature).
* All type parameters specified in template prefix must be used in the definition.

---

## Function Template Notes
* A function template is just a pattern:  No actual code is generated until the function is called.
    - A function template uses no memory.
* When passing objects to a function template, the object must be able to _behave_ in the way expected by the function.
    - If the function is expecting a number, your object must be able to _behave_ like a number.

---

## Class Templates

C++ _class templates_ are used to create _generic classes_ and _abstract data types_.

* Often used for "container types".
    - Allows writing a container once, re-using it for many types.
* Type arguments are provided when an object of the class template type is created.

---

**Example**
```cpp
template<typename GradeType>
class Grade{
    public:
        Grade(const GradeType&);
        void      setGrade(const GradeType&);
        GradeType getGrade() const;
    private:
        GradeType  grade;
};
```

---

**Example (implementation)**
```cpp
template<typename GradeType>
Grade<GradeType>::Grade(const GradeType& newgrade) {
    grade = newgrade;
}
template<typename GradeType>
void Grade<GradeType>::setGrade(const GradeType& newgrade) {
    grade = newgrade;
}
template<typename GradeType>
GradeType Grade<GradeType>::getGrade() const {
    return grade;
}
```


---

## Class Template Notes

* All references to the class as a type must include the type argument list.
    - When declaring/instantiating objects
    - Whenever scope resolution is required.

---

## Examples

* Linked List node as a template
* Array template
* Stack template
* Queue template
* Ring buffer template
