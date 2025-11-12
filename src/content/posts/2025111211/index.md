---
title: 博客折腾指北0x03 - 随记、一言或是别的什么名字
published: 2025-11-12T11:32:02+08:00
updated: 2025-11-12T11:32:02+08:00
description: "今天说点什么怪话好呢？"
image: "./cover.jpg"
tags:
  [
    "博客",
    "blog",
    "Astro",
    "Fuwari",
    "联邦宇宙",
    "Fediverse",
    "Misskey",
    "Mastodon",
    "一言",
    "微语",
    "随记",
    "微博客",
  ]
category: "折腾"
draft: false
lang: ""
---

# 随记页面

> 本小节部分灵感来自于[微语/说说/微博/Mricoblog 嵌入博客网页](https://www.ftls.xyz/posts/2023-08-13-mricoblog/)  
> 本文代码修改自 [Misskey 文档 - 嵌入网站](https://misskey-hub.net/cn/docs/for-users/features/embed/)

::github{repo="misskey-dev/misskey"}

:::tip[实现]
本博客基于内嵌 [Misskey](https://misskey-hub.net/) 时间线实现该功能，
如不想通过该方法方法实现，
请查阅其他文章。
:::

在此之前我使用过 Wordpress 部署博客，当时选用的主题是 [Sakurairo](https://github.com/mirai-mamori/Sakurairo) ，
印象当中是有一个页面可以用来记录一些只言片语 ~~方便我随地大小写（bushi）~~。

最近在浏览他人博客的时候，在 [Shiro](https://shiro.love/) 的博客中又看到了[类似的界面](https://shiro.love/says)。
于是便打算给自己的博客也弄一个。
am_g_7
但是当前部署的静态博客有个问题，
在移动端设备弄一个 git 和 Obsidian 来写这种短博文有些太过不便了。
于是我最后采用了内嵌外部 SNS 的方法。

之前被别人介绍过[联邦宇宙](https://zh.wikipedia.org/wiki/%E8%81%94%E9%82%A6%E5%AE%87%E5%AE%99)
（[Fediverse](https://en.wikipedia.org/wiki/Fediverse)）的存在，
对这种去中心化但又互联互通的结构颇有好感。
在对比了一些平台后，
我采用了 [Misskey](https://misskey-hub.net/)
（主要是界面美观还可以插入表情包）。
当然你也可以选择 [Mastodon](https://joinmastodon.org) 或是别的什么，
在此贴一篇基于 Mastodon 实现的参考博文：

[Hugo 博客集成 Mastodon](https://www.eallion.com/hugo-blog-embed-mastodon/)

:::warning[使用联邦宇宙时的注意事项]
请遵循你所使用实例的 **基本规则、服务条款** 等内容，
建议有条件的人可以自行搭建实例。
:::

以下为基于 Misskey 的实现方法：

1. 在你喜欢的实例上注册 Misskey 账号

2. 在 `./src/pages/` 目录下创建 `misskey.astro` 文件

   ```astro title="./src/pages/misskey.astro" collapse={8-27} collapseStyle=collapsible-auto
   ---
   import { getEntry, render } from "astro:content";

   import Markdown from "@components/misc/Markdown.astro";

   import MainGridLayout from "../layouts/MainGridLayout.astro";

   const thisPost = await getEntry("spec", "misskey");

   if (!thisPost) {
    throw new Error("This page content not found");
   }

   const { Content } = await render(thisPost);
   ---

   <MainGridLayout title="随记" description="私の Misskey">
     <div
       class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32"
     >
       <div class="card-base z-10 px-9 py-6 relative w-full">
         <Markdown class="mt-2">
           <Content />
         </Markdown>
       </div>
     </div>
   </MainGridLayout>
   ```

3. 在 `./src/content/spec/` 文件夹下创建 `misskey.md` 文件，
   并在其中合适位置插入如下代码段

   ```markdown title="./src/content/spec/misskey.md" "<HOST>" "<USER_ID>" "<RANDOM>"
   ...

   <iframe
     src="https://<HOST>/embed/user-timeline/<USER_ID>"
     data-misskey-embed-id="v1_<RANDOM>"
     loading="lazy"
     referrerpolicy="strict-origin-when-cross-origin"
     style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
   ></iframe>
   <script defer src="https://<HOST>/embed.js"></script>
   ...
   ```

   并作如下修改：
   - `<HOST>`: Misskey 服务器的主机名
   - `<USER_ID>`: 要嵌入的用户的 ID（不是以 @ 开头的用户名）
   - `<RANDOM>`: 随机字符串（如果使用 embed.js ，则为必填项。如果同一页面中有多个嵌入代码，请确保它们不重复）

   > 上述代码也可以在 `Misskey 个人主页-右上角三个点-嵌入-此用户的帖子` 处自动生成

4. 修改 `./src/config.ts`

   ```typescript title="./src/config.ts" ins={5-8}
   ...
   export const navBarConfig: NavBarConfig = {
     links: [
       ...
       {
        name: "随记",
        url: "/fediverse/",
       },
       ...
     ]
   }
   ...
   ```

最终效果请前往[随记](../../fediverse)页面查看

> 本文封面为作品[anemoi](https://key.visualarts.gr.jp/anemoi/)中的[CG](https://key.visualarts.gr.jp/anemoi/gallery.html)
