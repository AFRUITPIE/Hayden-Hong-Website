---
sidebar_position: 1
---

# Rotating Cat Cube

:::info
This blog post contains adapted code from David DeSandro's excellent [Intro to CSS 3D transforms](https://3dtransforms.desandro.com) ([License](https://github.com/desandro/3dtransforms#license)). I highly recommend reading it!
:::

# The CSS animation

Here is my beloved cat, Mary, rotating around (thanks to Seattle's [Alley Cat Project](https://alleycatproject.org) for helping me find her ♥️):

<html>
    <link rel="stylesheet" href="/css/cat.css" />
    <div class="cube-container">
        <div class="cube">
            <div class="face face-front">
                <img src="/img/cat-cube/cat1.png" />
            </div>
            <div class="face face-right">
                <img src="/img/cat-cube/cat2.png" />
            </div>
            <div class="face face-left">
                <img src="/img/cat-cube/cat3.png" />
            </div>
            <div class="face face-top">
                <img src="/img/cat-cube/cat4.png" />
            </div> 
            <div class="face face-bottom">
                <img src="/img/cat-cube/cat5.png" />
            </div>
        </div>
    </div>
</html>

# Background

While reading Hacker News I found [this post titled "Spinning Diagrams with CSS"](https://news.ycombinator.com/item?id=35646199). Based on the number of points, it seems that most hackers are unaware of the possibility of 3D CSS transformations.

This post interested me because it fits into a running joke within my team. My team's internal documentation is hosted on a framework that doesn't support importing scripts, so we have gone back and forth changing our docs to have goofy CSS-only animations like img slowly expanding or [bouncing like the old DVD logo](https://codepen.io/achristian/pen/WbzgMx). Finding that 3D transformations was possible took our running joke _to the next dimension_.
