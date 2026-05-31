---
title: "TJCTF 2026: Cryptography - Decode Script Writeup"
date: 2026-05-17T15:57:50+05:30
draft: false
tags: [tjctf, cryptography, writeup, ctf, chebyshev, matrix-exponentiation]
description: "A comprehensive writeup of the TJCTF crypto challenge using Chebyshev polynomials and fast matrix exponentiation to efficiently compute large-order recurrence relations."
---

# TJCTF - Cryptography/Decode Script Writeup

## Challenge Information
- **Category:** Cryptography
- **Challenge Name:** why does my decode script not work :(

### Description
We are given:
- `decode.py` - A decryption script with an optimization problem
- `flag.enc` - The encrypted flag

---

# Source Code Analysis

```python
from pathlib import Path

from Crypto.Util.number import long_to_bytes

M = 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f


def encrypt(val, key):
    amp = val
    p = M

    prev = 1
    current = amp
    for _ in range(key - 1):
        new_val = (2 * amp * current - prev) % p
        prev = current
        current = new_val
    return current

flag_bytes = ("flag.enc").read_bytes()

base_val = 0x1337C0DE
frequency_key = 10**25

secret = encrypt(base_val, frequency_key)

encrypted = bytes([a ^ b for a, b in zip(flag_bytes, long_to_bytes(secret))])

print(encrypted)
```

### The Problem

The script uses a recurrence relation:

```
s_{n+1} = 2 * a * s_n - s_{n-1} (mod p)
```

with:
- s_0 = 1
- s_1 = a = 0x1337C0DE
- p = 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f
- key = 10^25 (iterations)

The problem: **10^25 iterations would take forever in a naive loop!**

---

# Mathematical Analysis

## Identifying the Pattern

This is a **Chebyshev-style recurrence relation** — a linear recurrence that can be efficiently computed using matrix exponentiation.

### Matrix Representation

We can express the recurrence as:

```
[s_{n+1}]   [2*a  -1] [s_n    ]
[s_n    ] = [1     0] [s_{n-1}]
```

Let **T** be the transformation matrix:

```
T = [2*a  -1]
    [1     0]
```

Then:

```
[s_n    ]     n-1 [a]
[s_{n-1}] = T     [1]
```

This means we can compute s_n in **O(log n)** time using **fast matrix exponentiation** instead of O(n).

---

# Solution Approach

## Step 1: Define Matrix Multiplication

Multiply two 2×2 matrices modulo p:

```
(A × B) mod p
```

## Step 2: Implement Fast Matrix Exponentiation

Using binary exponentiation (similar to modular exponentiation), compute T^(n-1) mod p in O(log n) steps.

## Step 3: Extract the Result

Once we have T^(n-1), compute:

```
s_n = P[0][0] * a + P[0][1] (mod p)
```

where P = T^(n-1)

## Step 4: Decrypt the Flag

1. Convert s_n to bytes
2. XOR with the encrypted flag bytes

---

# Solve Script

```python
from pathlib import Path
from Crypto.Util.number import long_to_bytes

M = 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f

a = 0x1337C0DE
n = 10**25


def mat_mul(A, B, mod):
    """Multiply two 2x2 matrices modulo mod"""
    return [
        [
            (A[0][0]*B[0][0] + A[0][1]*B[1][0]) % mod,
            (A[0][0]*B[0][1] + A[0][1]*B[1][1]) % mod,
        ],
        [
            (A[1][0]*B[0][0] + A[1][1]*B[1][0]) % mod,
            (A[1][0]*B[0][1] + A[1][1]*B[1][1]) % mod,
        ]
    ]


def mat_pow(mat, exp, mod):
    """Compute mat^exp modulo mod using binary exponentiation"""
    result = [[1, 0], [0, 1]]  # Identity matrix

    while exp:
        if exp & 1:
            result = mat_mul(result, mat, mod)

        mat = mat_mul(mat, mat, mod)
        exp >>= 1

    return result


# Construct the transformation matrix
T = [
    [2*a % M, -1 % M],
    [1, 0]
]

# Compute T^(n-1) mod M
P = mat_pow(T, n - 1, M)

# Extract s_n from the matrix result
s_n = (P[0][0] * a + P[0][1]) % M

# Convert to bytes
secret = long_to_bytes(s_n)

# Read encrypted flag
enc = Path("flag.enc").read_bytes()

# XOR to decrypt
flag = bytes(x ^ y for x, y in zip(enc, secret))

print(flag.decode())
```

---

# Execution & Output

```text
$ python3 solve.py
tjctf{ch3bysh3v_p0lyn0m1!l_676767}
```

---

# Final Flag

```text
tjctf{ch3bysh3v_p0lyn0m1!l_676767}
```

---

# Key Takeaways

1. **Recognize linear recurrences** — When you see s_{n+1} = a*s_n + b*s_{n-1}, think matrix exponentiation.

2. **Matrix exponentiation reduces complexity** — From O(n) to O(log n), enabling computation of massive iteration counts.

3. **Modular arithmetic** — Remember to apply modulo at every step to prevent overflow.

4. **Chebyshev polynomials** — This specific recurrence is related to Chebyshev polynomials of the second kind, which have elegant properties.

5. **CTF Crypto lesson** — Sometimes the "broken" script isn't broken; it just needs algorithmic optimization!

---

# References

- [Chebyshev Polynomials - Wikipedia](https://en.wikipedia.org/wiki/Chebyshev_polynomials)
- [Fast Matrix Exponentiation](https://en.wikipedia.org/wiki/Exponentiation_by_squaring)
- [Recurrence Relations and Linear Algebra](https://brilliant.org/wiki/linear-recurrences-matrix-method/)
