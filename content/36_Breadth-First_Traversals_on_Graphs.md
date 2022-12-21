---
title: '36: Breadth-First Traversals on Graphs'
subtitle: 'Drozdek, Ch. 8'
author: Jason L Causey
date: 2022-11-13
draft: false
---

# Graphs: Breadth-First Traversals 

## Drozdek, Ch. 8.2

---

##  Breadth-First Traversals

We have discussed Depth-First traversals, where the traversal choose one path and "follows" it as far as possible before returning to try other paths.  

The .term[Breadth-First Traversal] instead focuses on visiting all neighboring vertices before proceeding to other vertices.  

In a tree-like structure, we could visualize this as working across each level of the tree before proceeding further "down" toward the leaves.  

In a graph, the idea is the same - work on all vertices you can discover at the same "level" (distance from the start) before moving further into the graph.

---

## Breadth-First traversals utilize a Queue

Whereas depth-first traversals made use of a _stack_ as the primary "bookkeeping" data structure to allow backtracking, breadth-first traversals will use a _queue_ to aid in prioritizing the ordering of vertex visits.  The general algorithm is:

```text
function breadthFirstSearch(graph G):
    let unseen := all vertices from G
    let edges := empty List {}
    let working := empty Queue {}
    for each vertex v in unseen do
        remove v from unseen
        enqueue v into working
        while working is not empty do
            v := dequeue from working
            for all vertices u adjacent to v in G do
                if u is in unseen
                    enqueue u into working
                    insert edge(vu) into edges
    return edges
```

.footnote[See also: Drozdek pg. 397]

---

### Breadth-First traversals: Example

.footnote[Drozdek Fig. 8.5]

.center[![](../images/graphs/fig_8.5a_undirected_graph.svg)]

We'll start traversing from (a).

---

### Breadth-First traversals: Example

.footnote[Drozdek Fig. 8.5]

.center[![](../images/graphs/fig_8.5b_undirected_graph_breadth-first_1.svg)]

We see the nodes with edges from (a) and queue them up...

---

### Breadth-First traversals: Example

.footnote[Drozdek Fig. 8.5]

.center[![](../images/graphs/fig_8.5b_undirected_graph_breadth-first_2.svg)]

From (e) we don't discover anything new; just mark it and continue.

---

### Breadth-First traversals: Example

.footnote[Drozdek Fig. 8.5]

.center[![](../images/graphs/fig_8.5b_undirected_graph_breadth-first_3.svg)]


From (f) we don't discover anything new; just mark it and continue.

---

### Breadth-First traversals: Example

.footnote[Drozdek Fig. 8.5]

.center[![](../images/graphs/fig_8.5b_undirected_graph_breadth-first_4.svg)]


From (g) we discover (b) and add it to the queue.

---

### Breadth-First traversals: Example

.footnote[Drozdek Fig. 8.5]

.center[![](../images/graphs/fig_8.5b_undirected_graph_breadth-first_5.svg)]


From (i) we don't discover anything new; just mark it and continue.

Notice that the edges (ef), (ei), (fi) will not be traversed at this point.

---

### Breadth-First traversals: Example

.footnote[Drozdek Fig. 8.5]

.center[![](../images/graphs/fig_8.5b_undirected_graph_breadth-first_6.svg)]


From (b) we don't discover anything new; just mark it and continue.

Now our queue is empty, but we have unvisited nodes, so we pick one ( **(c)** )
and continue.

---

### Breadth-First traversals: Example

.footnote[Drozdek Fig. 8.5]

.center[![](../images/graphs/fig_8.5b_undirected_graph_breadth-first_7.svg)]


From (b) we discover (h) and add it to the queue.

---

### Breadth-First traversals: Example

.footnote[Drozdek Fig. 8.5]

.center[![](../images/graphs/fig_8.5b_undirected_graph_breadth-first_8.svg)]


From (h) we discover (d) and add it to the queue.

---

### Breadth-First traversals: Example

.footnote[Drozdek Fig. 8.5]

.center[![](../images/graphs/fig_8.5b_undirected_graph_breadth-first_9.svg)]


From (d) we don't discover anything new.

Also, our queue is empty now, so we check for unvisited nodes...

But there are none.  That means we are finished.

---

### Breadth-First traversals: Example

.footnote[Drozdek Fig. 8.5]

.center[![](../images/graphs/fig_8.5b_undirected_graph_breadth-first_finished.svg)]

Final state, with visit ordering shown.  

Edges that were traversed are shown in solid black; edges not traversed are shown in dotted grey.

