---
title: "23: Linked Lists"
date: 2020-10-02T12:30:15-05:00
draft: false
---

# Linked Lists

## Gaddis Ch. 18
## Drozdek Ch. 3

---

## The Linked List ADT
* **_Linked list_**: set of data structures (_nodes_) that contain references to other data structures
    - Relationship is linear:  Each node references the next node (and sometimes the previous node).
* References may be addresses (pointers) or array indices
* Nodes can be located anywhere in memory.
* Data can be added/removed during execution.

.center[![:scale Linked List, 80%](../images/LinkedList/LinkedList.svg)]

---

## Singly-Linked Lists

* Can grow or shrink as needed (unlike arrays).

.center[![:scale Adding at the end of a linked list., 80%](../images/LinkedList/LinkedList_add_end.svg)]

* Can insert data between other nodes easily.

.center[![:scale Adding in the middle of a linked list., 50%](../images/LinkedList/LinkedList_add_mid.svg)]

---

### What is a “Node”?

* Contains some sort of data.
* Contains a reference (pointer or array index) to the “next” node in the list.

.center[![:scale Linked list node., 50%](../images/LinkedList/LinkedList_node.svg)]

---

### Lists are Made of Nodes

* Linked lists contain 0 or more nodes.
* Must have an “entry point” to the list.  We call it the list “head”.
* The end of the list usually points to `nullptr`.
* A list containing 0 nodes is an _empty list_.

.center[![:scale Empty linked list., 20%](../images/LinkedList/LinkedList_empty.svg)]

---

### Basic Operations

* Add node at the front (head) of the list.
* Add node at the end (tail) of the list.
* Add a node in-order in a sorted list.
* Traverse the linked list.
* Search the list.
* Delete a node (from head/tail/arbitrary).
* Empty the list.

---

### The `tail` pointer

To add at the end of the list (where the list only has a `head` pointer), we have to traverse the entire list to find the last element...   $O(N)$ steps.

If we could jump directly to the end, it would become $O(1)$...  

We can!  Just add one more pointer to the _List_:  We call it a `tail` pointer, and it always points to the final element in the list:


.center[![:scale Linked List, 80%](../images/LinkedList/LinkedListWithTail.svg)]

---

### Complexity of common operations in Singly-Linked lists

* Add node at the front (head) of the list:  $O(1)$
* Add node at the end (tail) of the list:  $O(N)$
  * ... with a tail pointer:  $O(1)$
* Add a node in-order in a sorted list:  $O(N)$
* Traverse the linked list:  $O(N)$
* Search the list:  $O(N)$
* Delete a node from head:  $O(1)$
* Delete a node from tail:  $O(N)$
  * ... with a tail pointer:   **Still $O(N)$**
* Delete a node by searching for it: $O(N)$
* Empty the list:  $O(N)$

---

## Doubly-Linked Lists

A _doubly-linked list_ is a linked list in which the _nodes_ support access to both the _next_ and _previous_ items in the list, allowing bidirectional traversal.


.center[![:scale Doubly-Linked List, 80%](../images/LinkedList/Doubly-Linked_List.svg)]

---

### A Doubly-Linked Node

```cpp
class DL_IntNode{
    private:
        int data;
        DL_IntNode* prev = nullptr;   // NEW
        DL_IntNode* next = nullptr;
    public:
        // [...] Public interface same as singly-linked list.
};
```

A doubly-linked list's _node_ is different only in that it maintains one extra link &mdash; in this case, a pointer `prev` to the previous node.

<br>

.center[![:scale Doubly-Linked Node, 50%](../images/LinkedList/Doubly-Linked_Node.svg)]

---

### Considerations for List Operations

Because the list is linked in two directions, list operations are affected in that they must maintain the correct links:

* add to list
    - at front
    - at back
* remove from list
    - at front
    - at back
* clear / destroy the list

Additionally, new _traversals_ are possible (traversing the list in reverse, for example).

---

### Advantages and Drawbacks

* Advantages
    - Reverse traversal is possible
    - Remove at tail becomes $O(1)$
* Drawbacks
    - Added complexity of list maintenance code
    - Storage requirements
        + _compare cost of adding a pointer `prev` in the **node** <br /> versus adding a pointer `tail` in the **list**_

