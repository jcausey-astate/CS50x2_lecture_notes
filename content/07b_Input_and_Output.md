---
title: "07b: Input and Output"
date: 2021-01-13T12:00:00-05:00
draft: false
---

# Input and Output
## Gaddis Ch. 3, 5.11

---

## Review: Output Streams

Recall that a _stream_ is a one-way flow of information.  Output streams are streams that take information from the running program and move it to the outside world.

* The standard output stream is named `std::cout`
    - Often shortened to `cout` (add `using std::cout;` after the include)
    - We will refer to the standard output stream as `cout` in discussion.
* Output streams work together with the _stream insertion operator_ ( `<<` ).
    - `<<` inserts items into the output stream listed to its left.
    - (Almost) any type of data can be inserted into an output stream.

---

### Example


``` cpp
    std::cout << "Integer: " << 42 << ", Real number: " << 3.14 << "\n";
    int x = 88;
    std::cout << "From variable: " << x << "\n";
```

<br />

The code shown above will produce the following output:

<br />

    Integer: 42, Real number: 3.14
    From variable: 88

---

## Input Streams

An **_input stream_** brings information from the outside world _into_ the running program.

* The standard input stream is named `std::cin`
    - Often shortened to `cin` (add `using std::cin` after the include)
    - We will refer to the standard input stream as `cin` in discussion
* Input streams work together with the _stream extraction operator_ ( `>>` ).
    - `>>` extracts data from the stream (on its left) and stores the data in the variable on its right.

---

### Example

``` cpp
    int     temperature;
    double  rainfall;
    cout << "Enter the temperature in degrees Fahrenheit: ";
    cin  >> temperature;
    cout << "Enter the day's rainfall total: ";
    cin  >> rainfall;
```

The code shown above will read the temperature from the user (entered at the keyboard) as an integer value, storing it in `temperature`.  
Then, the rainfall total is read as a Real-number value and stored in `rainfall`.   
**Notice** the necessity of _prompting_ the user before reading the values!

---

## Stream Extraction - details

* The _type_ of the variable that is intended to store the data must match the _type_ of the data being extracted.
    - The extraction may fail if this is not the case.
* The stream extraction operator is _whitespace delimited_, meaning that it will read the next series of non-whitespace characters in the input stream and convert those to the required type.
    - This means you cannot read anything containing spaces using `>>`.

---

## Streams: Plural

You have used the _standard input_ stream and the _standard output_ stream; C++ provides the opportunity to create other streams as well.

* All input streams support the same operations.
* All output streams support the same operations.
* So, if you can use `std::cin` and `std::cout`, you can use any stream!

---

## Files

In the most general sense, a _file_ is an abstraction by which the operating system allows us to store a blob of related data on a device other than main memory.

* _**file**_ - a collection of related data stored on a device other than main memory and accessed by means of a _file name_.
* _**file name**_ - a string that uniquely identifies a single file on the system.

---

## Files

To work with files, start by including the `<fstream>` library.

* We will be working with files in _text mode_, meaning the contents are encoded as plain ASCII text.
    - Our interaction with the file will "feel" exactly the same as interacting with a user/screen.
* You can also access a file in pure _binary mode_ as well. (later)

---

## File Operations

Working with files will involve the following series of high-level steps:

1. Open the file
    * This associates the file name with the physical file, and initializes a stream to/from the file.
2. Read or write data from/to the file
    * The file can be read/written as a stream - just like any other stream.
3. Close the file
    * This allows the Operating System to release resources associated with the file, and flush buffers.

---

## Output File Streams

* Create a `std::ofstream` file stream object and use it to open and manipulate the file:
``` cpp
double value1 = 4.4, value2 = 3.8;       
std::ofstream fout;             // declare a stream
fout.open("my_input_file.txt"); // open the file
fout << value1                  // insert values
       << "\n"                    // separated on
       << value2;                 // two lines
fout.close();                   // close the file
```

---

## Input File Streams

* Create a `std::ifstream` file stream object and use it to open and manipulate the file:
``` cpp
double value1, value2;        
std::ifstream fin;             // declare a stream
fin.open("my_input_file.txt"); // open the file
fin >> value1 >> value2;       // read some values
fin.close();                   // close the file
std::cout << value1 << ", " << value2 << "\n";
```

---

## Alternatives

* You can also declare and open in one line:
``` cpp 
std::ifstream fin("my_input_file.txt");
```
* A `std::fstream` object can do _either_ input or output -- or both, but you must specify the _open mode_:
```cpp
std::fstream fp;
```

---

```cpp
std::fstream fp;
```
Now you can open for input:
``` cpp
fp.open("my_file.txt", std::ios::in); // open for input
```
Or for output:
``` cpp
fp.open("my_file.txt", std::ios::out); // open for output
```
Or append to the end of the file:
``` cpp
fp.open("my_file.txt", std::ios::out|std::ios::app); // append mode
```

---

## Open Modes
 
<pre>
Open Mode       Description
---------------------------------------------
std:: ios::in   Input mode (file must exist)
std:: ios::out  Output mode (file will be 
                created, if it exists, it will
                be overwritten)
std:: ios::app  Use with ios::out to append 
                to the end of an output file.
</pre>

There are other modes as well, but they are not of interest to us at this time.

---

## File Open Failures

* Opening an input file may **fail** if:
    - The file does not exist, or is misnamed.
    - You do not have permission to read the file.
    - All OS file resources are in use.
* Opening an output file may **fail** if:
    - The file exists, but you do not have permission to overwrite it.
    - You do not have permission to write in the destination directory.
    - All OS file resources are in use.

---

## Testing for File Open Success

File streams support a function called `is_open()` that will return `true` if the file was opened successfully.  This function can be used to check for a failure to open. 

We will cover `if` statements soon, but here is a sneak peek:

``` cpp
std::ifstream fin;                         
fin.open("my_input_file.txt");             
if( !fin.is_open() ){                      
    std::cout << "Failed to open file.\n"; 
    exit(1);                               
}
```
