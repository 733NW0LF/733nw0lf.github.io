---
layout: default
title: Blog
permalink: /blog/
---

<h1 class="title">Blog</h1>
<p class="subtitle">CTF writeups, pentesting notes, and cybersecurity posts.</p>

<div class="posts-list">
  {% for post in site.posts %}
    <div class="post-item">
      <a class="post-link" href="{{ post.url }}">{{ post.title }}</a>
      <div class="post-meta">{{ post.date | date: "%b %d, %Y" }} · {{ post.categories | join: ", " }}</div>
    </div>
  {% endfor %}
</div>
