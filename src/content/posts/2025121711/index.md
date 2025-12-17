---
title: "从单位元开始的MIL: C02 Basics"
published: 2025-12-17T11:26:05+08:00
updated: 2025-12-17T11:26:05+08:00
description: "Fuwari 没有 lean 高亮写着疑似有些太痛苦了"
image: ""
tags: ["lean", "数学"]
category: "学习"
draft: true
lang: ""
---

# C02 Basics

## S01 Calculating

可能是由于学习的策略较少的缘故，
C02S01 的题目基本也都还算比较简单。

```lean ins={2-4} collapse={7-11} collapseStyle=collapsible-auto
example (a b c : ℝ) : c * b * a = b * (a * c) := by
  rw [mul_comm c b]
  rw [mul_assoc b c a]
  rw [mul_comm c a]

-- solution

example (a b c : ℝ) : c * b * a = b * (a * c) := by
  rw [mul_comm c b]
  rw [mul_assoc b c a]
  rw [mul_comm c a]
```

这一题考虑到乘法左结合的性质，
先使用交换律将 `b` 移到最左侧，
再使用结合律改变优先顺序，
最后调换出 `a * c` 即可。

```lean ins={2-4} collapse={7-11} collapseStyle=collapsible-auto
example (a b c : ℝ) : a * (b * c) = b * (a * c) := by
  rw [← mul_assoc]
  rw [mul_comm a b]
  rw [mul_assoc]

-- solution

example (a b c : ℝ) : a * (b * c) = b * (a * c) := by
  rw [← mul_assoc a b c]
  rw [mul_comm a b]
  rw [mul_assoc b a c]
```

这一题基本也没有什么难度，
思路略过。

```lean ins={2-3} collapse={6-9} collapseStyle=collapsible-auto
example (a b c : ℝ) : a * (b * c) = b * (c * a) := by
  rw [mul_comm]
  rw [mul_assoc]

-- solution

example (a b c : ℝ) : a * (b * c) = b * (c * a) := by
  rw [mul_comm]
  rw [mul_assoc]
```

这一题文档中要求不使用参数作答。

> [!NOTE]
> 关于自动匹配参数这里，
> 文档原文为
>
> > You can also use identities like `mul_assoc` and `mul_comm` without arguments.
> > In this case,
> > the rewrite tactic tries to match the left-hand side
> > with an expression in the goal, using the first pattern it finds.
>
> 但经过后面几章的训练之后，
> 我发现无参数情况不止匹配等号左侧，
> 也会匹配等号右侧满足条件的式子。
> 且替换 **所有** 匹配到的第一个模式。
>
> 比如说在对 `(x * y) + z = (x * y) * z` 使用
> `rw [mul_comm]` 策略后会变成 `y * x + z = y * x * z`

```lean ins={2-4} del=/mul_comm (a)|mul_assoc (b)/ collapse={7-11} collapseStyle=collapsible-auto
example (a b c : ℝ) : a * (b * c) = b * (a * c) := by
  rw [mul_comm a]
  rw [mul_assoc b]
  rw [mul_comm c]

-- solution

example (a b c : ℝ) : a * (b * c) = b * (a * c) := by
  rw [← mul_assoc]
  rw [mul_comm a]
  rw [mul_assoc]
```

这一题要求仅使用一个参数，
我理解有误，以为对于每个策略都可以使用一个参数。
但是删掉我的解答中的前两个参数也可以完成目标。

```lean ins={2-4} collapse={7-11} collapseStyle=collapsible-auto
example (a b c d e f : ℝ) (h : b * c = e * f) : a * b * c * d = a * e * f * d := by
  rw [mul_assoc a]
  rw [h]
  rw [← mul_assoc a]

-- solution

example (a b c d e f : ℝ) (h : b * c = e * f) : a * b * c * d = a * e * f * d := by
  rw [mul_assoc a]
  rw [h]
  rw [← mul_assoc]
```

这题引入了 `rw` 策略应用于局部语境条件，
先通过乘法结合律凑出 `b * c` 的形式，
应用条件 `h` ，
接下来步骤基本和上文差不多。

```lean ins={2-5} collapse={8-13} collapseStyle=collapsible-auto
example (a b c d : ℝ) (hyp : c = b * a - d) (hyp' : d = a * b) : c = 0 := by
  rw [hyp]
  rw [mul_comm]
  rw [← hyp']
  rw [sub_self d]

-- solution

example (a b c d : ℝ) (hyp : c = b * a - d) (hyp' : d = a * b) : c = 0 := by
  rw [hyp]
  rw [hyp']
  rw [mul_comm]
  rw [sub_self]
```

对于 `rw` 策略应用于局部条件的进一步练习，
`←` 同样适用于局部条件。

```lean ins={4,6,8} /, (two_mul)/ collapse={11-19} collapseStyle=collapsible-auto
example : (a + b) * (a + b) = a * a + 2 * (a * b) + b * b :=
  calc
    (a + b) * (a + b) = a * a + b * a + (a * b + b * b) := by
      rw [mul_add, add_mul, add_mul]
    _ = a * a + (b * a + a * b) + b * b := by
      rw [← add_assoc, add_assoc (a * a)]
    _ = a * a + 2 * (a * b) + b * b := by
      rw [mul_comm b a, two_mul]

-- solution

example : (a + b) * (a + b) = a * a + 2 * (a * b) + b * b :=
  calc
    (a + b) * (a + b) = a * a + b * a + (a * b + b * b) := by
      rw [mul_add, add_mul, add_mul]
    _ = a * a + (b * a + a * b) + b * b := by
      rw [← add_assoc, add_assoc (a * a)]
    _ = a * a + 2 * (a * b) + b * b := by
      rw [mul_comm b a, ← two_mul]
```

这道题引入了 `calc` 策略，
将一个比较长的证明过程分解为多个子目标。
我的答案在这里除了最后一处的 `two_mul` 之外与题解基本一致，
这里也可以作为上文中 **匹配等号右侧** 的佐证。

```lean ins={2-8}
example : (a + b) * (c + d) = a * c + a * d + b * c + b * d := by
  calc
    (a + b) * (c + d) = a * (c + d) + b * (c + d) := by
      rw [add_mul]
    _ = a * c + a * d + (b * c + b * d) := by
      rw [mul_add, mul_add]
    _ = a * c + a * d + b * c + b * d := by
      rw [← add_assoc]
```

```lean ins={2-8}
example (a b : ℝ) : (a + b) * (a - b) = a ^ 2 - b ^ 2 := by
  calc
    (a + b) * (a - b) = a * a + b * a - a * b  - b * b := by
      rw [mul_sub, add_mul, add_mul, ← sub_sub]
    _ = a * a - b * b := by
      rw [← add_sub, mul_comm b a, sub_self, add_zero]
    _ = a ^ 2 - b ^ 2 := by
      rw [pow_two, pow_two]
```

这两道题目同样作为 `calc` 策略的练习，
大致思路都是先将左侧括号拆开，
然后重排序、整理各项，
消去可以消去的项化简，
最后整理为右侧格式。

## S02 Proving Identities in Algebraic Structures

S02 主要是在环结构和群结构上证明一些定理，
尽管 S01 末尾讲了 `ring` 策略，
但作为初学者练习，我尽量避免了对于 `ring` 策略的使用。

```lean ins={2} "add_left_cancel h" collapse={5-7} collapseStyle=collapsible-auto
theorem add_neg_cancel_right (a b : R) : a + b + -b = a := by
  rw [add_comm, add_comm a, neg_add_cancel_left]

-- solution

theorem add_neg_cancel_right (a b : R) : a + b + -b = a := by
  rw [add_assoc, add_neg_cancel, add_zero]
```

前文中已经给出了 `add_neg_cancel_left` 的证明过程，参考即可。

```lean ins={2,5-6} "add_left_cancel h" collapse={9-14} collapseStyle=collapsible-auto
theorem add_left_cancel {a b c : R} (h : a + b = a + c) : b = c := by
  rw [← neg_add_cancel_left a b, h, neg_add_cancel_left]

theorem add_right_cancel {a b c : R} (h : a + b = c + b) : a = c := by
  rw [add_comm a b, add_comm c b] at h
  rw [add_left_cancel h]

-- solution

theorem add_left_cancel {a b c : R} (h : a + b = a + c) : b = c := by
  rw [← neg_add_cancel_left a b, h, neg_add_cancel_left]

theorem add_right_cancel {a b c : R} (h : a + b = c + b) : a = c := by
  rw [← add_neg_cancel_right a b, h, add_neg_cancel_right]
```

证明一般环（不要求交换）上的加法消去率。
达到了 _最佳方案仅需三次重写_ 的目标。

`add_right_cancel` 中最后一个 `rw` 策略是将 `h` 作为 `add_left_cancel`的参数传入，
而非依次应用 `rw [add_left_cancel]` 与 `rw [h]`

```lean ins={2-4} collapse={7-10} collapseStyle=collapsible-auto
theorem zero_mul (a : R) : 0 * a = 0 := by
  have h : 0 * a + 0 * a = 0 * a + 0 := by
    rw [← add_mul, add_zero, add_zero]
  rw [add_left_cancel h]

-- solution

theorem zero_mul (a : R) : 0 * a = 0 := by
  have h : 0 * a + 0 * a = 0 * a + 0 := by rw [← add_mul, add_zero, add_zero]
  rw [add_left_cancel h]
```

`zero_mul` 参照前文的 `mul_zero` 即可。

```lean ins={2-3,6-7,14} "neg_neg" collapse={17-32} collapseStyle=collapsible-auto
theorem neg_eq_of_add_eq_zero {a b : R} (h : a + b = 0) : -a = b := by
  rw [← neg_add_cancel a, add_comm] at h
  rw [add_right_cancel h]

theorem eq_neg_of_add_eq_zero {a b : R} (h : a + b = 0) : a = -b := by
  rw [← neg_add_cancel b] at h
  rw [add_right_cancel h]

theorem neg_zero : (-0 : R) = 0 := by
  apply neg_eq_of_add_eq_zero
  rw [add_zero]

theorem neg_neg (a : R) : - -a = a := by
  rw [neg_eq_of_add_eq_zero (neg_add_cancel a)]

-- solution

theorem neg_eq_of_add_eq_zero {a b : R} (h : a + b = 0) : -a = b := by
  rw [← neg_add_cancel_left a b, h, add_zero]

theorem eq_neg_of_add_eq_zero {a b : R} (h : a + b = 0) : a = -b := by
  symm
  apply neg_eq_of_add_eq_zero
  rw [add_comm, h]

theorem neg_zero : (-0 : R) = 0 := by
  apply neg_eq_of_add_eq_zero
  rw [add_zero]

theorem neg_neg (a : R) : - -a = a := by
  apply neg_eq_of_add_eq_zero
  rw [neg_add_cancel]
```

`neg_eq_of_add_eq_zero` 与 `eq_neg_of_add_eq_zero` 两个命题处于个人习惯在假设 `h` 上重写，
而题解直接在原命题上重写，
以完成证明为目标而言，
二者并没有什么区别，
第 34 行中的 `symm` 策略是将等式两侧调转。

关于最后 `neg_neg` 的证明可能要详细讲述一下
（因为我第二天起来确实没太看懂）：
我先将 `a` 作为 `neg_add_cancel` 的参数传入，
得到了 `-a + a = 0` 这一条件；
然后将这个条件整体作为 `neg_eq_of_add_eq_zero` 的参数传入，
条件中的 `-a` 替换隐式参数 `a` ；
条件中的 `a` 替换隐式参数 `b`，
由 `-a + a = 0` 推导出 `-(-a) = a` ，
即为所需证明命题。

```lean ins={2} collapse={5-7} collapseStyle=collapsible-auto
theorem self_sub (a : R) : a - a = 0 := by
  rw [sub_eq_add_neg, add_comm, neg_add_cancel]

-- solution

theorem self_sub (a : R) : a - a = 0 := by
  rw [sub_eq_add_neg, add_neg_cancel]
```

```lean ins={5} collapse={8-13} collapseStyle=collapsible-auto
theorem one_add_one_eq_two : 1 + 1 = (2 : R) := by
  norm_num

theorem two_mul (a : R) : 2 * a = a + a := by
  rw [← one_add_one_eq_two, add_mul, one_mul]

-- solution

theorem one_add_one_eq_two : 1 + 1 = (2 : R) := by
  norm_num

theorem two_mul (a : R) : 2 * a = a + a := by
  rw [← one_add_one_eq_two, add_mul, one_mul]
```

```lean ins={2-14,17,20-22} collapse={25-36} collapseStyle=collapsible-auto
theorem mul_inv_cancel (a : G) : a * a⁻¹ = 1 := by
  calc
    a * a⁻¹ = 1 * (a * a⁻¹) := by
      nth_rw 1 [← one_mul (a * a⁻¹)]
    _ = ((a⁻¹)⁻¹ * a⁻¹) * (a * a⁻¹) := by
      rw [← inv_mul_cancel a⁻¹]
    _ = (a⁻¹)⁻¹ * (a⁻¹ * a) * a⁻¹ := by
      rw [← mul_assoc, mul_assoc (a⁻¹)⁻¹]
    _ = (a⁻¹)⁻¹ * 1 * a⁻¹ := by
      rw [inv_mul_cancel]
    _ = (a⁻¹)⁻¹ * a⁻¹ := by
      rw [mul_assoc, one_mul]
    _ = 1 := by
      rw [inv_mul_cancel]

theorem mul_one (a : G) : a * 1 = a := by
  rw [← inv_mul_cancel a, ← mul_assoc, mul_inv_cancel, one_mul]

theorem mul_inv_rev (a b : G) : (a * b)⁻¹ = b⁻¹ * a⁻¹ := by
  rw [← one_mul b⁻¹, ← inv_mul_cancel (a * b), ← mul_assoc]
  rw [mul_assoc ((a * b)⁻¹ * a), mul_inv_cancel, mul_one]
  rw [mul_assoc, mul_inv_cancel, mul_one]

-- solution

theorem mul_inv_cancel (a : G) : a * a⁻¹ = 1 := by
  have h : (a * a⁻¹)⁻¹ * (a * a⁻¹ * (a * a⁻¹)) = 1 := by
    rw [mul_assoc, ← mul_assoc a⁻¹ a, inv_mul_cancel, one_mul, inv_mul_cancel]
  rw [← h, ← mul_assoc, inv_mul_cancel, one_mul]

theorem mul_one (a : G) : a * 1 = a := by
  rw [← inv_mul_cancel a, ← mul_assoc, mul_inv_cancel, one_mul]

theorem mul_inv_rev (a b : G) : (a * b)⁻¹ = b⁻¹ * a⁻¹ := by
  rw [← one_mul (b⁻¹ * a⁻¹), ← inv_mul_cancel (a * b), mul_assoc, mul_assoc, ← mul_assoc b b⁻¹,
    mul_inv_cancel, one_mul, mul_inv_cancel, mul_one]
```

## S03 Using Theorems and Lemmas

## S04 More on Order and Divisibility

## S05 Proving Facts about Algebraic Structures
