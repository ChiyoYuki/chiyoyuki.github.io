---
title: 水杉空间
published: 2026-03-17T10:28:24+08:00
updated: 2026-03-17T10:28:24+08:00
description: "让我再试一次……"
image: "./cover.png"
tags: ["Misskey", "SNS"]
category: "折腾"
draft: false
lang: ""
---

# 水杉空间：基于 Misskey 的校内 SNS 实现

::github{repo="misskey-dev/misskey"}

## 起因

暂略，现在不是很有精力回忆。

## 契机

契机有二，一是之前在[茶栗栗](https://chariri.moe/)那里看到了 Misskey 这个平台，觉得美观性不错，就记了下来，顺带找了一个实例注册了自己的账号，实际使用体验也不错。
二是在刷p大野史的时候顺着一系列链接刷到了[闭社](https://closed.social/)。闭社基于 Mastodon 实现，但个人不太喜欢 Mastodon 的 UI 。
刚好 Misskey 也兼容 ActivityPub 协议，就想着基于 Misskey 搭建本校内的闭社平台。

## 结构

### 服务器

为了在免备案的前提下尽可能压缩成本，一开始的计划是弄个甲骨文云的 Always Free 计划。
但是貌似甲骨文云注册门槛相当的高，我一开始用中行的非人哉万事达借记卡没有通过，后来又去工行办了一张零额度的星座VISA信用卡，结果依然没有通过。

后来在朋友刷b站的时候看到 [GitHub Student Developer Pack](https://education.github.com/pack) 可以领到免费的 AWS 服务器，就去看了下。
结果 AWS 没找到，倒是发现了这里可以拿到 [DigitalOcean](https://www.digitalocean.com/) 一年内 200USD 的免费额度。
开一个 2 核 2G 服务器是 18USD 一个月，200USD 刚好差不多用一年，那就你了。

（我，学生，服务器送我.jpg）

基本上在 Github 上通过学生认证后到 Developer Pack 页面找到 DO 然后根据提示领取就行。
需要注意的地方在于 Github 学生认证会检查定位与 IP ，在认证过程中不要使用 VPN 。

### 域名

cloudflare 注册即可，如果您搭建的是自己学校内的闭社，可以向闭社项目组申请 `xxxx.closed.social` 域名。
我用的是自己的域名，所以不太清楚申请流程。

### 注册邮箱白名单

Misskey 默认筛选邮箱是黑名单制度，只能 ban 掉指定域名的邮箱，而校内 SNS 需要白名单制，即仅允许校内邮箱域名注册。

本着保持对源码最小改动的原则，我们做了如下修改（笑）：

```ts title="packages/backend/src/core/EmailService.ts" ins="!"
...
if (!isBanned) {
 return {
   available: false,
   reason: 'banned',
  };
}
...
```

> 详见 Commit [`3b123a2`](https://github.com/ECNU-minus/misskey/commit/3b123a2786b48dc557e4735df3b108be01b9bc60)

通过这个修改反转整个黑名单逻辑，使其拒绝所有不在所列邮箱域名内的注册请求，真的是相当粗暴wwwwwwww

### 运维

在 DO 那边关闭了除 22, 80, 443 之外所有端口的入站流量，确保安全。

## 后续计划

### 移动客户端

这个真的很重要但我不会写orz

### 找回密码

这个似乎有点问题，暂时还没有解决

### 宣传

补药啊我社恐
