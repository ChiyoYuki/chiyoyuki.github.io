---
title: 55 年秋 12 周周记
published: 2025-11-03T13:09:03+08:00
updated: 2025-11-09T01:39:03+08:00
description: "要记得学数学啊！"
image: "cover.png"
tags: ["2025Autumn"]
category: "周记"
draft: false
lang: ""
---

# 55 年秋 12 周周记

## 学习

### 计算机

#### 软件测试与验证

这周讲了基于逻辑表达式的测试。
引入了条件和判定的定义后自下而上讲了判定覆盖、条件覆盖、判定-条件覆盖和修正的判定-条件覆盖。

满足条件不一定满足判定这一点初看有些反直觉，但是花店时间想明白了也很好理解。

最后一种修正的判定-条件覆盖实际运用时需要计算的内容可能略大。

但是写本周作业的时候太过于注意本周所学内容了，导致把分支覆盖率误当作判定覆盖度计算。
也算是侧面反映了及时复习过往所学内容的必要性。

#### 编译原理与技术

本周开始学习语法分析，引入了上下文无关语法（CFG）以实现正则表达式无法满足的需求。
主观感觉上 CFG 采用了递推的方式，但是我容易在这里产生一个思维误区，
比如说认为 $S \rightarrow aSb$ 代表 `如果S满足文法，则aSb也满足文法`。
不过好在多看了几个例子后也算是从思维误区中跳出来了。

lab方面老师没有回复常数判定的问题，只能先按照自己的理解先设计自动机了。

#### 操作系统

本周无课。

#### 软件分析与验证前沿

阅读了 lec2 课件的第一部分，基本了解了一下 LLVM 的概念。

按照个人理解来讲， LLVM 是在程序语言和操作系统间引入的中间层，
通过将源代码转化为 `.ll` 的中间文件，再转化到对应操作系统的机器码。

lab 方面还是没有解决 docker 镜像的问题，
很奇怪，即使配置了全局代理，还是无法拉取镜像，docker desktop
也无法打开对应界面。 不清楚是不是像 raw.githubusercontent.com 那样 DNS
解析出现了问题需要修改 host 文件。
这周还解决不了的话就只能找台电脑挂百度网盘下载了。

#### 竞赛

这周因为看错时间错过了 cf div1+2 ，但是 at abc 倒是按时打了，打得很差。
希望是复健第一场不熟悉的问题，期望接下来几场找到感觉能好起来。

下场 cf 在六号（周四）；abc 在八号（周六）。

#### 其他

这周课外探索其他东西的时间可能确实比较多一点。

##### Astro

这周时间大多花在魔改博客上了， 从 Github 瓷砖便可见一二。

虽然对于 Astro 还是不怎么了解的程度， 但是算是初窥门径了？

目前「关于」页面致谢大概有十个了，
是时候写一篇文章记录一下搭建以及魔改这个博客的经过了。

##### typst

这周又在别人的博客当中看到了 typst 这个语言。
本着`如果一个新事物无意中看到超过三次就要去尝试一下`的原则去了解了一下基本语法。

对我个人而言感觉优缺点都很明显

- 优点是在文章中嵌入数学公式要比 `Markdown`
  方便很多，比如说对于同样的一个麦克斯韦方程组

  $$
  \begin{cases}
  \begin{aligned}
  \nabla \cdot \overset{\rightarrow}{E} & = \frac{\rho_{e}}{\varepsilon_{0}} \\
  \nabla \times \overset{\rightarrow}{E} & = - \frac{\partial\overset{\rightarrow}{b}}{\partial t} \\
  \nabla \cdot \overset{\rightarrow}{B} & = 0 \\
  \nabla \times \overset{\rightarrow}{B} & = \varepsilon_{0}\mu_{0}\frac{\partial\overset{\rightarrow}{E}}{\partial t} + \mu_{0}\overset{\rightarrow}{j}
  \end{aligned}
  \end{cases}
  $$

  这是 `Markdown` 内嵌 `latex` 的代码实现：

  ```latex

  $$
  \begin{equation*}
     \begin{cases}
         \nabla\cdot\vec{E}&=\frac{\rho_e}{\epsilon_0} \\
         \nabla\times\vec{E}&=-\frac{\partial\vec{B}}{\partial t} \\
         \nabla\cdot\vec{B}&=0 \\
         \nabla\times\vec{B}&=\epsilon_0\mu_0\frac{\partial \vec{E}}{\partial t}+\mu_0\vec{j}
     \end{cases}
  \end{equation*}
  $$

  ```

  而这是 `typst` 的代码实现：

  ```typst

  $
  cases(
   nabla dot arrow(E) &= rho_(e) / epsilon _0 \
   nabla times arrow(E) &= - (partial arrow(b)) / (partial t) \
   nabla dot arrow(B) &= 0 \
   nabla times arrow(B) &= epsilon_(0) mu_(0) (partial arrow(E)) / (partial t) + mu_(0) arrow(j)
  )
  $

  ```

  少了很多反斜杠和花括号确实会简便不少。

- 而缺点也很明显，typst 毕竟是一门新兴的标记语言，
  所以对应的支持或是生态都不多。 像是 VuePress、MkDocs、Hexo 乃至
  Github 默认的 Jekyll 这类静态网站生成器都是以渲染 Markdown 为主。
  而目前主流的论文、简历模板则是以 Latex 居多，比如
  [SJTUThsis](https://github.com/sjtug/SJTUThesis)。
  这就导致了 typst 在当前的应用比较受限。

对我个人而言比较适合用来写当前的实验报告和数学作业， 或是先用 typst
写好内容之后通过 pandoc 转为 markdown 或是其他的格式。
（比如说这篇博文就是由 typst 写的，由 pandoc 转为 markdown）

但是貌似对于数学公式的转换不太正确，有些地方还是需要手调一下。

##### git

之前对于 git 的了解仅限于
`git clone`,`git add`,`git commit`,`git push`,`git pull` 这几个。
但是最近逐渐频繁接触到了代码回滚这类的需要，就需要去学一些 git
的其他指令。

这周大概学了一下
`git checkout`切换分支、`git reset`回滚状态、`git merge`合并分支这几个。
还需要找到具体应用场景加以熟练。

### 数学

有希ちゃん啊有希ちゃん，你怎能如此堕落

#### 微分几何

没学，也没看回放，坏。

#### 初等数论

课上补作业导致后半节课跟不上了只能嗯抄笔记。。。

这周应该是讲到原根了。

#### 偏微分方程

没学，也没看回放，只知道讲到了热传导方程，坏中坏。

#### 拓扑学基础

没学，同样没看回放，这周讲到了第四章，坏完了。

不过对于拓扑最开始的地方有了自己的理解。

这周真的真的真的要学数学了，不然期末只能挂科了。

### 日语

语法内容还是没有动，但是单词缓慢推进中......

具体表现大概就是每天想起来了就背一点， 不过距离补全搁置的还差得远，
基本上每天只是背了一点，甚至没有完成 Anki 的当日计划目标。

这个也要坚持啊有希ちゃん！

## 生活

三分钟热度有些过了啊，感觉不是很想写这份周记。但总归还是要改变一点的，所以还是逼着自己写了出来。

周六卿云中环那边有场洛佬的演唱会，本来打算去看看，结果到点了感觉自己太困了，就回学校了。

因为随记页面需要，又重新接触了一下联邦宇宙， 这次没有用之前的 Mastodon，
而是凭着审美选择了 Misskey，
目前打算是拿来作为朋友圈和文件传输助手的平替，
不过目前来看不能完全替代朋友圈的社交属性。 不过拿来记点小点子挺不错的。

既然周记都写晚了，不如接着写点这周周一的事情。

大活边上的工地围栏拆了，这下北门可以直通 711 ，
教书院门前的那条窄路估计也能得到一些分流不至于那么挤。

软测考完了，突击复习效果不错，客观题就错了一个单选。
但是主观题对完答案感觉写的不是那么好。
唉感觉自己还是不太擅长记忆概念定义这一类的。

天气凉了（或者不如说早凉了），感觉周四和间周周二可以在厨房做饭吃了。
~~还能拿来水做饭系列的博文~~

把幸运星的前三集看掉了，发现自己确实很难集中注意力，哪怕是放松的时候。
总会想着去看看手机有没有新消息什么的。
不过不能专心看番这件事听上去也太扯了一点......
上旬先把幸运星看完，接下来就看四叠半好了。

宿舍学习效率确实不高，这周还是得去图书馆

> 本文封面由 [@sevenc_nanashi@voskey.icalo.net](https://voskey.icalo.net/@sevenc_nanashi) 创作，遵循 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) 协议.
