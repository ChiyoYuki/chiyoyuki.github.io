---
title: AtCoder Beginner Contest 431
published: 2025-11-08T22:39:17+08:00
updated: 2025-11-08T22:39:17+08:00
description: "A/B/C/D; rk2294"
image: ""
tags: ["cpp", "atc"]
category: "算竞"
draft: false
lang: ""
---

# [AtCoder Beginner Contest 431](https://atcoder.jp/contests/abc431) 记录

大概是复健第一场 atc （上次 430 打得太烂被我除名了）

## [A - Robot Balance](https://atcoder.jp/contests/abc431/tasks/abc431_a)

> 2 sec / 1024 MiB / 100 pts

### Problem Statement

Takahashi can combine a head part and a body part to create a robot. A robot falls over if the weight of the head part is greater than the weight of the body part.

Currently, he has one head part and one body part. The weight of the head part is $H$ grams, and the weight of the body part is $B$ grams.

He wants to make the body part heavier so that the robot does not fall over. Find how many more grams the body part needs to be made heavier so that his robot does not fall over.

### Constraints

- $1\le H\le100$
- $1\le B\le100$
- All input values are integers.

---

### Input

The input is given from Standard Input in the following format:

```
$H$ $B$
```

### Output

Print the answer.

---

### 思路

本题只需要判断 $H$ 是否小于等于 $B$ 即可，
小于等于输出 $0$ ，反之输出 $H-B$ 。
最基本的分支结构练习，没什么好说的。

### 代码

```cpp
#include<bits/stdc++.h>

using namespace std;

int main() {
  int h,b;
  cin >> h >> b;
  cout << max(0,h-b);
  cout << '\n';
  return 0;
}
```

## [B - Robot Weight](https://atcoder.jp/contests/abc431/tasks/abc431_b)

> 2 sec / 1024 MiB / 200 pts

### Problem Statement

There is a robot, and initially the weight of the robot is $X$. This robot has $N$ types of parts that can be attached simultaneously: type $1,$ type $2,\ldots,$ type $N$. The weight of the type $i\ (1\le i\le N)$ part is $W _ i$. Initially, none of the $N$ types of parts are attached to the robot.

Process the following $Q$ queries in order. The $i$\-th query $(1\le i\le Q)$ is represented by an integer $P _ i$ and is as follows:

- If the type $P _ i$ part is not currently attached to the robot, attach it; if it is attached, remove it. Then, print the current weight of the robot.

### Constraints

- $1\le X\le100$
- $1\le N\le100$
- $1\le W _ i\le100\ (1\le i\le N)$
- $1\le Q\le100$
- $1\le P _ i\le N\ (1\le i\le Q)$
- All input values are integers.

---

### Input

The input is given from Standard Input in the following format:

```
$X$
$N$
$W _ 1$ $W _ 2$ $\ldots$ $W _ N$
$Q$
$P _ 1$
$P _ 2$
$\vdots$
$P _ Q$
```

### Output

Output $Q$ lines. The $i$\-th line $(1\le i\le Q)$ should contain the result of processing the $i$\-th query.

---

### 思路

将第 $i$ 个零件是否安装在机器人上用逻辑 `true` 和 `false` 表示，
不难发现每次 $P$ 操作就是在对这个零件进行 `xor` 操作。

所以只需要单开一个布尔数组用以记录零件是否被安装，
然后每次操作根据被操作零件当前状态对总重量进行加减，
最后对应布尔变量执行异或操作即可。

需要注意的是机器人初始重量为 $X$ 。

当然像我一样直接开一个 `pair` 也可以。

### 代码

```cpp
#include<bits/stdc++.h>

using namespace std;

int main() {
  int x,n;
  cin >> x >> n;
  vector<pair<int,int>> w(n,{0,0});
  for(int i = 0; i < n; i++) {
    cin >> w[i].first;
  }
  int q;
  int p;
  cin >> q;
  for(int i = 0; i< q; i++) {
    cin >> p;
    p--;
    if(w[p].second) {
      x -= w[p].first;
    }
    else {
      x += w[p].first;
    }
    w[p].second = !w[p].second;
    cout << x <<'\n';
  }
  return 0;
}
```

## [C - Robot Factory]

> 2 sec / 1024 MiB / 300 pts

### Problem Statement

Takahashi can combine a head part and a body part to create a robot. A robot falls over if the weight of the head part is greater than the weight of the body part.

Currently, he has $N$ head parts and $M$ body parts. The weight of the $i$\-th $(1\le i\le N)$ head part is $H _ i$ grams, and the weight of the $i$\-th $(1\le i\le M)$ body part is $B _ i$ grams.

He wants to create a total of $K$ robots that do not fall over by appropriately combining the parts he has. Determine whether he can achieve his goal by combining the parts well.

Here, a part cannot be used to create multiple robots, and two or more head parts (or two or more body parts) cannot be used to create one robot.

### Constraints

- $1\le N\le2\times10 ^ 5$
- $1\le M\le2\times10 ^ 5$
- $1\le K\le\min\lbrace N,M\rbrace$
- $1\le H _ i\le10 ^ 9\ (1\le i\le N)$
- $1\le B _ i\le10 ^ 9\ (1\le i\le M)$
- All input values are integers.

---

### Input

The input is given from Standard Input in the following format:

```
$N$ $M$ $K$
$H _ 1$ $H _ 2$ $\ldots$ $H _ N$
$B _ 1$ $B _ 2$ $\ldots$ $B _ M$
```

### Output

Print `Yes` if Takahashi can combine the parts well to create $K$ robots that do not fall over; otherwise, print `No`.

### 思路

题目是要在数列 $\{H_N\}$ 和 $\{B_M\}$ 中找到 $K$ 个完全不同的二元对 $H_i\leq B_j$，
所以只需考虑最小的 $K$ 个 $H$ 和最大的 $K$ 个 $B$ 是否可以配对即可。

最开始在敲代码的时候犯了“田忌赛马式”的错误，用最小的 $H$ 去和最大的 $B$ 配对。
需要注意的是在保留上文提及的 $K$ 个元素后，应当以第 $i$ 小的 $H$ 和第 $i$ 小的 $B$ 配对。

### 代码

```cpp
#include<bits/stdc++.h>

using namespace std;

int main() {
  int n,m,k;
  cin >> n >> m >> k;
  vector<int> h(n),b(m);
  for(int i = 0; i < n; i++) {
    cin >> h[i];
  }
  for(int i = 0; i < m; i++) {
    cin >> b[i];
  }
  sort(h.begin(),h.end());
  sort(b.begin(),b.end());
  for(int i = 0; i < k; i++) {
    if(h[i] > b[m-k+i]) {
      cout << "No";
      return 0;
    }
  }
  cout << "Yes";
  return 0;
}
```

## [D - Robot Customize](https://atcoder.jp/contests/abc431/tasks/abc431_d)

> 2 sec / 1024 MiB / 400 pts

### Problem Statement

There is a robot consisting of a head and a body. This robot has $N$ types of parts that can be attached simultaneously: type $1,$ type $2,\ldots,$ type $N$. The weight of the type $i\ (1\le i\le N)$ part is $W _ i$. Each part has a different **happiness** when attached to the head versus when attached to the body. The happiness when the type $i\ (1\le i\le N)$ part is attached to the head is $H _ i$, and the happiness when attached to the body is $B _ i$.

The robot falls over if the weight of the head is greater than the weight of the body. Here, the weight of the head and the weight of the body are the sums of the weights of the parts attached to the head or body, respectively.

Takahashi wants to attach all $N$ types of parts to the robot, one of each. Find the maximum possible sum of the happiness of all parts when the parts are attached without causing the robot to fall over.

### Constraints

- $1\le N\le500$
- $1\le W _ i\le500\ (1\le i\le N)$
- $1\le H _ i\le10 ^ 9\ (1\le i\le N)$
- $1\le B _ i\le10 ^ 9\ (1\le i\le N)$
- All input values are integers.

---

### Input

The input is given from Standard Input in the following format:

```
$N$
$W _ 1$ $H _ 1$ $B _ 1$
$W _ 2$ $H _ 2$ $B _ 2$
$\vdots$
$W _ N$ $H _ N$ $B _ N$
```

### Output

Print the maximum possible sum of the happiness of all parts when the parts are attached without causing the robot to fall over.

### 思路

不妨先让所有零件组成身体，然后从中选取一部分零件组成头部，
组成头部零件的总重量要小于等于身体的总重量。

于是题目可以转化为总容纳质量为 $\frac{\sum_{i=1}^{N} W}{2}$ ，
每个物品价值为 $H_i-B_i$ 的 01 背包问题，
dp 求解即可。

写代码的时候忘了 [01 背包 dp](https://oi-wiki.org/dp/knapsack/) 怎么写，现去看的 wiki 。

### 代码

```cpp
#include<bits/stdc++.h>

using namespace std;

int main() {
  int n;
  long long w = 0,happy = 0;
  cin >> n;
  vector<pair<int,int>> a(n);
  for(int i = 0; i<n; i++) {
    cin >> a[i].first;
    int h,b;
    cin >> h >> b;
    a[i].second = h-b;
    happy += b;
    w+=a[i].first;
  }
  w >>= 1;
  vector<long long> dp(w+1);
  for(int i = 0; i < n;i ++) {
    for(int j = w; j >= a[i].first; j --) {
      dp[j] = max(dp[j],dp[j-a[i].first]+a[i].second);
    }
  }
  cout << happy + dp[w];
  return 0;
}
```
