# pekkarinen/string-toys

Input string, receive result

## Common params

@param {string} str - String to shuffle
@param {number} iterations - Number of iterations
@param {string} separator - Separator between iterations
@param {number} lineLength - Maximum line length
@param {boolean} shuffle - removes spaces and inserts new ones

## shuffleString.js

Shuffles characters in a string n times

string, iterations, separator, lineLength, shuffle

```bash
% node shuffleString.js "abc" 10 " "
Execution Info

      String: abc
      Iterations: 10
      Line length: 80
      Word separator: space
      Characters in string: 3
      Possible combinations: 27
      Shuffle spaces: No

cba cba bac cba acb abc bac cba bca cba
```

## rotateString.js

Caesar ciphers string n times

@param {rotation} - cipher value
@param {range} - cipher range

string, iterations, rotation, range, separator, lineLength, shuffle

```bash
% node rotateString.js "abc" 10 0 3 " "
Execution Info
  Iterations (i): 10
    String: abc
    Line length: N/A
    Word separator: space
    Shuffle spaces: No

  Rotations (r):
     count: 6,
     center: 0,
     range: 3,

  r/i: 0.6

  Used Rotations
  ┌─────────┬───────┐
  │ (index) │ count │
  ├─────────┼───────┤
  │    0    │   1   │
  │    1    │   2   │
  │    2    │   2   │
  │   -3    │   2   │
  │   -2    │   2   │
  │   -1    │   1   │
  └─────────┴───────┘
zab abc xyz bcd cde yza bcd cde yza xyz
```
