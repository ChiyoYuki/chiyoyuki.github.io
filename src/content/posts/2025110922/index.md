---
title: 博客折腾指北0x01 - 博客与笔记
published: 2025-11-09T22:21:28+08:00
updated: 2025-11-09T22:21:28+08:00
description: "我突然发现我可以把一篇博文拆成好几篇来水"
image: "./cover.jpg"
tags: ["博客", "Astro", "Fuwari", "MkDocs"]
category: "折腾"
draft: false
lang: ""
---

# 博客与笔记

本篇文章主要叙述安装博客与将原有的笔记页面以外链形式加入。

这篇文章大多是准备部分，
按照文档按部就班来就可以那种，
我这种半吊子水平写出来的文章估计参考价值不大，
所以我也没写太多，
请酌情参考。

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

如果使用自己域名的话，
需要在 `./public` 文件夹下新增 `CNAME` 文件，
内写入使用的域名。

### `./src/config.ts`

这个文件需要修改的会比较多，
好在[官方示例](https://github.com/saicaca/fuwari/blob/main/src/config.ts)给的注释都很全面，
对着修改就好。

在此给出我的修改对比，以供参考。

```typescript title="./src/config.ts" del={11-13,52,60-62,82} ins={14-16,53,63-65,83} {67-78} collapse={9-98} collapseStyle=collapsible-auto
import type {
  ExpressiveCodeConfig,
  LicenseConfig,
  NavBarConfig,
  ProfileConfig,
  SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
  title: "Fuwari",
  subtitle: "Demo Site",
  lang: "en", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
  title: "SoraToUmi",
  subtitle: "この綺麗世界",
  lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
  themeColor: {
    hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
    fixed: false, // Hide the theme color picker for visitors
  },
  banner: {
    enable: false,
    src: "assets/images/demo-banner.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
    position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
    credit: {
      enable: false, // Display the credit text of the banner image
      text: "", // Credit text to be displayed
      url: "", // (Optional) URL link to the original artwork or artist's page
    },
  },
  toc: {
    enable: true, // Display the table of contents on the right side of the post
    depth: 2, // Maximum heading depth to show in the table, from 1 to 3
  },
  favicon: [
    // Leave this array empty to use the default favicon
    // {
    //   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
    //   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
    //   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
    // }
  ],
};

export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    LinkPreset.About,
    {
      name: "GitHub",
      url: "https://github.com/saicaca/fuwari", // Internal links should not include the base path, as it is automatically added
      url: "https://github.com/chiyoyuki/chiyoyuki.github.io", // Internal links should not include the base path, as it is automatically added
      external: true, // Show an external link icon and will open in a new tab
    },
  ],
};

export const profileConfig: ProfileConfig = {
  avatar: "assets/images/demo-avatar.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: "Lorem Ipsum",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  avatar: "assets/images/aino_sns_icon1.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
  name: "千代有希",
  bio: "ignoramus et ignorabimus",
  links: [
    // {
    // name: "Twitter",
    // icon: "fa6-brands:twitter", // Visit https://icones.js.org/ for icon codes
    // // You will need to install the corresponding icon set if it's not already included
    // // `pnpm add @iconify-json/<icon-set-name>`
    // url: "https://twitter.com",
    // },
    // {
    // name: "Steam",
    // icon: "fa6-brands:steam",
    // url: "https://store.steampowered.com",
    // },
    {
      name: "GitHub",
      icon: "fa6-brands:github",
      url: "https://github.com/saicaca/fuwari",
      url: "https://github.com/chiyoyuki",
    },
  ],
};

export const licenseConfig: LicenseConfig = {
  enable: true,
  name: "CC BY-NC-SA 4.0",
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
  // Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
  // Please select a dark theme, as this blog theme currently only supports dark background color
  theme: "github-dark",
};
```

## 笔记页面

::github{repo="squidfunk/mkdocs-material"}

我觉得点进去笔记页面的基本都能看出来笔记页面与博客页面格格不入。
那是因为笔记页面采用了[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)。  
（之前跟别人写另一个文档的时候被吐槽这个框架太性冷淡风了orz）

按照官方文档将其部署到另一个仓库中，
就可以通过 `$DOMAIN/$REPO-NAME` 访问子页面。

比如说我将笔记部署到了 `chiyoyuki/note` 仓库中，
我就可以通过 `chiyoyuki.github.io/note` 访问笔记页面。

（与 `$NAME.github.io` 仓库下子页面命名冲突的情况我还没试过）

然后修改 `./src/config.ts` 即可

```typescript title="./src/config.ts" ins={8-12}
...
export const navBarConfig: NavBarConfig = {
 links: [
  ...
  LinkPreset.Home,
  LinkPreset.Archive,
  LinkPreset.About,
  {
    icon: "fa6-solid:note-sticky",
    name: "笔记",
    url: "/note/",
  },
  ...
 ],
};
...
```

如果你有 i18n 需求的话，请参考[本系列第0x02篇友链页面小节](../2025111000/#%E5%8F%8B%E9%93%BE%E9%A1%B5%E9%9D%A2)

> 本文封面为[電竜ライ](https://www.pixiv.net/users/1799712)所绘制的[作品](https://x.com/key_official/status/1986403190108221904)
