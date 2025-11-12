---
title: 博客折腾指北0x00 - 那些随风而散的过往
published: 2025-11-07T16:26:59+08:00
updated: 2025-11-07T16:26:59+08:00
description: "我想起来了，我全都想起来了，原来我想做的是技术型博主啊"
image: "./cover.jpg"
tags: ["博客", "Astro", "Fuwari", "MkDocs", "Hexo", "Wordpress", "Sakurairo"]
category: "随笔"
draft: true
lang: ""
---

# 博客与笔记

在这个博客上似乎已经刷了一周的绿瓷砖了（目移），
填了点有的没的小功能，
虽然大多数都是从别人那里抄的，
但暂且记录一下，
从别人那里借鉴的内容我会附上原链接。

作为博客折腾指北的序，
所以我不妨从头讲起，
讲点没人想听的故事。

## 我过去与现在的网站（非技术部分）

### 在一切开始之前

最开始是为什么有搭建一个网站的想法呢？

我也记不得了，
虽然我手中有几个

### ThinkPad & Apache2

大概是 54 年夏天，我还在原专业的时候，
当时手头主用的电脑还是那台 `ThinkPad` 小黑
（有关于这台大概产于 43 年的传奇电脑的故事我感觉以后还能写个两三篇文章）。
因为电脑性能不足甚至难以运行 Win10 ，
我就给它装了一个 Debian 12 先用着。

在了解了一些 IP 地址和域名之后，
我抱着试试玩的心态在浏览器栏输入了 `127.0.0.1` ，
想看看能蹦出来什么东西。
其实当时本来觉得什么都不会有，
但不知是系统预装还是有软件依赖，
总之系统上安装了 apache2 ，
而且还是默认启动的。
于是我便看到了 apache2 的默认页面。

因为页面是全英文的，
而偏偏我英文还~~本当下手~~，
在查阅了些相关资料后，
我大概 ~~（完全没有）~~ 知道了这个页面是什么。
起码知道了这个页面 html 文件的位置，
于是我把我当周 C 语言的作业放了上去（传给舍友），
替换原有的默认 html 界面。
这样在连接宿舍 WiFi 之后访问电脑 IP
（啊对对，局域网是这样的），
就能看到这份作业。

这大概就是我某种意义上的**第一个网站**，
虽然它既不能在互联**网**上访问，
看上去也不像是一个**站**点。

我是~~杀软~~二次元，
看到这个简陋的界面，
第一反应就是找点法子寻思美化一下。
于是在一番搜索后我找到了 Jekyll ，
听说 Github 就是使用 Jekyll 生成页面的就打算试试，
不过可惜的是当时我似乎因为没有安装成功放弃了。

::github{repo="jekyll/jekyll"}

于是在另一番搜索后我又找到了 Hexo ，
果断安装，
阅读文档和教程的时候发现可以免费部署到 Github Pages 上，
这下不仅美化解决了，
也顺带解决了公网访问的问题。
那段时间基本也就是尝试各个主题，
ParticleX、ShokaX什么的都试了一遍
（你问我怎么找的？搜索栏里填一下 `anime` 就出来了）
最后因为弟弟君的原因选了 gal 主题。
不过主题试了很多，
但是基本没有内容产出。

::github{repo="hexojs/hexo"}
::github{repo="theme-particlex/hexo-theme-particlex"}
::github{repo="theme-shoka-x/hexo-theme-shokaX"}
::github{repo="ZEROKISEKI/hexo-theme-gal"}

那个学期很快就结束了……

### RaspberryPi & Wordpress

新学期伊始，
我突然反应过来一个问题：

> 我博客扔到 Github 上，那我 Apache 怎么办？

### Mathematics & MkDocs

### Astro & Fuwari

## Bangumi 页面

完全抄[霞葉](https://kasuha.com/)的文章[Fuwari 功能增强 Episode2](https://kasuha.com/posts/fuwari-enhance-ep2/)来的。

考虑到我并没有做什么自己的修改，故不再重复叙述实现步骤，仅附上原文链接。

## 评论区

> 本小节代码主要修改自[阿汐](https://axi404.top/)的文章[在 Astro 中使用 Waline](https://axi404.top/blog/waline-install)

::github{repo="walinejs/waline"}

:::note[有关上游仓库 saicaca/fuwari 对评论区的支持计划]
详见[pr #37](https://github.com/saicaca/fuwari/pull/37)
:::

:::tip[实现]
本博客基于 Waline 评论系统实现该功能，
如不想通过该方法方法实现，
请查阅其他文章。  
p.s. 如想基于 [Disqus](https://disqus.com/) 、
[Giscus](https://giscus.app/)
或 [Twikoo](https://twikoo.js.org/) 评论系统，
可参照 [pr #37](https://github.com/saicaca/fuwari/pull/37)
进行修改
:::

1.

## 杂七杂八

### 侧栏统计数据

### 更精细的时间和生成页面脚本

### 图标

### 动态签名

### 邮箱转发

> 本文封面为[花見リロ](https://www.pixiv.net/users/23848571)所绘制的[道路：末日](https://www.pixiv.net/artworks/128488941)
