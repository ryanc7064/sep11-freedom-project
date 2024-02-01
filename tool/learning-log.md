# Tool Learning Log

Tool: two.js

Project: Sudoku from 3 by 3 to 9 by 9 but numbers disappear after being shown in the beginning

---

10/30/23
* Today I looked through some of the examples and saw one called "Clipping Mask". Its a circle that follows wherever your mouse cursor goes while also revealing shapes in the background. I tried to tinker with the code on js fiddle by trying to remove the shapes in the background making it just the circle but whatever line I delete, the whole thing breaks and turns yellow or white entirely. I'm not sure why thats happening but I'm still trying to tinker with it.

11/20/23
* I have decided to change up my project a bit. Instead of making a sudoku with a clipping mask, I've decided to make it so that the numbers disappear after being shown in the beginning. It would be kind of like a memory game too since you would have to remember where and what the given numbers were. Currently, I am still trying to make a 3 by 3 sudoku grid using two.js.

11/27/23
* I've taken an example from Two.js called "Download Scene as SVG" and fixed it up a little so that it's just a square box. I can use it and later on add lines in it which divides the square into 3 rows and 3 columns to create a 3 by 3 sudoku board. I'm currently trying to turn the square to 9 equal squares.

12/18/23
* If I were to be honest, I haven't really been keeping up with learning about my tool recently. I'll probably learn about it this week and during the break. Currently I'm also incorporating a bit of p5.js into my two.js
 <div id="artboard"></div>

<a id="rectangle"></a>
and the JS code is:
import Two from 'https://cdn.skypack.dev/two.js@latest';

var artboard = document.querySelector('#artboard');

var two  = new Two({
  type: Two.Types.svg,
  fullscreen: true
}).appendTo(artboard);

var rectangle = two.makeRectangle(two.width / 2, two.height / 2, 300, 300);
rectangle.fill = 'rgb(205, 205, 205)';
rectangle.linewidth = 10;

two.render();

<!--
* Links you used today (websites, videos, etc)
* Things you tried, progress you made, etc
* Challenges, a-ha moments, etc
* Questions you still have
* What you're going to try next
-->
