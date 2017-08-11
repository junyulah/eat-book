let testSectionsText = `# Foundations

## Introduction

## The Role of Algorithms in Computing

### Algorithms
### Algorithms as a technology

## Getting Started

### Insertion sort
### Analyzing algorithms
### Designing algorithms

## Growth of Functions

### Asymptotic
### Standard notations and common functions

## Divide-and-Conquer

### The maximum-subarray problem
### Strassen's algorithm for matrix multiplication
### The recursion-tree method for solving recurrences
### The master method for solving recurrences
### Proof of the master theorem

## Probabilistic Analysis and Randomized Algorithms

### The hiring problem
### Indicator random variables
### Randomized algorithms
### Probabilistic analysis and further uses of indicator random variables

# Sorting and Order Statistics

## Introduction

## Heapsort

### Heaps
### Maintaining the heap property
### Building a heap
### The heapsort algorithm
### Priority queues

## QuickSort

### Description of quicksort
### A randomized version of quicksort
### Analysis of quicksort

## Sorting in Linear Time

### Lower bounds for sorting
### Counting sort
### Radix sort
### Bucket sort

## Medians and Order Statistics

### Minimum and maximum
### Selection in expected linear time
### Selection in worst-case linear time

# Data Structure

## Introduction

## Elementary Data Structure

### Stacks and queues
### Linked lists
### Implementing pointers and objects
### Representing rooted trees

## Hash Tables

### Directed-address tables
### Hash tables
### Hash functions
### Open addressing
### Perfect hashing

## Binary Search Trees

### What is a binary search tree?
    ### Querying a binary search tree
### Insertion and deletion
### Randomly built binary search trees

## Rea-Black Trees

### Properties of red-black trees
### Rotations
### Insertion
### Deletion

## Augmenting Data Structures

### Dynamic order statistics
### How to augment a data structure
### Interval trees

# Advanced Design and Analysis Techniques

## Introduction

## Dynamic Programming

### Rod cutting
### Matrix-chain multiplication
### Elements of dynamic programming
### Longest common subsequence
### Optimal binary search trees

## Greedy Algorithms

### An activity-selection problem
### Elements of the greedy strategy
### Huffman codes
### Matroids and greedy method
### A task-scheduling problem as a matroid

## Amortized Analysis

### Aggregate analysis
### The accounting method
### The potential method
### Dynamic tables

# Advanced Data Structures

## Introduction

## B-Trees

### Definition of B-trees
### Basic operations on B-trees
### Deleting a key from a B-tree

## Fibonacci Heaps

### Structure of Fibonacci heaps
### Mergeable-heap operations
### Decreasing a key and deleting a node
### Bounding the maximum degree

## van Emde Boas Trees

### Preliminary approached
### A recursive structure
### The van Emde Boas tree

## Data Structures for Disjoint Sets

### Disjoint-set operations
### Linked-list representation of disjoint sets
### Disjoint-set forests
### Analysis of union by rank with path compression

# Graph Algorithms

## Introduction

## Elementary Graph Algorithms

### Representations of graphs
### Breadth-first search
### Depth-first search
### Topological sort
### Strongly connected components

## Minimum Spanning Trees

### Growing a minimum spanning tree
### The algorithms of Kruskal and Prim

## Single-Source Shortest Paths

### The Bellman-Ford algorithm
### Single-source shortest paths in directed acyclic graphs
### Dijkstra's algorithm
### Difference constraints and shortest paths
### Proofs of shortest-paths properties

## All-Pairs Shortest Paths

### Shortest paths and matrix multiplication
### The Floyd-Warshall algorithm
### Johnson's algorithm for sparse graphs

## Maximum Flow

### Flow networks
### The Ford-Fulkerson method
### Maximum bipartite matching
### Push-relabel algorithm
### The relabel-to-front algorithm

# Selected Topics

## Introduction

## Multithreaded Algorithms

### The basics of dynamic multithreading
### Multithreaded matrix multiplication
### Multithreaded merge sort

## Matrix Operations

### Solving systems of linear equations
### Inverting matrices
### Symmetric positive-definite matrices and least-squares approximation

## Linear Programming

### Standard and slack forms
### Formulating problems as linear programs
### The simplex algorithm
### Duality
### The initial basic feasible solution

## Polynomials and the FFT

### Representing polynomials
### The DFT and FFT
### Efficient FFT implementations

## Number-Theoretic Algorithms

### Elementary number-theoretic notations
### Greatest common divisor
### Modular arithmetic
### Solving modular linear equations
### The Chinese remainder theorem
### Powers of an element
### The RSA public-key cryptosystem
### Primality testing
### Integer factorization

## String Matching

### The native string-matching algorithm
### The Rabin-Karp algorithm
### String matching with finite automata
### The Knuth-Morris-Pratt algorithm

## Computational Geomotry`;

let conceptText = `- Algorithm

Informally, an algorithm is any well-defined computational procedure that takes some value, or set of values as input and produces some value, or set of values, as output.

    - Sorting problem

Input: A sequence of n numbers <a_1, a_2, ..., a_n>.
    
    Output: A permutation (reordering) <b_1, b_2, ..., b_n> of the input sequence such that b_1 <= b_2 <= ... <= b_n.
    
    - Data Strucuture

A data structure is a way to store and organize data in order to facilitate access and modifications.
    
    - Loop invariants

Initialization: It is true prior to the first iteration of the loop

Maintenance: If it is true before an iteration of the loop, it remains true before the next iteration.
    
    Termination: When the loop terminates, the invariant gives us a useful property that helps show that the algorithm is correct.
    
    - Analyzing algorithms

Analyzing an algorithm has come to mean predicting the resources that the algorithm requires.
    
    - worst-case running time

The longest running time for any input of size n.
    
    - divide-and-conquer

Divide the problem into a number of subproblems that are smaller instances of the same problem.
    
    Conquer the subproblems by solving them recursively. If the subproblem sized are small enough, however, just solve the subproblems in a straightforward manner.`;

module.exports = {
    progress: {
        //type: 'proofs'
        //type: 'conclusions'
        //type: 'sections'
        type: 'concepts'
    },
    preface: {
        'book-name': 'test-book'
    },
    sections: {
        text: testSectionsText
    },
    concepts: {
        text: conceptText
    },
    conclusions: {
        text: '- con1\neju!\n- con2\nmake'
    },
    proofs: {
        text: '- new\n--content\nsomething\n--proof\nwhat!'
    }
};
