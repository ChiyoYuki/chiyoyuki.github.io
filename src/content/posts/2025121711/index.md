---
title: "从单位元开始的MIL: C02 Basics"
published: 2025-12-17T11:26:05+08:00
updated: 2025-12-17T11:26:05+08:00
description: ""
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

```lean ins={2-4} collapse={7-10} collapseStyle=collapsible-auto
example (a b c : ℝ) : c * b * a = b * (a * c) := by
  rw [mul_comm c b]
  rw [mul_assoc b c a]
  rw [mul_comm c a]

-- solution:
example (a b c : ℝ) : c * b * a = b * (a * c) := by
  rw [mul_comm c b]
  rw [mul_assoc b c a]
  rw [mul_comm c a]
```

这一题考虑到乘法左结合的性质，
先使用交换律将 `b` 移到最左侧，
再使用结合律改变优先顺序，
最后调换出 `a * c` 即可。

```lean ins={2-4} collapse={7-10} collapseStyle=collapsible-auto
example (a b c : ℝ) : a * (b * c) = b * (a * c) := by
  rw [← mul_assoc]
  rw [mul_comm a b]
  rw [mul_assoc]

-- solution:
example (a b c : ℝ) : a * (b * c) = b * (a * c) := by
  rw [← mul_assoc a b c]
  rw [mul_comm a b]
  rw [mul_assoc b a c]
```

这一题基本也没有什么难度，
思路略过。

```lean ins={2-3} collapse={6-8} collapseStyle=collapsible-auto
example (a b c : ℝ) : a * (b * c) = b * (c * a) := by
  rw [mul_comm]
  rw [mul_assoc]

-- solution:
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
> 这段当中的 **left-hand** 指的是 `rw` 策略内的左侧表达式，
> **而非当前待证明项** 的左侧表达式。
> 且替换 **所有** 匹配到的第一个模式。
>
> 比如说在对 `(x * y) + z = (x * y) * z` 使用
> `rw [mul_comm]` 策略后会变成 `y * x + z = y * x * z`

```lean ins={2-4} del=/mul_comm (a)|mul_assoc (b)/ collapse={7-10} collapseStyle=collapsible-auto
example (a b c : ℝ) : a * (b * c) = b * (a * c) := by
  rw [mul_comm a]
  rw [mul_assoc b]
  rw [mul_comm c]

-- solution:
example (a b c : ℝ) : a * (b * c) = b * (a * c) := by
  rw [← mul_assoc]
  rw [mul_comm a]
  rw [mul_assoc]
```

这一题要求仅使用一个参数，
我理解有误，以为对于每个策略都可以使用一个参数。
但是删掉我的解答中的前两个参数也可以完成目标。

```lean ins={2-4} collapse={7-10} collapseStyle=collapsible-auto
example (a b c d e f : ℝ) (h : b * c = e * f) : a * b * c * d = a * e * f * d := by
  rw [mul_assoc a]
  rw [h]
  rw [← mul_assoc a]

-- solution:
example (a b c d e f : ℝ) (h : b * c = e * f) : a * b * c * d = a * e * f * d := by
  rw [mul_assoc a]
  rw [h]
  rw [← mul_assoc]
```

这题引入了 `rw` 策略应用于局部语境条件，
先通过乘法结合律凑出 `b * c` 的形式，
应用条件 `h` ，
接下来步骤基本和上文差不多。

```lean ins={2-5} collapse={8-12} collapseStyle=collapsible-auto
example (a b c d : ℝ) (hyp : c = b * a - d) (hyp' : d = a * b) : c = 0 := by
  rw [hyp]
  rw [mul_comm]
  rw [← hyp']
  rw [sub_self d]

-- solution:
example (a b c d : ℝ) (hyp : c = b * a - d) (hyp' : d = a * b) : c = 0 := by
  rw [hyp]
  rw [hyp']
  rw [mul_comm]
  rw [sub_self]
```

对于 `rw` 策略应用于局部条件的进一步练习，
`←` 同样适用于局部条件。

```lean ins={4,6,8} /, (two_mul)/ collapse={11-18} collapseStyle=collapsible-auto
example : (a + b) * (a + b) = a * a + 2 * (a * b) + b * b :=
  calc
    (a + b) * (a + b) = a * a + b * a + (a * b + b * b) := by
      rw [mul_add, add_mul, add_mul]
    _ = a * a + (b * a + a * b) + b * b := by
      rw [← add_assoc, add_assoc (a * a)]
    _ = a * a + 2 * (a * b) + b * b := by
      rw [mul_comm b a, two_mul]

-- solution:
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

```lean ins={2} "add_left_cancel h" collapse={5-6} collapseStyle=collapsible-auto
theorem add_neg_cancel_right (a b : R) : a + b + -b = a := by
  rw [add_comm, add_comm a, neg_add_cancel_left]

-- solution:
theorem add_neg_cancel_right (a b : R) : a + b + -b = a := by
  rw [add_assoc, add_neg_cancel, add_zero]
```

前文中已经给出了 `add_neg_cancel_left` 的证明过程，参考即可。

```lean ins={2,5-6} "add_left_cancel h" collapse={9-13} collapseStyle=collapsible-auto
theorem add_left_cancel {a b c : R} (h : a + b = a + c) : b = c := by
  rw [← neg_add_cancel_left a b, h, neg_add_cancel_left]

theorem add_right_cancel {a b c : R} (h : a + b = c + b) : a = c := by
  rw [add_comm a b, add_comm c b] at h
  rw [add_left_cancel h]

-- solution:
theorem add_left_cancel {a b c : R} (h : a + b = a + c) : b = c := by
  rw [← neg_add_cancel_left a b, h, neg_add_cancel_left]

theorem add_right_cancel {a b c : R} (h : a + b = c + b) : a = c := by
  rw [← add_neg_cancel_right a b, h, add_neg_cancel_right]
```

证明一般环（不要求交换）上的加法消去率。
达到了 _最佳方案仅需三次重写_ 的目标。

`add_right_cancel` 中最后一个 `rw` 策略是将 `h` 作为 `add_left_cancel`的参数传入，
而非依次应用 `rw [add_left_cancel]` 与 `rw [h]`

```lean ins={2-4} collapse={7-9} collapseStyle=collapsible-auto
theorem zero_mul (a : R) : 0 * a = 0 := by
  have h : 0 * a + 0 * a = 0 * a + 0 := by
    rw [← add_mul, add_zero, add_zero]
  rw [add_left_cancel h]

-- solution:
theorem zero_mul (a : R) : 0 * a = 0 := by
  have h : 0 * a + 0 * a = 0 * a + 0 := by rw [← add_mul, add_zero, add_zero]
  rw [add_left_cancel h]
```

`zero_mul` 参照前文的 `mul_zero` 即可。

```lean ins={2-3,6-7,14} "rw [neg_eq_of_add_eq_zero (neg_add_cancel a)]" collapse={17-31} collapseStyle=collapsible-auto
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

-- solution:
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

```lean ins={2} collapse={5-6} collapseStyle=collapsible-auto
theorem self_sub (a : R) : a - a = 0 := by
  rw [sub_eq_add_neg, add_comm, neg_add_cancel]

-- solution:
theorem self_sub (a : R) : a - a = 0 := by
  rw [sub_eq_add_neg, add_neg_cancel]
```

```lean ins={5} collapse={8-12} collapseStyle=collapsible-auto
theorem one_add_one_eq_two : 1 + 1 = (2 : R) := by
  norm_num

theorem two_mul (a : R) : 2 * a = a + a := by
  rw [← one_add_one_eq_two, add_mul, one_mul]

-- solution:
theorem one_add_one_eq_two : 1 + 1 = (2 : R) := by
  norm_num

theorem two_mul (a : R) : 2 * a = a + a := by
  rw [← one_add_one_eq_two, add_mul, one_mul]
```

```lean ins={2-14,17,20-22} collapse={25-35} collapseStyle=collapsible-auto
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

-- solution:
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

```lean ins={2-8} collapse={11-14} collapseStyle=collapsible-auto
example (h₀ : a ≤ b) (h₁ : b < c) (h₂ : c ≤ d) (h₃ : d < e) : a < e := by
  apply lt_of_le_of_lt at h₀
  apply h₀ at h₁
  apply lt_of_lt_of_le at h₁
  apply h₁ at h₂
  apply lt_trans
  · apply h₂
  · apply h₃

-- solution:
example (h₀ : a ≤ b) (h₁ : b < c) (h₂ : c ≤ d) (h₃ : d < e) : a < e := by
  apply lt_of_le_of_lt h₀
  apply lt_trans h₁
  exact lt_of_le_of_lt h₂ h₃
```

```lean ins={2-7, 13-15, 17-18} collapse={21-36} collapseStyle=collapsible-auto
example (h₀ : d ≤ e) : c + exp (a + d) ≤ c + exp (a + e) := by
  apply add_le_add
  · apply le_refl
  · apply exp_le_exp.mpr
    apply add_le_add
    · apply le_refl
    · apply h₀

example : (0 : ℝ) < 1 := by norm_num

example (h : a ≤ b) : log (1 + exp a) ≤ log (1 + exp b) := by
  have h₀ : 0 < 1 + exp a := by
    apply add_pos
    · norm_num
    · apply exp_pos
  apply log_le_log h₀
  apply add_le_add_left
  apply exp_le_exp.mpr h

-- solution:
example (h₀ : d ≤ e) : c + exp (a + d) ≤ c + exp (a + e) := by
  apply add_le_add_left
  rw [exp_le_exp]
  apply add_le_add_left h₀

-- an alternative using `linarith`.
example (h₀ : d ≤ e) : c + exp (a + d) ≤ c + exp (a + e) := by
  have : exp (a + d) ≤ exp (a + e) := by
    rw [exp_le_exp]
    linarith
  linarith [this]

example (h : a ≤ b) : log (1 + exp a) ≤ log (1 + exp b) := by
  have h₀ : 0 < 1 + exp a := by linarith [exp_pos a]
  apply log_le_log h₀
  apply add_le_add_left (exp_le_exp.mpr h)
```

```lean ins={2-4} collapse={7-13} collapseStyle=collapsible-auto
example (h : a ≤ b) : c - exp b ≤ c - exp a := by
  apply tsub_le_tsub
  · apply le_refl
  · apply exp_le_exp.mpr h

-- solution:
example (h : a ≤ b) : c - exp b ≤ c - exp a := by
  apply sub_le_sub_left
  exact exp_le_exp.mpr h

-- alternatively:
example (h : a ≤ b) : c - exp b ≤ c - exp a := by
  linarith [exp_le_exp.mpr h]
```

```lean ins={1-15, 19-25} collapse={28-49} collapseStyle=collapsible-auto
theorem fact1 : a*b*2 ≤ a^2 + b^2 := by
  have h : 0 ≤ a^2 - 2*a*b + b^2
  calc
    a^2 - 2*a*b + b^2 = (a - b)^2 := by ring
    _ ≥ 0 := by apply pow_two_nonneg
  linarith

theorem fact2 : -(a*b)*2 ≤ a^2 + b^2 := by
  have h₀ : -(a*b) = a*(-b) := by ring
  have h₁ : -(a*b)*2 ≤ a^2 + (-b)^2 := by
    rw [h₀]
    apply fact1
  have h₂ : (-b)^2 = b^2 := by ring
  rw [← h₂]
  apply h₁


example : |a*b| ≤ (a^2 + b^2)/2 := by
  have h : (0 : ℝ) < 2 := by norm_num
  apply abs_le'.mpr
  constructor
  · rw [le_div_iff₀ h]
    apply fact1
  · rw [le_div_iff₀ h]
    apply fact2

-- solution:
theorem fact1 : a*b*2 ≤ a^2 + b^2 := by
  have h : 0 ≤ a^2 - 2*a*b + b^2
  calc
    a^2 - 2*a*b + b^2 = (a - b)^2 := by ring
    _ ≥ 0 := by apply pow_two_nonneg
  linarith

theorem fact2 : -(a*b)*2 ≤ a^2 + b^2 := by
  have h : 0 ≤ a^2 + 2*a*b + b^2
  calc
    a^2 + 2*a*b + b^2 = (a + b)^2 := by ring
    _ ≥ 0 := by apply pow_two_nonneg
  linarith

example : |a*b| ≤ (a^2 + b^2)/2 := by
  have h : (0 : ℝ) < 2 := by norm_num
  apply abs_le'.mpr
  constructor
  · rw [le_div_iff₀ h]
    apply fact1
  rw [le_div_iff₀ h]
  apply fact2
```

## S04 More on Order and Divisibility

```lean ins={2-9, 11-32} "refine inf_le_inf_right" collapse={35-61} collapseStyle=collapsible-auto
example : max a b = max b a := by
  have h: ∀ x y : ℝ, max x y ≤ max y x := by
    intro x y
    apply max_le
    · apply le_max_right
    · apply le_max_left
  apply le_antisymm
  apply h
  apply h
example : min (min a b) c = min a (min b c) := by
  apply le_antisymm
  · apply le_min
    · show min (min a b) c ≤ a
      have h₀ : min (min a b) c ≤ min a c := by
        -- apply?
        refine inf_le_inf_right c ?_
        apply min_le_left
      have h₁ : min a c ≤ a := by
        apply min_le_left
      apply le_trans h₀ h₁
    · show min (min a b) c ≤ min b c
      refine inf_le_inf_right c ?_
      apply min_le_right
  · apply le_min
    · show min a (min b c) ≤ min a b
      refine inf_le_inf_left a ?_
      apply min_le_left
    · show min a (min b c) ≤ c
      have h₂ : min a (min b c) ≤ min b c := by
        apply min_le_right
      apply le_trans h₂
      apply min_le_right

-- solution:
example : max a b = max b a := by
  apply le_antisymm
  repeat
    apply max_le
    apply le_max_right
    apply le_max_left

example : min (min a b) c = min a (min b c) := by
  apply le_antisymm
  · apply le_min
    · apply le_trans
      apply min_le_left
      apply min_le_left
    apply le_min
    · apply le_trans
      apply min_le_left
      apply min_le_right
    apply min_le_right
  apply le_min
  · apply le_min
    · apply min_le_left
    apply le_trans
    apply min_le_right
    apply min_le_left
  apply le_trans
  apply min_le_right
  apply min_le_right
```

```lean ins={2-6,8-14} collapse={17-33} collapseStyle=collapsible-auto
theorem aux : min a b + c ≤ min (a + c) (b + c) := by
  apply le_min
  · apply add_le_add_right
    apply min_le_left
  · apply add_le_add_right
    apply min_le_right
example : min a b + c = min (a + c) (b + c) := by
  apply le_antisymm
  · apply aux
  · have h₀ : min (a + c) (b + c) + -c ≤ min (a + c + -c) (b + c + -c) := by
      apply aux (a + c) (b + c) (-c)
    rw [add_assoc, add_assoc] at h₀
    rw [add_neg_cancel, add_zero, add_zero] at h₀
    linarith

-- solution:
theorem aux : min a b + c ≤ min (a + c) (b + c) := by
  apply le_min
  · apply add_le_add_right
    apply min_le_left
  apply add_le_add_right
  apply min_le_right

example : min a b + c = min (a + c) (b + c) := by
  apply le_antisymm
  · apply aux
  have h : min (a + c) (b + c) = min (a + c) (b + c) - c + c := by rw [sub_add_cancel]
  rw [h]
  apply add_le_add_right
  rw [sub_eq_add_neg]
  apply le_trans
  apply aux
  rw [add_neg_cancel_right, add_neg_cancel_right]
```

```lean ins={1-7, 9-15} collapse={18-31} collapseStyle=collapsible-auto
#check add_sub_cancel_right
#check sub_add_cancel
/-
a + b = a
a = a - b
b = b
-/
example : |a| - |b| ≤ |a - b| :=
  calc
    |a| - |b| = |a - b + b| - |b| := by
      rw [sub_add, sub_self, sub_zero]
    _ ≤ |a - b| := by
      rw [← add_zero (|a - b|), ← sub_self |b|, add_sub]
      apply add_le_add_right
      apply abs_add

-- solution:
example : |a| - |b| ≤ |a - b| :=
  calc
    |a| - |b| = |a - b + b| - |b| := by rw [sub_add_cancel]
    _ ≤ |a - b| + |b| - |b| := by
      apply sub_le_sub_right
      apply abs_add
    _ ≤ |a - b| := by rw [add_sub_cancel_right]


-- alternatively
example : |a| - |b| ≤ |a - b| := by
  have h := abs_add (a - b) b
  rw [sub_add_cancel] at h
  linarith
```

```lean ins={2-8} collapse={11-19} collapseStyle=collapsible-auto
example (h : x ∣ w) : x ∣ y * (x * z) + x ^ 2 + w ^ 2 := by
  apply dvd_add
  apply dvd_add
  · apply dvd_mul_of_dvd_right
    apply dvd_mul_right
  · apply dvd_mul_left
  · apply dvd_mul_of_dvd_right
    apply h

-- solution:
example (h : x ∣ w) : x ∣ y * (x * z) + x ^ 2 + w ^ 2 := by
  apply dvd_add
  · apply dvd_add
    · apply dvd_mul_of_dvd_right
      apply dvd_mul_right
    apply dvd_mul_left
  rw [pow_two]
  apply dvd_mul_of_dvd_right
  exact h
```

```lean ins={2-6} collapse={9-14} collapseStyle=collapsible-auto
example : Nat.gcd m n = Nat.gcd n m := by
  apply Nat.dvd_antisymm
  repeat
    apply Nat.dvd_gcd
    apply Nat.gcd_dvd_right
    apply Nat.gcd_dvd_left

-- solution:
example : Nat.gcd m n = Nat.gcd n m := by
  apply Nat.dvd_antisymm
  repeat
    apply Nat.dvd_gcd
    apply Nat.gcd_dvd_right
    apply Nat.gcd_dvd_left
```

## S05 Proving Facts about Algebraic Structures

```lean ins={2-6,9-19,22-26,29-39} collapse={42-96} collapseStyle=collapsible-auto
example : x ⊓ y = y ⊓ x := by
  apply le_antisymm
  repeat
    apply le_inf
    apply inf_le_right
    apply inf_le_left

example : x ⊓ y ⊓ z = x ⊓ (y ⊓ z) := by
  apply le_antisymm
  · apply le_inf
    · apply le_trans inf_le_left inf_le_left
    · apply le_inf
      · apply le_trans inf_le_left inf_le_right
      · apply inf_le_right
  · apply le_inf
    · apply le_inf
      · apply inf_le_left
      · apply le_trans inf_le_right inf_le_left
    · apply le_trans inf_le_right inf_le_right

example : x ⊔ y = y ⊔ x := by
  apply le_antisymm
  repeat
    apply sup_le
    apply le_sup_right
    apply le_sup_left

example : x ⊔ y ⊔ z = x ⊔ (y ⊔ z) := by
  apply le_antisymm
  · apply sup_le
    · apply sup_le
      · apply le_sup_left
      · apply le_trans le_sup_left le_sup_right
    · apply le_trans le_sup_right le_sup_right
  · apply sup_le
    · apply le_trans le_sup_left le_sup_left
    · apply sup_le
      · apply le_trans le_sup_right le_sup_left
      · apply le_sup_right

-- solution:
example : x ⊓ y = y ⊓ x := by
  apply le_antisymm
  repeat
    apply le_inf
    · apply inf_le_right
    apply inf_le_left

example : x ⊓ y ⊓ z = x ⊓ (y ⊓ z) := by
  apply le_antisymm
  · apply le_inf
    · trans x ⊓ y
      apply inf_le_left
      apply inf_le_left
    apply le_inf
    · trans x ⊓ y
      apply inf_le_left
      apply inf_le_right
    apply inf_le_right
  apply le_inf
  · apply le_inf
    · apply inf_le_left
    trans y ⊓ z
    apply inf_le_right
    apply inf_le_left
  trans y ⊓ z
  apply inf_le_right
  apply inf_le_right

example : x ⊔ y = y ⊔ x := by
  apply le_antisymm
  repeat
    apply sup_le
    · apply le_sup_right
    apply le_sup_left

example : x ⊔ y ⊔ z = x ⊔ (y ⊔ z) := by
  apply le_antisymm
  · apply sup_le
    · apply sup_le
      apply le_sup_left
      · trans y ⊔ z
        apply le_sup_left
        apply le_sup_right
    trans y ⊔ z
    apply le_sup_right
    apply le_sup_right
  apply sup_le
  · trans x ⊔ y
    apply le_sup_left
    apply le_sup_left
  apply sup_le
  · trans x ⊔ y
    apply le_sup_right
    apply le_sup_left
  apply le_sup_right
```

```lean ins={2-6,9-13} collapse={16-28} collapseStyle=collapsible-auto
theorem absorb1 : x ⊓ (x ⊔ y) = x := by
  apply le_antisymm
  · apply inf_le_left
  · apply le_inf
    · apply le_refl
    · apply le_sup_left

theorem absorb2 : x ⊔ x ⊓ y = x := by
  apply le_antisymm
  · apply sup_le
    · apply le_refl
    · apply inf_le_left
  · apply le_sup_left

-- solution:
theorem absorb1 : x ⊓ (x ⊔ y) = x := by
  apply le_antisymm
  · apply inf_le_left
  apply le_inf
  · apply le_refl
  apply le_sup_left

theorem absorb2 : x ⊔ x ⊓ y = x := by
  apply le_antisymm
  · apply sup_le
    · apply le_refl
    apply inf_le_left
  apply le_sup_left
```

```lean ins={2-27,30-40} collapse={43-49} collapseStyle=collapsible-auto
example (h : ∀ x y z : α, x ⊓ (y ⊔ z) = x ⊓ y ⊔ x ⊓ z) : a ⊔ b ⊓ c = (a ⊔ b) ⊓ (a ⊔ c) := by
  apply le_antisymm
  · apply le_inf
    · apply sup_le
      · apply le_sup_left
      · apply le_trans
        apply inf_le_left
        apply le_sup_right
    · apply sup_le
      · apply le_sup_left
      · apply le_trans
        apply inf_le_right
        apply le_sup_right
  · rw [h]
    apply sup_le
    · apply le_trans
      apply inf_le_right
      apply le_sup_left
    · show (a ⊔ b) ⊓ c ≤ a ⊔ (b ⊓ c)
      rw [inf_comm]
      rw [h]
      apply sup_le
      · apply le_trans
        apply inf_le_right
        apply le_sup_left
      · rw [inf_comm]
        apply le_sup_right

example (h : ∀ x y z : α, x ⊔ y ⊓ z = (x ⊔ y) ⊓ (x ⊔ z)) : a ⊓ (b ⊔ c) = a ⊓ b ⊔ a ⊓ c := by
  rw [h]
  nth_rw 2 [sup_comm]
  rw [absorb2]
  nth_rw 2 [inf_comm]
  nth_rw 2 [sup_comm]
  rw [h]
  nth_rw 2 [inf_comm]
  rw [← inf_assoc]
  nth_rw 2 [sup_comm]
  rw [absorb1]
  rw [sup_comm]

-- solution:
example (h : ∀ x y z : α, x ⊓ (y ⊔ z) = x ⊓ y ⊔ x ⊓ z) : a ⊔ b ⊓ c = (a ⊔ b) ⊓ (a ⊔ c) := by
  rw [h, @inf_comm _ _ (a ⊔ b), absorb1, @inf_comm _ _ (a ⊔ b), h, ← sup_assoc, @inf_comm _ _ c a,
    absorb2, inf_comm]

example (h : ∀ x y z : α, x ⊔ y ⊓ z = (x ⊔ y) ⊓ (x ⊔ z)) : a ⊓ (b ⊔ c) = a ⊓ b ⊔ a ⊓ c := by
  rw [h, @sup_comm _ _ (a ⊓ b), absorb2, @sup_comm _ _ (a ⊓ b), h, ← inf_assoc, @sup_comm _ _ c a,
    absorb1, sup_comm]
```

```lean ins={2-7,10-15,18-32} collapse={35-46} collapseStyle=collapsible-auto
example (h : a ≤ b) : 0 ≤ b - a := by
    rw [← sub_self a]
    rw [sub_eq_add_neg, sub_eq_add_neg]
    nth_rw 1 [add_comm]
    nth_rw 2 [add_comm]
    apply add_le_add_left
    apply h

example (h: 0 ≤ b - a) : a ≤ b := by
  rw [← zero_add b, ← add_zero a]
  nth_rw 2 [← add_neg_cancel a]
  rw [add_assoc, add_comm (-a) b]
  rw [← sub_eq_add_neg]
  apply add_le_add_left
  apply h

example (h : a ≤ b) (h' : 0 ≤ c) : a * c ≤ b * c := by
  rw [← zero_add (b * c), ← add_zero (a * c)]
  nth_rw 2 [← add_neg_cancel (a * c)]
  rw [add_assoc]
  apply add_le_add_left
  rw [add_comm]
  rw [← sub_eq_add_neg]
  rw [← sub_mul]
  apply mul_nonneg
  · rw [← sub_self a]
    rw [sub_eq_add_neg, sub_eq_add_neg]
    nth_rw 1 [add_comm]
    nth_rw 2 [add_comm]
    apply add_le_add_left
    apply h
  · apply h'

-- solution:
theorem aux1 (h : a ≤ b) : 0 ≤ b - a := by
  rw [← sub_self a, sub_eq_add_neg, sub_eq_add_neg, add_comm, add_comm b]
  apply add_le_add_left h

theorem aux2 (h : 0 ≤ b - a) : a ≤ b := by
  rw [← add_zero a, ← sub_add_cancel b a, add_comm (b - a)]
  apply add_le_add_left h

example (h : a ≤ b) (h' : 0 ≤ c) : a * c ≤ b * c := by
  have h1 : 0 ≤ (b - a) * c := mul_nonneg (aux1 _ _ h) h'
  rw [sub_mul] at h1
  exact aux2 _ _ h1
```

```lean ins={1,3-10} collapse={13-17} collapseStyle=collapsible-auto
#check nonneg_of_mul_nonneg_left
example (x y : X) : 0 ≤ dist x y := by
  have h₀ : 0 ≤ 2 * dist x y := by
    rw [two_mul, ← dist_self x]
    nth_rw 3 [dist_comm]
    apply dist_triangle
  rw [mul_comm] at h₀
  apply nonneg_of_mul_nonneg_left
  apply h₀
  norm_num

-- solution:
example (x y : X) : 0 ≤ dist x y :=by
  have : 0 ≤ dist x y + dist y x := by
    rw [← dist_self x]
    apply dist_triangle
  linarith [dist_comm x y]
```