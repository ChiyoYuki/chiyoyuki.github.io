---
title: 博客折腾指北0x01
published: 2025-11-07T16:26:59+08:00
updated: 2025-11-07T16:26:59+08:00
description: "我想起来了，我全都想起来了，原来我想做的是技术型博主啊"
image: "./cover.jpg"
tags: ["博客", "Astro", "fuwari"]
category: "技术"
draft: false
lang: ""
---

# 博客折腾指北0x01

在这个博客上似乎已经刷了一周的绿瓷砖了（目移），填了点有的没的小功能，虽然大多数都是从别人那里抄的，但暂且记录一下，从别人那里借鉴的内容我会附上原链接。

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

## 友链页面

::github{repo="cworld1/astro-theme-pure"}

友链界面最开始参考了AULyPc的文章[给你的Fuwari添加一个友链页面](https://aulypc1.github.io/posts/website/add_friendspage_in_fuwari/)，
但后来在逛 [Axi's Blog](https://axi404.top/links) 的时候很喜欢他的友链界面和朋友圈，
于是顺藤摸瓜找到了 [Pure 主题](https://github.com/cworld1/astro-theme-pure)，
然后把友链相关的部分抄了过来，
具体步骤大致如下：

1. 仿照 [Pure 主题配置](https://github.com/cworld1/astro-theme-pure/blob/main/public/links.json)
   建立 `./public/links.json` 文件，
   以下为示例：

   ```json title="./public/links.json"
   {
     "friends": [
       {
         "id_name": "my-favorite-links",
         "desc": "个人收藏",
         "link_list": [
           {
             "name": "空と海",
             "intro": "就算活著沒有意義，偶而還是會碰到好事的。",
             "link": "https://chiyoyuki.uk",
             "avatar": "https://chiyoyuki.uk"
           },
           {
             "name": "填写示例",
             "intro": "这是一个示例",
             "link": "localhost:4321",
             "avatar": "这里填写对方的头像地址"
           }
         ]
       },
       {
         "id_name": "my-friends-links",
         "desc": "先友后链",
         "link_list": []
       },
       {
         "id_name": "my-links-friends",
         "desc": "先链后友",
         "link_list": []
       },
       {
         "id_name": "special-links",
         "desc": "特殊链接",
         "link_list": [
           {
             "name": "异次元之旅",
             "intro": "我们一起去萌站成员的星球旅行吧！",
             "link": "https://travel.moe/go.html",
             "avatar": "https://icp.gov.moe/images/ico400.png"
           }
         ]
       }
     ]
   }
   ```

   在 `./src/components/` 文件夹下新建 `links/FriendsList.astro` 文件

   ```astro title="./src/components/links/FriendsList.astro"
   ---
   import { Image } from "astro:assets";

   interface friend {
    avatar: string;
    name: string;
    intro: string;
    link: string;
   }

   interface friend_list {
    id_name: string;
    desc: string;
    link_list: friend[];
   }

   function shuffle(arr: friend[]) {
    return arr.sort(() => Math.random() - 0.5);
   }

   interface Props {
    title?: string;
    list: friend_list;
   }
   const { title, list: friendList, ...props } = Astro.props;
   ---

   {title && <h2 id={friendList.id_name}>{title}</h2>}
   <div class="grid gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3" {...props}>
     {
       friendList.link_list.length > 0 ? (
         shuffle(friendList.link_list).map((frd: friend) => (
           <a href={frd.link} target="_blank" class="no-underline">
             <div class="group relative h-full overflow-hidden rounded-2xl border bg-background px-2.5 py-1.5 transition-colors hover:bg-muted sm:px-4 sm:py-2">
               <div class="relative z-10 flex h-full items-center gap-3">
                 {/* avatar */}
                 <div class="relative h-14 w-14 min-w-14 overflow-hidden rounded-full">
                   <Image
                     class="my-0 bg-white"
                     src={frd.avatar}
                     height={80}
                     width={80}
                     alt="avatar"
                     loading="lazy"
                   />
                   <div class="absolute start-0 top-0 h-full w-full">
                     <div class="flex h-full w-full items-center justify-center rounded-full bg-foreground opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50">
                       <svg
                         xmlns="http://www.w3.org/2000/svg"
                         width="32"
                         height="32"
                         viewBox="0 0 24 24"
                         fill="none"
                         stroke-width="2.5"
                         stroke-linecap="round"
                         stroke-linejoin="round"
                         class="me-2 stroke-background"
                       >
                         <line
                           x1="5"
                           y1="12"
                           x2="19"
                           y2="12"
                           class="translate-x-4 scale-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:scale-x-100"
                         />
                         <polyline
                           points="12 5 19 12 12 19"
                           class="translate-x-0 transition-all duration-300 ease-in-out group-hover:translate-x-1"
                         />
                       </svg>
                     </div>
                   </div>
                 </div>
                 {/* details */}
                 <div class="flex flex-col gap-y-1">
                   <p class="my-0 line-clamp-1 text-sm">{frd.name} </p>
                   <p class="my-0 line-clamp-1 text-xs text-muted-foreground">
                     {frd.intro}
                   </p>
                 </div>
               </div>
               {/* avatar bg */}
               <Image
                 class="absolute -start-2 top-0 z-0 my-0 h-full w-2/3 bg-white object-cover opacity-15"
                 src={frd.avatar}
                 height={80}
                 width={80}
                 alt="avatar bg"
                 loading="lazy"
                 style={{
                   maskImage:
                     "linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
                   msMaskImage:
                     "-ms-linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
                   WebkitMaskImage:
                     "-webkit-linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
                 }}
               />
             </div>
           </a>
         ))
       ) : (
         <p>Nothing here.</p>
       )
     }
   </div>
   ```

   在 `./src/pages` 目录下创建 `friends.astro` 文件：

   ```astro {"请自行修改这一部分":23-32} ins={"在这里填写你的申请要求":104} title="./src/pages/friends.astro"
    ---
    import links from "public/links.json";
    import Waline from "../components/Waline.astro";
    import I18nKey from "../i18n/i18nKey";
    import { i18n } from "../i18n/translation";

    // import config from 'virtual:config'

    import Markdown from "@components/misc/Markdown.astro";
    import FriendList from "@/components/links/FriendsList.astro";
    // import PageLayout from '@/layouts/CommonPage.astro'
    import MainGridLayout from "@/layouts/MainGridLayout.astro";

    const headings = [
     { depth: 2, slug: "common-links", text: "Common Links" },
     { depth: 2, slug: "special-links", text: "Special Links" },
     { depth: 2, slug: "apply-links", text: "Apply Links" },
    ];

    const { friends } = links;
    // const linksConf = config.integ.links
    const linksConf = {
     // Yourself link info
     applyTip: [
      { name: "Name", val: "空と海" },
      { name: "Desc", val: "就算活著沒有意義，偶而還是會碰到好事的。" },
      { name: "Link", val: "https://chiyoyuki.uk" },
      {
       name: "Avatar",
       val: "https://cravatar.com/avatar/ac3d325212c82a0bed5aac65b37da52e?s=1024",
      },
     ],
    };

    const linkEditPage =
     "https://github.com/ChiyoYuki/chiyoyuki.github.io/tree/main/public/links.json";
    ---

    <MainGridLayout
      title={i18n(I18nKey.friends)}
      description={i18n(I18nKey.friends)}
    >
      <div
        class="flex w-full rounded-[var(--radius-large)] overflow-hidden relative min-h-32"
      >
        <div class="card-base z-10 px-9 py-6 relative text-90 w-full">
          <p>怎么可能有顺序呢，当然是随机的~ It's random</p><br />
          <h2 id="common-links">个人收藏</h2>
          <FriendList list={friends[0]} /><br />
          <h2 id="special-links">先友后链</h2>
          <FriendList list={friends[1]} /><br />
          <h2 id="special-links">先链后友</h2>
          <FriendList list={friends[2]} /><br />
          <h2 id="special-links">特殊链接</h2>
          <FriendList list={friends[3]} /><br />

          <!-- apply-links -->
          <Markdown class="mt-2">
            <h2 id="small-circle">Small Circle</h2>
            <div id="friend-circle-lite-root" class="not-prose">Loading...</div>
            <script>
              import "@/styles/fc.css";

              import { FriendCircle } from "@/plugins/friend-circle";

              const fc = new FriendCircle();
              fc.init({
                private_api_url:
                  "https://raw.githubusercontent.com/ChiyoYuki/Friend-Circle-Lite/refs/heads/page/",
                page_turning_number: 10,
                error_img:
                  "https://cravatar.cn/avatar/57d8260dfb55501c37dde588e7c3852c",
              });
              fc.load();
            </script>

            <h2 id="apply-links">Apply Links</h2>
            <p>本站信息（点击即可复制）:</p>
            <blockquote
              class="not-prose grid grid-cols-[auto_1fr] gap-x-2 break-words border-s-4 ps-4"
            >
              {
                linksConf.applyTip.map(({ name, val }) => {
                  const script = `navigator.clipboard.writeText('${val}');document.dispatchEvent(new CustomEvent('toast',{detail:{message:'Copied "${val}" to clipboard!'}}))`;
                  return (
                    <>
                      <span class="text-end">{name}:</span>
                      <samp class="cursor-pointer" onclick={script}>
                        {val}
                      </samp>
                    </>
                  );
                })
              }
            </blockquote>
            <p>
              可通过下方留言或 <a href={linkEditPage} target="_blank">提交 PR</a> 申请友链。此外申请说明：<br
              />
              Apply your link by leaving comment or <a
                href={linkEditPage}
                target="_blank">Submitting a PR</a
              >. Additional info:
            </p>

          </Markdown>
        </div>
      </div>
    </MainGridLayout>
   ```

2. 修改i18n信息，
   在 `./src/i18n/i18nKey.ts` 文件中填入 `friends = "friends",` 一项：

   ```typescript ins={6} title="./src/i18n/i18nKey.ts"
   enum I18nKey {
     ...
     author = "author",
     publishedAt = "publishedAt",
     license = "license",
     friends = "friends",
     ...
   }
   ```

   修改 `./src/i18n/languages` 下的文件，此以 `zh_CN.ts` 为例：

   ```typescript ins={6} title="./src/i18n/i18nKey.ts"
   export const zh_CN: Translation = {
     ...
     [Key.author]: "作者",
     [Key.publishedAt]: "发布于",
     [Key.license]: "许可协议",
     [Key.friends]: "友链",
     ...
   }
   ```

3. 将友链界面添加至顶栏

   修改 `./src/types/config.ts`

## Bangumi 页面

## 随记页面

## 评论区

## 杂七杂八

### 侧栏统计数据

### 图标

### 生成页面脚本

> 本文封面为[電竜ライ](https://www.pixiv.net/users/1799712)所绘制的[作品](https://x.com/key_official/status/1986403190108221904)
