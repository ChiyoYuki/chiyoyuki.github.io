---
title: 博客折腾指北0x01 - 博客与笔记
published: 2025-11-09T22:21:28+08:00
updated: 2025-11-09T22:21:28+08:00
description: "我突然发现我可以把一篇博文拆成好几篇来水"
image: "./cover.jpg"
tags: ["博客", "Astro", "Fuwari", "MkDocs"]
category: "折腾"
draft: true
lang: ""
---

# 博客与笔记

本篇文章主要叙述安装博客与将原有的笔记页面以外链形式加入。

这篇文章大多是准备部分，
按照文档按部就班来就可以那种，
我这种半吊子水平写出来的文章估计参考价值不大，
清酌情参考。

## 安装

::github{repo="saicaca/fuwari"}

先在电脑上安装好 `node` 和 `npm` 然后执行 `npm create fuwari@latest` 就行。
因为我用的是 `pnpm` ，所以对应的指令是 `pnpm create fuwari@latest` 。
当然也可以通过官方仓库 `README.md` 中 [从模板创建](https://github.com/new?template_name=fuwari&template_owner=saicaca) 的方法。

然后在博客主文件夹下执行 `pnpm install` 来安装依赖。
没有 `pnpm` 的话需要先执行 `npm install -g pnpm` 安装。

## 基础配置

### `./astro.config.mjs`

因为我习惯将静态页面部署到 Github Pages 上，
参照[官方配置](https://docs.astro.build/zh-cn/guides/deploy/github/)进行配置，
主要修改了 `site` 和 `base` 两项。

### `./src/config.ts`

这个文件需要修改的会比较多，
好在[官方示例](https://github.com/saicaca/fuwari/blob/main/src/config.ts)给的注释都很全面，
对着修改就好。

## 笔记页面

::github{repo="squidfunk/mkdocs-material"}

我觉得点进去笔记页面的基本都能看出来笔记页面与博客页面格格不入。
那是因为笔记页面采用了[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)。  
（之前跟别人写另一个文档的时候被吐槽这个框架太性冷淡风了orz）

按照官方文档将其部署到另一个仓库中，
就可以通过 `$DOMAIN/$REPO-NAME` 访问子页面。

比如说我将笔记部署到了 `chiyoyuki/note` 仓库中，
我就可以通过 `chiyoyuki.github.io/note` 访问笔记页面

（与 `$NAME.github.io` 仓库下子页面命名冲突的情况我还没试过）

> 本文封面为[電竜ライ](https://www.pixiv.net/users/1799712)所绘制的[作品](https://x.com/key_official/status/1986403190108221904)
