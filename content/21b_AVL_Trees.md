---
title: "21b: Balancing Trees - AVL Trees"
date: 2020-10-02T12:30:16-05:00
draft: false
---

# AVL-Trees
## Drozdek Ch. 6.7

---

## Keep your Balance

An _AVL Tree_ is a tree where the height of the left and right subtrees always differ by at most one.

* Each node has an associated _balance factor_
    * `balance = height(right) - height(left)`

* The AVL property states that the balance factor at all nodes must be in the range $[-1,1]$.

---

## Balance

If the magnitude of any node's balance factor becomes $>1$, the tree must be balanced.

* 4 cases (but 2 are symmetrical):
    * "Heavy" on left subtree of left child.
    * "Heavy" on right subtree of left child.
    * "Heavy" on right subtree of right child.
    * "Heavy" on left subtree of right child.

---

## Fixing the Balance

When the balance factor rule is broken, we must correct the balance.  That can be done
by applying a transformation to the tree's shape called a .term[rotation].  The rotation
can be performed either in a clockwise (_right_) direction, or counter-clockwise 
(_left_) direction.

A single rotation will have the effect of shifting some of the "weight" from one side 
of the node about which we are rotating (we call this node the .term[pivot] node) to
the other.

---

### Rotations

**Rotate Left**

.center[![:scale Rotate Left - $Q$ is the pivot node., 70%](../images/avl_tree/tree_rotate_left.svg "Rotate Left - $Q$ is the pivot node.")]

**Rotate Right**    

* _Mirror image of above._

The single rotations only solve the problem when the tree is "heavy" along the "outside" of the subtree (heavy on left side of left child, or on right side of right child).

---

## Double-Rotations

If the tree is "heavy" in the "inside" of a subtree (either the right-side of a left child, or the left-side of a right child) then a double rotation is required:

* left-right
    * Just a left-rotate at the child, followed by a right-rotate at the original (pivot) node with the &plusmn;2 balance factor.

* right-left
    * Just a right-rotate at the child, followed by a left-rotate at the original (pivot) node with the &plusmn;2 balance factor.

---

## Visualizations

<https://www.cs.usfca.edu/~galles/visualization/AVLtree.html>


