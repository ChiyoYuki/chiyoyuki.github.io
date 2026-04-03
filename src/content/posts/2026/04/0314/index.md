---
title: MIT18.01-Exam1
published: 2026-04-03T14:47:41+08:00
updated: 2026-04-03T15:36:14+08:00
description: ""
image: "./cover.jpg"
tags: []
category: "MIT18.01"
draft: false
lang: "en-US"
---

1. (10 pts.) Find the tangent line to $y = \frac{1}{3}x^2$ at $x = 1$

   Since $y' = \frac{2}{3}x$.

   ~~We have $\sout{y(0) = \frac{1}{3} \cdot 0^2 = 0}$ and $\sout{y'(0) = \frac{2}{3} \cdot 0 = 0}$.~~

   ~~Then $\sout{y - y(0) = y'(0)(x - 0) \Rightarrow y - 0 = 0 \cdot (x - 0) \Rightarrow y = 0}$.~~

   ~~So the tangent line is $\sout{y = 0}$.~~

   We have $y(1) = \frac{1}{3} \cdot 1^2 = \frac{1}{3}$ and $y'(1) = \frac{2}{3} \cdot 1 = \frac{2}{3}$.

   Then $y - y(1) = y'(1)(x - 1) \Rightarrow y - \frac{1}{3} = \frac{2}{3} \cdot (x - 1) \Rightarrow y = \frac{2}{3}x - \frac{1}{3}$.

2. Find the derivative of the following functions:
   1. (7 pts.) $\frac{x}{\sqrt{1 - x}}$

      $(\frac{x}{\sqrt{1 - x}})' = (x(1-x)^{-\frac{1}{2}})' = (1-x)^{-\frac{1}{2}} + (x \cdot (-\frac{1}{2})(1-x)^{-\frac{3}{2}}) = \frac{1-\frac{\cancel{3} 1}{2}x}{(1-x)\sqrt{1-x}}$

   2. (8 pts.) $\frac{\cos(2x)}{x}$

      $(\frac{\cos(2x)}{x})' = \frac{-2x \sin(2x) - \cos(2x)}{x^2}$

   3. (5 pts.) $e^{2f(x)} = g(x)$

      $g'(x) = (e^{2f(x)})' = 2f'(x)e^{2f(x)}$

   4. (5 pts.) $\ln(\sin x)$

      $(\ln(\sin x)) = \frac{1}{\sin x} \cdot \cos x = \cot x$

3. (15 pts.) Find $\frac{\mathrm{d}y}{\mathrm{d}x}$ for the function for the function $y$ defined implicitly by $y^4 + xy = 4$ at $x = 3, y = 1$.

   $\frac{\mathrm{d}}{\mathrm{d}x}(y^4 + xy) = (4y^3)y' + y + xy' = y'(4y^3 + x) + y$

   Since $y^4 + xy = 4$ and $\frac{\mathrm{d}}{\mathrm{d}x} 4 = 0$.

   We have $y'(4y^3 + x) + y = 0$

   Then $\frac{\mathrm{d}y}{\mathrm{d}x} = y' = -\frac{y}{4y^3 + x} = -\frac{1}{4 \cdot 1^3 + 3} = -\frac{1}{7}$ at $x = 3, y = 1$.

4. (15 pts.) Skipped.

5. (15 pts.) Let

   $$
   f(x) =
   \begin{cases}
   ax+b, &x < 1 \\
   x^4 + x + 1, &x \ge 1
   \end{cases}
   $$

   Find all $a$ and $b$ such that the function $f(x)$ is differentiable.

   $$
   f'(x) =
   \begin{cases}
   a, &x < 1 \\
   4x^3 + 1, &x > 1
   \end{cases}
   $$

   So we have

   $$
   \begin{cases}
   ax+b = x^4 + x + 1\\
   a = 4x^3 + 1
   \end{cases}
   $$

   at $x = 1$.

   Then

   $$
   \begin{cases}
   a \cdot 1 +b = 1^4 + 1 + 1\\
   a = 4 \cdot 1^3 + 1
   \end{cases}
   $$

   And we can get $a = 5, b = -2$.

6. Evaluate these limits by relating them to a derivative.
   1. (5 pts.) Evaluate $\lim_{x \rightarrow 0} \frac{(1 + 2x)^{10}-1}{x}$

      $\lim_{x \rightarrow 0} \frac{(1 + 2x)^{10}-1}{x}
        = 2 \lim_{x \rightarrow 0} \frac{(1 + 2x)^{10}-1^{10}}{2x}
        = 2 (t^{10})'|_{t = 1}
        = 20 t^9|_{t = 1}
        = 20$

   2. (5 pts.) Evaluate $\lim_{x \rightarrow 0} \frac{\sqrt{\cos x}-1}{x}$

      $\lim_{x \rightarrow 0} \frac{\sqrt{\cos x}-1}{x}
        =\lim_{x \rightarrow 0} \frac{\sqrt{\cos (0 + x)}-\sqrt{\cos 0}}{x}
        =(\sqrt{\cos t})'|_{t = 0}
        =(-\frac{\sin t}{2\sqrt{\cos t}})|_{t = 0}
        =0$

7. (10 pts.) Derive the formula $\frac{\mathrm{d}}{\mathrm{d}x} a^x = M(a)a^x$ directly from the definition of the derivative, and identity $M(a)$ as a limit.

   $$
   \begin{aligned}
   \frac{\mathrm{d}}{\mathrm{d}x} a^x
    &= \lim_{\Delta x \rightarrow 0}\frac{a^{x + \Delta x} - a^x}{\Delta x} \\
    &= \lim_{\Delta x \rightarrow 0}\frac{a^{x}a^{\Delta x} - a^x}{\Delta x} \\
    &= \lim_{\Delta x \rightarrow 0}\frac{a^x(a^{\Delta x} - 1)}{\Delta x} \\
    &= a^x \lim_{\Delta x \rightarrow 0}\frac{a^{\Delta x} - 1}{\Delta x} \\
    &= M(a)a^x \\
   \end{aligned}
   $$

   where $M(a) = \lim_{\Delta x \rightarrow 0}\frac{a^{\Delta x} - 1}{\Delta x}$
