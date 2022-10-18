---
title: "99a: Inheritance Example"
date: 2021-01-13T12:00:00-05:00
draft: false
---

A Square by inheriting from a Rectangle:
> A Square is just a rectangle with the additional constraint that the 
> width and height are identical.

```cpp
class Rectangle{
public:
    Rectangle(int w, int h) : width{w}, height{h} {}
    int  get_width()  const;
    int  get_height() const;
    int  get_area()   const;
    void print()      const;
    void set_width(int w);
    void set_height(int w);

private:
    int width;
    int height;
};
```

---

```cpp
class Rectangle{
public:
    Rectangle(int w, int h) : width{w}, height{h} {}
    int  get_width()  const;
    int  get_height() const;
    int  get_area()   const;
    void print()      const;
    void set_width(int w);
    void set_height(int w);

private:
    int width;
    int height;
};

class Square : public Rectangle{
public:
    Square(int s) : Rectangle{s, s} {}
};
```

.green[Simple!]  But, it leads to an issue.

---

```cpp
class Square : public Rectangle{
public:
    Square(int s) : Rectangle{s, s} {}
};
```

.green[Simple!]  But, it leads to an issue.

.left-column[
```cpp
Square s1{3}; // 3x3 square
s1.print();   // "w=3, h=3"
s1.set_width(4);
s1.print();   // "w=4, h=3" ERROR
```
]

.right-column[.small[
We inherited by `public` from `Rectangle`, so we can use any `Rectangle` method.

Bad news - this lets us make a .red[mistake] by setting width/height _independently_.
]]

How can we fix this problem?



---

What if we define a "safe" way to set the side length?

```cpp
class Square : public Rectangle{
public:
    Square(int s) : Rectangle{s, s} {}
    void set_side_length(int s) {
        set_width(s); 
        set_height(s); 
    }
};
```


```cpp
Square s1{3}; // 3x3 square
s1.print();   // "w=3, h=3"
s1.set_side_length(4)
s1.print();   // "w=4, h=4" Better...
```

---

What if we define a "safe" way to set the side length?

```cpp
class Square : public Rectangle{
public:
    Square(int s) : Rectangle{s, s} {}
    void set_side_length(int s) {
        set_width(s); 
        set_height(s); 
    }
};
```


```cpp
Square s1{3}; // 3x3 square
s1.print();   // "w=3, h=3"
s1.set_side_length(4)
s1.print();   // "w=4, h=4" Better...
*s1.set_width(5);
*s1.print();   // "w=5, h=4" ERROR STILL!
```

The new method .green[allows us] to do the right thing, but it does not .red[prevent us] from doing the wrong thing.  We can do better...

---

What if we redefine the behavior of the `set` methods for width/height?

```cpp
class Square : public Rectangle{
public:
    Square(int s) : Rectangle{s, s} {}
    void set_side_length(int s);  // sets both width and height
    void set_width(int w)  { set_side_length(w); }
    void set_height(int h) { set_side_length(h); }
};
```


```cpp
Square s1{3}; // 3x3 square
s1.print();   // "w=3, h=3"
s1.set_side_length(4)
s1.print();   // "w=4, h=4" Better...
*s1.set_width(5);
*s1.print();   // "w=5, h=5" FIXED!
```

Now, we are .blue[able] to interact with the object in any way we expect, but it will .green[always do the "right" thing].  It prevents us from ending up in an inconsistent state.

---

```cpp
class Square : public Rectangle{
public:
    Square(int s) : Rectangle{s, s} {}
    void set_side_length(int s);  // sets both width and height
    void set_width(int w)  { set_side_length(w); }
    void set_height(int h) { set_side_length(h); }
};
```

What are the benefits / problems of this solution?

What about _aggregation_?

What about `protected` inheritance?

---

What about `protected` inheritance?

```cpp
class Square : protected Rectangle{
public:
    Square(int s) : Rectangle{s, s} {}
*   int  get_side_length() const { return get_width(); }
*   int  get_area()        const { return Rectangle::get_area(); }
*   void print()           const { Rectangle::print(); }
    void set_side_length(int s) { 
        set_width(s); 
        set_height(s); 
    }
};
```

Forces us to redefine any methods we want in our public interface...

But if the overlap isn't too large, that might not be too many.

Also, the redefined methods are mostly simple "_pass-through_" methods.

---

```cpp
class Square : protected Rectangle{
public:
    Square(int s) : Rectangle{s, s} {}
    int  get_side_length() const;
    int  get_area()        const;
    void print()           const;
    void set_side_length(int s);
};
```

Are there any remaining problems?

--

Maybe `print()` needs to be customized:

```cpp
void Square::print() const{
    cout << "s=" << get_side_length();
}
```

--

.blue[There might still be a monster lurking in the bushes...  

But we'll see more about that soon...]
