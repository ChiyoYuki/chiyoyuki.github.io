---
title: 程设基础讲义1
published: 2025-11-04T15:26:38+08:00
updated: 2025-11-05T04:46:21+08:00
description: ""
image: ""
tags: []
category: ""
draft: false
lang: ""
---

# 讲义

各位同学下午好。这份讲义的 pdf 和 md 格式我应该在早些时候发到群里了。

理论上来说，我应该讲的是程序设计基础的补充答疑性质课。
考虑到这是学院内的一个非正式课程，没有跟学分啊成绩啊挂钩。
而且我也只是大你们一届的学生，未必讲的多好，
所以如果你听着听着不想听了，可以直接从前门或是后门离开，
不用打招呼，记得拿上个人物品。

出于差不多的原因，我也不会去管在座的各位究竟在干什么，
所以大家不妨往前坐一坐，这样我说话不用那么大声也能省点力气。

以及学院那边需要我弄个签到。。。

在讲正经东西之前，我打算先讲一些自己认为还算必要的内容：

## 如何提问

我先假定提问是建立在`遇见问题需要他人协助解决问题`的基础上，
基于纯粹找茬的提问我们暂且不议。

1. 在提问之前

   有些问题可能别人遇到过且被解决了，已经有一套完整的解决方案，
   比如说配置 VS Code 环境、调整硬盘分区等……  
   所以在提问之前，可以先试着查找聊天记录、使用搜索引擎或是查阅官方文档等

   > 部分中文文档可能存在翻译不及时或是翻译错误的问题，所以我建议直接查阅英文文档原文。

2. 提问当中

   如果你认为确有必要向他人提问，请在提问的时候附上比较详细的信息。

   举个例子，前两天有人在群里提问他的代码为什么在 OJ 上 RE (Runtime Error, 运行时错误)了，但是导致 RE 的原因很多，比如说：

   > 没有任何指责这位同学的意思，只是以此举例解释提问附上完整信息的必要性。
   - `int a = 3 / 0, b = 3 % 0;` 除零错误
   - `int main(){return 1;}` 主函数返回值非零
   - `int a[2]; a[10]=0;` 数组访问越界
   - ……

   如果没有额外信息的话，很难判断出究竟发生了什么错误，所以请在提问他人的时候附上截图、报错信息或是完整代码一类的。  
   如果附上截图的话，请多截一点，有些错误需要结合上下文分析。

以下为正式内容。

---

## switch-case

### switch 语句介绍

switch 语句是一种多路判定语句，
用以判定表达式是否与某个常量匹配，
其中表达式必须为整型值。\[见《C 和指针》4.8\]

其基本结构为

```c
switch(表达式) {
  case 常量1: 语句;
  case 常量2: 语句;
  ...
  default: 语句;
}
```

我们举这样一个例子，
上个学期我总和朋友在环球港不知道吃什么，
所以常常用扔色子的方式解决：

```c
#include<stdio.h>
#include<stdlib.h>
#include<time.h>

int main() {
  srand(time(NULL));
  int randnum = rand() % 6 + 1;
  // 有些同学可能看出来这个 a 生成 1~6 的概率可能不是均匀的。
  // 生成 1 的概率可能略高于 6 的概率。
  // 但这只是一个简单的例子，我们不妨认为我拿的骰子是灌铅的。
  switch(randnum) {
    case 1:
      printf("Burger King");
      break;
    case 2:
      printf("McDonalds");
      break;
    case 3:
      printf("Liu Jie");
      break;
    case 4:
      printf("Xiao Yang");
      break;
    case 5:
      printf("Bao Zai Fan");
      break;
    case 6:
      printf("Xi Jia De");
      break;
    default:
      printf("Cheater!");
      break;
  }
  return 0;
}
```

### break

在 `switch` 语句中，
`case` 只决定了进入分支语句的入口，
而没有决定跳出 `switch` 内部的出口。  
这意味着程序在执行到其他的 `case` 标签时不会自动跳出 `switch` ，
而是按照顺序依次执行接下来的语句。

我们也可以利用这个性质，将表达式的多种取值映射到同一个语句执行，
比如说下面的代码：

```c
switch(randnum) {
  case 1:
    ;
  case 2:
    ;
  case 3:
    printf("Xiao Long Bao");
    break;
  case 4:
    printf("Guan Tang Bao");
    break;
  case 5:
    printf("Nai Huang Zhi Ma");
    break;
  case 6:
    printf("Dou Sha Bao");
    break;
  default:
    printf("Zundamon");
    break;
}
```

利用这个性质提高了小笼包的权重。

### default

在上述这段程序中， `default` 是一个可选项，
由于在程序的语义上并不会出现匹配到 `1~6` 之外的情况，
所以删除 `default` 语句后程序功能并不会受到影响。
但出于其他角度考量，通常建议为 `switch` 语句加上 `default` 分支，
这样易于捕捉到一些潜在的 `缺陷` 。

此外，`default` 的位置并不一定要在 `switch` 语句尾，
这意味着

```c
switch(randnum) {
  case 1: case 2:
    printf("Akane");
    break;
  case 4: case 5:
    printf("Aoi");
    break;
  default:
    printf("Zundamon");
    break;
}
```

```c
switch(randnum) {
  case 1: case 2:
    printf("Akane");
    break;
  default:
    printf("Zundamon");
    break;
  case 4: case 5:
    printf("Aoi");
    break;
}
```

```c
switch(randnum) {
  default:
    printf("Zundamon");
    break;
  case 1: case 2:
    printf("Akane");
    break;
  case 4: case 5:
    printf("Aoi");
    break;
}
```

这三份代码实际执行同样的功能。

## 指针

### 指针的概念

先来快速地过一遍基础内容：

在运行程序时，程序的变量存储在内存中，
内存由若干位（bit）构成，
每八位构成一个字节（byte）。
在内存中，使用地址（Address）来表示字节的位置，
字节的位置与地址之间一一对应。

以下面这段代码为例

```c
#include<stdio.h>

int main() {
  int a = 0x66ccff, b = 0x39c5bb; // 为了便于和指针一起查看值，这里采用 16 进制
  int *pa = &a, *pb = &b;
  printf("pa is %p, and pb is %p\n",pa,pb);
  printf("*pa is %x, and *pb is %x\n",*pa,*pb);
  *pa = 0;
  *pb = *pa;
  printf("a is %x, and b is %x\n",a,b);
  printf("pa is %p, and pb is %p\n",pa,pb);
  printf("*pa is %x, and *pb is %x\n",*pa,*pb);
  return 0;
}
```

指针变量用于存储地址，
我们通过 `指向类型 * 指针变量名` 的方式声明一个指针变量。
比如上文中 `int *pa;` 表示声明了一个存储 `int` 类型地址的变量 `pa`。

需要注意的是连续声明指针变量时，每个指针变量名前都需要有 `*`，
比如 `int* pa,pb;` 中 `pa` 类型为 `int*` 指针，
而 `pb` 类型则是 `int` 整型。

当 `&` 用作一元运算符（而非二元运算符位运算与）时，
用于取一个变量的地址，
比如 `pa = &a`，即为将 `a` 的地址赋给 `pa`；

当 `*` 用作一元运算符（而非二元运算符乘号）时，
用于通过地址间接访问，
比如 `*pa = 0`，即为将 `pa` 指向的变量赋为 `0`。

**正如一般变量一样，未经初始化的指针变量通常指向一个未经分配的地址**
**对该地址进行读写会造成程序错误，应当尽量避免这种状况**

### 指向指针的指针

指针变量同样也是一个变量，
这意味着我们可以声明一个指向指针的指针。
例如：

```c
#include<stdio.h>

int main() {
  int a = 0x66ccff;
  int *pa = &a;
  int **ppa = &pa;
  printf("ppa is %p, and pa is %p\n",ppa,pa);
  printf("*ppa is %p, and *pa is %x\n",*ppa,*pa);
  return 0;
}
```

在这段代码当中，
`int **ppa = &pa` 意味着声明了一个类型为 `int *` 的变量，
其被初始化为变量 `pa` 的地址（即指向变量 `pa` ）

### NULL

C 语言中 `NULL` 在数值上中被定义为 `0`，

```c
#include<stdio.h>

int main() {
  int *a = NULL;
  printf("%p",a);
  return 0;
}
```

任何被赋值为 `NULL` 的指针会指向 `0x0` 的地址。
C 语言保证地址`0`永远不会存储数据，对这个地址进行读写通常会导致错误，
所以在访问指针指向地址之前最好检查指针是否为 `NULL`。

```c
#include<stdio.h>

int main() {
  int *a = NULL;
  printf("%d",*a);
  return 0;
}
```

### 指针传递参数

有时候在调用函数的时候，我们希望改变函数的参数，比如考虑这样一个函数：

传入两个整型变量，令两个数字均变为二者的最大值，但函数返回两个数中的较小值。

```c
int fun(int x,int y) {
  int less_value;
  if(x > y) {
    less_value = y;
    y = x;
  }
  else {
    less_value = x;
    x = y;
  }
  return less_value;
}
```

这个函数看上去像是实现了要求，但是如果在函数外部检查传入的变量，
我们会发现二者的值根本没有发生改变。
这是因为函数的参数被当作函数的内部变量。

```c
#include<stdio.h>

int fun(int x,int y) {
  int less_value;
  if(x > y) {
    less_value = y;
    y = x;
  }
  else {
    less_value = x;
    x = y;
  }
  printf("&x=%p, &y=%p.\n",&x,&y);
  return less_value;
}

int main() {
  int a = 37, b = 42;
  int c = fun(a,b);
  printf("a=%d, b=%d, c=%d.\n",a,b,c);
  printf("&a=%p, &b=%p.\n",&a,&b);
}
```

在这里我们捎带着讲一下变量的作用域：

C 语言的变量分为局部变量和全局变量。

局部变量声明在函数或代码块（即被一对大括号包裹的代码）内部，
其作用域仅在函数或代码块内部，在作用域外无法访问这个变量。

全局变量声明在所有函数之外，通常是在代码顶端，
任何函数都可以访问全局变量。

回到上述函数的问题上来，函数传入的形参作为函数的内部变量，
这意味着在函数内部对参数的修改不会作用到函数外。
我们通过程序的输出结果也可以看出 x 与 a；y 与 b 的地址并不相同。

针对这种情况，我们可以通过传入指针的做法实现函数功能

```c
int fun(int *x,int *y) {
  int less_value;
  if(*x > *y) {
    less_value = *y;
    *y = *x;
  }
  else {
    less_value = *x;
    *x = *y;
  }
  return less_value;
}
```

> 这里需要画个图

### 指针的算数运算

指针可以进行自增、自减操作，也可以加上或减去一个整数

```c
#include<stdio.h>

int main() {
  int a = 0;
  int *p = &a;
  printf("Type int is %d bytes.\n",sizeof(a));
  printf("%p\n",p);
  p ++;
  printf("%p\n",p);
  p --;
  printf("%p\n",p);
  p = p + 3;
  printf("%p\n",p);
  p = p - 3;
  printf("%p\n",p);
  return 0;
}
```

通过上面的例子我们可以看到，
指针进行算数操作时并不是将指针值直接加上对应数值，
而是变化 `数值与指针指向类型的乘积`

> 这里也需要画图

## 一维数组

考虑这样一道题目：

输出数列中的第 $k$ 项。

**Input**

每个测试点输入包括三行：  
第一行包括 $1$ 个整数 $n(1 \leq n \leq 100)$ ，表示数列长度为 $n$；  
第二行包含 $n$ 个整数 $a_1, a_2, \dots, a_n(1 \leq a_i \leq 100)$ ，构成一个数列；  
第三行包括 $1$ 个整数 $k$ ，表示需要输出第 $k(1 \leq k \leq n)$ 个整数。

**Output**

每个测试点输出包括一行：  
第一行包括 $1$ 个整数，即为 $a_k$。

这类问题便可以通过数组解决。

```c
// n == 100
#include<stdio.h>

int main() {
  int n,a[100],k;
  scanf("%d",&n);
  for(int i = 0; i < n; i ++) {
    scanf("%d",&a[i]);
  }
  scanf("%d",&k);
  printf("%d\n",a[k - 1]); // 注意数组是零索引
  return 0;
}
```

```text
100
1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100
42
```

正如字面意思那样，数组是将若干个变量作为一组，
其在内存中连续存储，这也暗示着其与指针存在练习，我们等下就会讲到。

### 声明、初始化、使用

```c
#include<stdio.h>

int main() {
  int a[5] = {2,3,5,7,11};
  for(int i = 0; i < 5; i++) {
    printf("%d ",a[i]);
  }
  printf("\n");
  return 0;
}
```

我们可以通过 `类型名 数组名[元素个数];` 的形式声明一个数组。
比如上文中的 `int a[100]` 就是声明了一个具有100个int类型变量的数组。

需要注意的是数组的下标是从 `0` 开始的，
这意味着数组的第一个元素实际上是 `a[0]`，
具体这样设计的原因接下来讲完数组与指针联系之后会讲到，
我们不妨先放一放。

数组的初始化可以通过这种方式进行：`int a[5] = {2,3,5,7,11}`。  
如果大括号中元素的数目小于数组大小，则剩下的元素会被自动赋为 `0`，
如 `int a[5] = {2,3,5}` 等价于 `int a[5] = {2,3,5,0,0}`，
但是反过来让数组大小小于初始化元素数目显然会报错。
如果在初始化数组时不指定数组元素个数，
则数组元素个数会自动按照初始化列表调整，
如 `int a[] = {2,3,5,7,11}` 等价于 `int a[5] = {2,3,5,7,11}`

### 与指针的关系

我们不妨先来直接看一看数组名究竟代表了什么：

```c
#include<stdio.h>

int main() {
  int a[5] = {2,3,5,7,11};
  printf("a is %p, and the address of a[0] is %p.\n", a, &a[0]);
  return 0;
}
```

很容易注意到数组名的值恰好等于数组第一个元素的地址。
但数组名与指针变量不同之处在于：数组名是一个指针常量，无法被修改；

```c
#include<stdio.h>

int main() {
  int a[5];
  int *b;
  int c = 0;
  b = &c;
  // a = &c;
  return 0;
}
```

> 这里可以通过画图辅助理解

```c
#include<stdio.h>

int main() {
  int a[5] = {2,3,5,7,11};
  printf("a is %p, and the address of a[0] is %p.\n", a, &a[0]);
  printf("(a+1) is %p, and the address of a[1] is %p.\n", a + 1, &a[1]);
  return 0;
}
```

由这个例子我们可以看出，正如上文所说，
数组在内存中是连续存储的，
`a[0]` 与 `a[1]` 在内存上是连续的。

当我们访问 `a[i]` 时，我们实际上在访问的是 `a+i` 指向的元素，即 `*(a+i)` 。

~~考虑到加法运算的可交换性嘛……~~

```c
#include<stdio.h>

int main() {
  int n,a[100],sum = 0;
  scanf("%d",&n);
  for(int i = 0; i < 100; i ++) {
    scanf("%d",&a[i]);
    sum += *(a+i);
    // sum += i[a]; // 可以跑，但是别这么写
  }
  printf("The sum is %d.\n",sum);
  return 0;
}
```

### 零索引

在介绍完数组与指针的联系及通过指针访问数组元素后，
我们可以发现数组下标从 `0` 开始是很自然的。

考虑到网络上已经有现成的[科普视频](https://www.bilibili.com/video/BV1aeHaexETd/)，
我直接在这里 include 进来好了。

<iframe
  src="//player.bilibili.com/player.html?bvid=BV1aeHaexETd&p=1&autoplay=0"
  style="display:inline-block;width:49%;min-width:200px;height:234px;box-sizing:border-box;border:0;vertical-align:top;"
  scrolling="no" frameborder="0" loading="lazy" allowfullscreen>
</iframe>

### 数组越界

同样地，基于指针与数组的联系，
我们可以发现 `int a[10]; a[10]=998244353;` 试图在地址 `a+10` 处进行写操作；
但是数组声明仅对地址 `a+0` 至 `a+9` 进行了分配，
越界访问会同样会引起程序错误。

初学者容易常犯的错误就是在定义了长为 `N` 的数组后访问 `a[N]` ；
所以一般在编写程序时推荐为数组长度预留一些范围。

## 字符串

### 字符串组成

```c
#include<stdio.h>

int main() {
  char str[] = "GLaDOS";
  printf("%d",(int)str[6]);
  return 0;
}
```

字符串本质上是一个字符数组，即 `char []` 。
但与简单的字符数组不同的是，字符串会在数组尾添加一个元素 `'\0'` 作为字符串结束的标志。
`'\0'` 在数值上等于 `0` ，但正如涉及指针时通常使用 `NULL` 一样，
在涉及字符时我们也通常使用 `'\0'` 而非 `0`。

这也意味着一个长度为 `n` 的字符串所占的内存空间为 `n+1` bytes，
结尾额外多出一个 byte 用于存储 `'\0'`。

### 字符串标准库函数

在标准库 `string.h` 中，定义了一些用作字符串操作的函数，我们在此介绍一些：

- `size_t strlen(cs)` ：返回 `cs` 的长度
- `char *strcat(s,ct)` 和 `char *strncat(s,ct,n)`：将字符串 `ct` 连接到 `s` 的尾部，并返回 `s`
- `int strcmp(cs,ct)` 和 `int *strncmp(cs,ct,n)`：`cs` 小于 `ct`返回 `负数` ，等于返回 `0` ，大于返回`正数`（字典序比较）；
- `char *strcpy(s,ct)` 和 `char *strncpy(s,ct,n)`：将字符串 `ct` 复制到 `s` 中，并返回 `s` 。

依旧代码举例

```c
#include<stdio.h>
#include<string.h>

int main() {
  char str1[] = "foo", str2[] ="bar";
  printf("The length of str1 is %d.\n", strlen(str1));
  return 0;
}

```

## 应用

~~写不动不想写了，反正这部分是主观内容，留着找例题自由发挥吧。~~

### 构思循环条件的切入点

### 实际问题转化

### 函数与变量的选取

### 与信息安全数学导论结合

```c
long long pow(long long base, long long exp, long long mod) {
  long long ans = 1;
  for(long long i = 0; i < exp; i++) {
    ans *= base;
  }
  return ans % mod;
}
```

```c
long long pow(long long base, long long exp, long long mod) {
  long long ans = 1;
  for(long long i = 0; i < exp; i++) {
    ans *= base;
    ans %= mod;
  }
  return ans;
}
```

```c
long long binpow(long long base, long long exp, long long mod) {
  // exp = exp % (mod - 1); // If mod is a prime.
  long long ans = 1;
  base %= mod;
  while (exp) {
    if (exp & 1LL) ans = ans * base % mod;
    base = base * base % mod;
    exp >>= 1;
  }
  return ans;
}
```
