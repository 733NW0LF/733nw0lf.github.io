---
title: "TJCTF 2026: Web / Treasure Hunt Writeup"
date: 2024-05-24T12:00:00+00:00
draft: false
tags: [tjctf, web, writeup, ctf]
description: "A comprehensive writeup of the TJCTF treasure-hunt web challenge, finding hidden flag fragments through information disclosure and HTTP headers."
---

# TJCTF - web/treasure-hunt Writeup
![CTF Logo](/assets/images/image-53.png?width=102&height=102)
## Challenge Information
- **Category:** Web
- **Challenge Name:** treasure-hunt

### Description
> Let's go hunt down some treasure! The flag is split into 4 parts. I'll give you the first one right here: `tjctf`

![desc](/assets/images/image-46.png)

---

# Recon

The challenge is a simple web application with multiple hidden clues spread across different endpoints.

## Discovered Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Main index page containing hidden HTML |
| POST | `/` | Form submission endpoint returning a redirect |
| GET | `/extra_info` | Redirect destination |
| GET | `/robots.txt` | Reveals hidden paths |
| GET | `/gold-coffer` | Hidden endpoint containing flag data |
| GET | `/static/styles.css` | Stylesheet |
| GET | `/static/ship.png` | Image |
| GET | `/static/penguin.png` | Image |

No JavaScript files or authentication mechanisms were present.

---

# Vulnerabilities Identified

## 1. Information Disclosure via HTML Source
Sensitive information was hidden inside the DOM using a hidden HTML element instead of being protected server-side.

## 2. Information Disclosure via HTTP Headers
A flag fragment was leaked through the `Set-Cookie` response header during a redirect.

## 3. Sensitive Path Disclosure via `robots.txt`
The application relied on `robots.txt` to hide sensitive paths, which is insecure because attackers commonly inspect it.

---

# Exploitation Steps

## Part 1 - Given in Description

The challenge description already provides the first flag fragment:

```text
tjctf
```

---

## Part 2 - Hidden HTML Element

Visit the main page:

```text
GET /
```

Inspect the page source and locate the hidden paragraph tag:

```html
<p hidden>_and_</p>
```

This reveals the second fragment:

```text
_and_
```

![](/assets/images/image-47.png)
---

## Part 3 - Cookie Disclosure in POST Response

The homepage contains a form that submits a POST request to `/`.

Send a POST request and inspect the response headers.

Example response:

```http
HTTP/1.1 302 FOUND
Location: /extra_info
Set-Cookie: silver_coffer={s1lv3r; Path=/
```

This reveals another fragment:

```text
{s1lv3r
```
![](/assets/images/image-48.png)
---

## Part 4 - Hidden Path via robots.txt

Always check `robots.txt` during web CTF challenges.

Request:

```text
GET /robots.txt
```

Response:

```text
Disallow: /gold-coffer
```
![](/assets/images/image-49.png)

Navigate to the hidden endpoint:

```text
GET /gold-coffer
```

The page contains the final fragment:

```text
g0ld}
```
![](/assets/images/image-51.png)
---

# Flag Assembly

Combine all fragments:

```text
tjctf + {s1lv3r + _and_ + g0ld}
```

Final flag:

```text
tjctf{s1lv3r_and_g0ld}
```

---


# Key Takeaways

- Always inspect page source for hidden elements.
- Monitor response headers during redirects.
- Check `robots.txt` for sensitive paths.
- Simple web CTFs often chain multiple small disclosures together.
