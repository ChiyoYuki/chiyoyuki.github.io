---
title: 博客折腾指北0x02 - 友链与朋友圈
published: 2025-11-10T00:07:24+08:00
updated: 2025-11-10T00:07:24+08:00
description: "我们曾经终日游荡，在故乡的青山上"
image: "./cover.png"
tags: ["博客", "Astro", "Fuwari", "Pure", "友链"]
category: "折腾"
draft: false
lang: ""
---

# 友链与朋友圈

我觉得友链界面算是博客必不可少的一部分，
可惜 Fuwari 主题尚未实现这一功能，
只能自己另寻其他解决办法。

:::warning[参考注意]
Fuwari 主题后续可能会内置友链页面，
请考虑是否要自己外加这一功能。

此外，
我对于 Astro 了解并不深，
如您阅读了这系列第 0x00 篇文章的话应该知道我听说 Astro 也仅仅是半月前的事情。
所以基本上文中代码不是抄的就是 AI 写的，
很多代码可能未必准确，
主打一个能跑就行。  
这个文章的实现策略也仍存在问题，
比如友链部分样式不一致。

如您愿意帮我改进代码，
请提PR。
我将不胜感激。
:::

## 友链页面

> 本小节代码主要修改自仓库 `cworld1/astro-theme-pure`

::github{repo="cworld1/astro-theme-pure"}

:::note[有关上游仓库 saicaca/fuwari 对友链的支持计划]
详见[issue #35](https://github.com/saicaca/fuwari/issues/35/)和[pr #642](https://github.com/saicaca/fuwari/pull/642)
:::

友链界面最开始参考了AULyPc的文章[给你的Fuwari添加一个友链页面](https://aulypc1.github.io/posts/website/add_friendspage_in_fuwari/)，
但后来在逛 [Axi's Blog](https://axi404.top/links) 的时候很喜欢他的友链界面和朋友圈，
于是顺藤摸瓜找到了 [Pure 主题](https://github.com/cworld1/astro-theme-pure)，
然后把友链相关的部分抄了过来，
具体步骤大致如下：

1. 添加必要组件

   仿照 [Pure 主题配置](https://github.com/cworld1/astro-theme-pure/blob/main/public/links.json)
   建立 `./public/links.json` 文件，
   以下为示例：

   ```json title="./public/links.json" collapse={8-44} collapseStyle=collapsible-auto
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

   ```astro title="./src/components/links/FriendsList.astro" collapse={8-106} collapseStyle=collapsible-auto
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

   ```astro {"请自行修改这一部分":23-32} ins={"在这里填写你的申请要求":86} title="./src/pages/friends.astro" collapse={1-21,34-90} collapseStyle=collapsible-auto
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
     "https://raw.githubusercontent.com/ChiyoYuki/chiyoyuki.github.io/refs/heads/main/public/links.json";
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

2. 修改i18n信息

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

   修改 `./src/types/config.ts` ，添加 `Friends` 一项

   ```typescript ins={5} title="./src/types/config.ts"
   export enum LinkPreset {
      Home = 0,
      Archive = 1,
      About = 2,
      Friends = 3,
     ...
   }
   ```

   修改 `./src/config.ts` ，添加 `LinkPreset.Friends` 一项

   ```typescript ins={7} title="./src/config.ts"
   export const navBarConfig: NavBarConfig = {
      links: [
       ...
       LinkPreset.Home,
       LinkPreset.Archive,
       LinkPreset.About,
       LinkPreset.Friends,
       ...
     ],
   };
   ```

## 友链朋友圈

> 本小节代码主要修改自仓库 `cworld1/astro-theme-pure` 和 `willow-god/Friend-Circle-Lite`

::github{repo="willow-god/Friend-Circle-Lite"}

1. 生成新的 `json` 文件

   在 `./scripts/` 下（或是别的什么地方）新建 `generate-format-friends.cjs`

   ```cjs {"这一部分按需修改":8-10} title="./scripts/generate-format-friends.cjs" collapse={12-69} collapseStyle=collapsible-auto
   const fs = require("node:fs");
   const path = require("node:path");

   // 黑名单：不想订阅的站点名称
   const blacklist = ["友站名称1", "友站名称2", "友站名称3"];
   // 只处理前几个分组（与原脚本行为一致）
   const lastIndex = 3;

   const inputPath = path.resolve(process.cwd(), "public", "links.json");
   const outputPath = path.resolve(process.cwd(), "public", "friend.json");

   function loadLinks() {
     if (!fs.existsSync(inputPath)) {
       console.error(`输入文件不存在: ${inputPath}`);
       process.exit(2);
     }
     try {
       const raw = fs.readFileSync(inputPath, "utf8");
       return JSON.parse(raw);
     } catch (err) {
       console.error("读取或解析 JSON 失败：", err);
       process.exit(2);
     }
   }

   function buildFriendData(data) {
     const friends = [];

     if (!data || !Array.isArray(data.friends)) {
       console.warn('输入 JSON 中未找到 "friends" 数组，输出将为空。');
       return { friends: [] };
     }

     data.friends.forEach((group, index) => {
       if (index < lastIndex) {
         const list = Array.isArray(group.link_list) ? group.link_list : [];
         const filtered = list.filter(
           (item) => item && !blacklist.includes(item.name),
         );
         filtered.forEach((item) => {
           const name = item.name || "";
           const link = item.link || "";
           const avatar = item.avatar || "";
           friends.push([name, link, avatar]);
         });
       }
     });

     return { friends };
   }

   function writeOutput(obj) {
     try {
       const dir = path.dirname(outputPath);
       if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
       fs.writeFileSync(outputPath, JSON.stringify(obj, null, 2), "utf8");
       console.log(`已生成：${outputPath}`);
     } catch (err) {
       console.error("写入输出文件失败：", err);
       process.exit(2);
     }
   }

   const data = loadLinks();
   const friendData = buildFriendData(data);
   writeOutput(friendData);

   // 导出以便测试或复用（如果以模块方式引入）
   module.exports = { loadLinks, buildFriendData, writeOutput };
   ```

2. 克隆 `willow-god/Friend-Circle-Lite` 并作为公开仓库

3. 修改你的 `Friend-Circle-Lite` 仓库中的 `./conf.yaml` 文件，使其指向第一步中生成的 `json` 文件

   ```yaml {4} title="./conf.yaml"
   spider_settings:
     ...
     enable: true
     json_url: "https://raw.githubusercontent.com/ChiyoYuki/chiyoyuki.github.io/refs/heads/main/public/friend.json"
     ...
   ```

4. 修改你的 `Friend-Circle-Lite` 仓库的设置，
   `Settings-Pages-Build and deployment` 中 `Source` 选择 `Deploy from a brench` ，
   `Branch` 选择 `page` 分支根目录。
   然后可以前往 `$USER_NAME.github.io/$REPO_NAME` 页面查看是否正常生成

5. 在友链界面添加朋友圈

   接下来回到博客仓库

   修改 `./src/pages/friends.astro` 文件，
   其中 `private_api_url` 这里修改为上一步生成页面的地址

   ```astro ins={3-18} title="./src/pages/friends.astro" "private_api_url"
   ...
   <Markdown class="mt-2">
       <h2 id='small-circle'>Small Circle</h2>
       <div id='friend-circle-lite-root' class='not-prose'>Loading...</div>
       <script>
       import '@/styles/fc.css'

       import { FriendCircle } from '@/plugins/friend-circle'

       const fc = new FriendCircle()
       fc.init({
       private_api_url: 'https://chiyoyuki.uk/Friend-Circle-Lite',
       page_turning_number: 10,
       error_img: 'https://cravatar.cn/avatar/57d8260dfb55501c37dde588e7c3852c'
     })
     fc.load()
     </script>
     <h2 id="apply-links">Apply Links</h2>
     <p>本站信息 The site information:</p>
     ...
   </Markdown>
   ...
   ```

   在 `./src/plugins/` 文件夹下添加 `friend-circle.ts` 文件

   ```typescript title="./src/plugins/friend-circle.ts" collapse={8-261} collapseStyle=collapsible-auto
   interface Config {
     private_api_url: string;
     page_turning_number: number;
     error_img: string;
   }

   interface Article {
     title: string;
     link: string | URL;
     avatar: string;
     author: string;
     created: string;
   }

   interface ArticleData {
     article_data: Article[];
     statistical_data: {
       friends_num: number;
       active_num: number;
       article_num: number;
       last_updated_time: string;
     };
   }

   export class FriendCircle {
     config!: Config;
     root!: HTMLElement;
     start = 0;
     allArticles: Article[] = [];
     container!: HTMLElement;
     randomArticleContainer!: HTMLElement;
     statsContainer!: HTMLElement;
     loadMoreBtn!: HTMLButtonElement;
     modal!: HTMLElement;

     load() {
       this.loadMoreArticles();
       this.loadMoreBtn.addEventListener(
         "click",
         this.loadMoreArticles.bind(this),
       );
       window.onclick = (event) => {
         const modal = document.getElementById("modal");
         if (event.target === modal) {
           this.hideModal();
         }
       };
     }

     init(config: Partial<Config>) {
       this.config = {
         private_api_url: config.private_api_url || "",
         page_turning_number: config.page_turning_number || 20,
         error_img:
           config.error_img ||
           "https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite@latest/static/favicon.ico",
       };

       this.root = document.getElementById(
         "friend-circle-lite-root",
       ) as HTMLElement;
       if (!this.root) return;

       this.root.innerHTML = "";
       this.createContainers();
     }

     private createContainers() {
       this.randomArticleContainer = this.createElement("div", {
         id: "random-article",
       });
       this.container = this.createElement("div", {
         className: "articles-container",
         id: "articles-container",
       });
       this.loadMoreBtn = this.createElement("button", {
         id: "load-more-btn",
         innerText: "Load more",
       }) as HTMLButtonElement;
       this.statsContainer = this.createElement("div", {
         id: "stats-container",
       });

       this.root.append(
         this.randomArticleContainer,
         this.container,
         this.loadMoreBtn,
         this.statsContainer,
       );
     }

     private createElement<K extends keyof HTMLElementTagNameMap>(
       tag: K,
       attributes: Partial<HTMLElementTagNameMap[K]>,
     ): HTMLElementTagNameMap[K] {
       const element = document.createElement(tag);
       Object.assign(element, attributes);
       return element;
     }

     loadMoreArticles() {
       const cacheKey = "friend-circle-lite-cache";
       const cacheTimeKey = "friend-circle-lite-cache-time";
       const cacheTime = localStorage.getItem(cacheTimeKey);
       const now = Date.now();

       if (cacheTime && now - Number(cacheTime) < 10 * 60 * 1000) {
         const cachedDataString = localStorage.getItem(cacheKey);
         const cachedData = cachedDataString
           ? JSON.parse(cachedDataString)
           : null;
         if (cachedData) {
           this.processArticles(cachedData);
           return;
         }
       }

       fetch(`${this.config.private_api_url}all.json`)
         .then((response) => response.json())
         .then((data) => {
           localStorage.setItem(cacheKey, JSON.stringify(data));
           localStorage.setItem(cacheTimeKey, now.toString());
           this.processArticles(data);
         })
         .finally(() => {
           this.loadMoreBtn.innerText = "Load more";
         });
     }

     processArticles({ article_data, statistical_data }: ArticleData) {
       this.allArticles = article_data;
       this.updateStats(statistical_data);
       this.displayRandomArticle();
       this.displayArticles();
     }

     private updateStats(stats: ArticleData["statistical_data"]) {
       this.statsContainer.innerHTML = `
         <div>${stats.friends_num} links with ${stats.active_num} active | ${stats.article_num} articles in total</div>
         <div>Updated at ${stats.last_updated_time}</div>
         <div>Powered by <a href="https://github.com/willow-god/Friend-Circle-Lite" target="_blank">FriendCircleLite</a><br></div>
       `;
     }

     private displayArticles() {
       const articles = this.allArticles.slice(
         this.start,
         this.start + this.config.page_turning_number,
       );
       articles.forEach((article) => {
         this.createArticleCard(article);
       });
       this.start += this.config.page_turning_number;

       if (this.start >= this.allArticles.length) {
         this.loadMoreBtn.style.display = "none";
       }
     }

     private createArticleCard(article: Article) {
       const card = document.createElement("div");
       card.className = "article";
       card.innerHTML = `
         <div class="article-image author-click">
           <img class="no-lightbox" src="${article.avatar || this.config.error_img}" onerror="this.src='${this.config.error_img}'">
         </div>
         <div class="article-container">
           <div class="article-author author-click">${article.author}</div>
           <a class="article-title" href="${article.link instanceof URL ? article.link.toString() : article.link}" target="_blank">${article.title}</a>
           <div class="article-date">️${article.created.substring(0, 10)}</div>
         </div>
       `;
       card.querySelectorAll(".author-click").forEach((el) => {
         el.addEventListener("click", () => {
           this.showAuthorArticles(
             article.author,
             article.avatar,
             article.link,
           );
         });
       });
       this.container.appendChild(card);
     }

     displayRandomArticle() {
       const randomArticle =
         this.allArticles[Math.floor(Math.random() * this.allArticles.length)];
       this.randomArticleContainer.innerHTML = `
         <div class="random-title">Random Poll</div>
         <div class="article-container">
           <div class="article-author">${randomArticle.author}</div>
           <a class="article-title" href="${randomArticle.link}" target="_blank">${randomArticle.title}</a>
           <div class="article-date">️${randomArticle.created.substring(0, 10)}</div>
         </div>
         <button id="random-refresh">
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M2 12.08c-.006-.862.91-1.356 1.618-.975l.095.058l2.678 1.804c.972.655.377 2.143-.734 2.007l-.117-.02l-1.063-.234a8.002 8.002 0 0 0 14.804.605a1 1 0 0 1 1.82.828c-1.987 4.37-6.896 6.793-11.687 5.509A10 10 0 0 1 2 12.08m.903-4.228C4.89 3.482 9.799 1.06 14.59 2.343a10 10 0 0 1 7.414 9.581c.007.863-.91 1.358-1.617.976l-.096-.058l-2.678-1.804c-.972-.655-.377-2.143.734-2.007l.117.02l1.063.234A8.002 8.002 0 0 0 4.723 8.68a1 1 0 1 1-1.82-.828"/></g></svg>
         </button>
       `;
       this.randomArticleContainer
         .querySelector("button#random-refresh")
         ?.addEventListener("click", (event) => {
           event.preventDefault();
           this.displayRandomArticle();
         });
     }

     // Enable modal
     showAuthorArticles(author: string, avatar: string, link: string | URL) {
       if (!document.getElementById("fclite-modal")) {
         const modal = this.createElement("div", {
           id: "modal",
           className: "modal",
         });
         modal.innerHTML = `
         <div class="modal-content">
           <div class="modal-header">
             <img class="modal-author-avatar" src="${avatar || this.config.error_img}" alt="">
             <a class="modal-author-name-link" href="${new URL(link.toString()).origin}" target="_blank">${author}</a>
           </div>
           <div id="modal-articles-container"></div>
         </div>
         `;
         this.root.appendChild(modal);
       }
       this.modal = document.getElementById("modal") as HTMLElement;
       const modalArticlesContainer = document.getElementById(
         "modal-articles-container",
       ) as HTMLElement;
       const authorArticles = this.allArticles.filter(
         (article) => article.author === author,
       );
       authorArticles.slice(0, 4).forEach((article) => {
         const articleTemplate = `
           <div class="modal-article">
             <a class="modal-article-title" href="${article.link instanceof URL ? article.link.toString() : article.link}" target="_blank">${article.title}</a>
             <div class="modal-article-date">${article.created.substring(0, 10)}</div>
           </div>`;
         modalArticlesContainer.insertAdjacentHTML(
           "beforeend",
           articleTemplate,
         );
       });

       this.modal.style.display = "block";
       setTimeout(() => {
         this.modal.classList.add("modal-open");
       }, 10);
     }

     hideModal() {
       this.modal.classList.remove("modal-open");
       this.modal.addEventListener(
         "transitionend",
         () => {
           this.modal.style.display = "none";
           this.root.removeChild(this.modal);
         },
         { once: true },
       );
     }
   }
   ```

   在 `./src/styles/` 文件夹下添加 `fc.css` 文件

   ```css title="./src/styles/fc.css" collapse={8-240} collapseStyle=collapsible-auto
   /* Random article */
   #random-article {
     display: flex;
     margin-bottom: 0.7rem;
     column-gap: 0.7rem;
     align-items: center;
   }
   .random-title {
     color: hsl(var(--foreground));
     white-space: nowrap;
   }
   #random-refresh {
     height: 2.35rem;
     aspect-ratio: 1;
     display: grid;
     place-items: center;
     border-radius: 0.75rem;
     border: 1px solid hsl(var(--border));
     transition: background-color 0.2s;
   }
   #random-refresh:hover {
     background-color: hsl(var(--primary-foreground));
   }
   #random-refresh svg {
     width: 1.25rem;
     height: 1.25rem;
   }
   @media (max-width: 640px) {
     #random-article {
       flex-wrap: wrap;
       row-gap: 0.3rem;
       margin-bottom: 1.5rem;
     }
     .random-title {
       flex-grow: 1;
     }
     .article-container {
       order: 3;
       flex-basis: 100%;
     }
     #random-refresh {
       height: max-content;
       padding: 0.2rem;
     }
   }

   /* Modal */
   .modal {
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: hsl(var(--background) / 0.3);
     --tw-blur: blur(24px);
     backdrop-filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast)
       var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert)
       var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
     -webkit-backdrop-filter: var(--tw-blur) var(--tw-brightness)
       var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate)
       var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
     z-index: 999;
     opacity: 0;
     visibility: hidden;
     transition:
       opacity 0.3s ease-in-out,
       visibility 0.3s ease-in-out;
   }
   .modal.modal-open {
     opacity: 1;
     visibility: visible;
   }
   .modal-content {
     opacity: 0;
     position: relative;
     top: 50%;
     left: 50%;
     transform: translate(-50%, -50%) translateY(-50px);
     width: 40rem;
     z-index: 1000;
     max-height: 90%;
     transition:
       transform 0.3s ease-in-out,
       opacity 0.3s ease-in-out;
     overflow: hidden;
     display: flex;
     flex-direction: column;
   }
   @media screen and (max-width: 675px) {
     .modal-content {
       width: 90%;
     }
   }
   .modal.modal-open .modal-content {
     transform: translate(-50%, -50%) translateY(0);
     opacity: 1;
   }
   .modal-header {
     display: flex;
     justify-content: center;
     align-items: center;
     column-gap: 0.9rem;
     padding: 0.7rem 1rem;
   }
   .modal-author-avatar {
     border-radius: 999px;
     width: 3rem;
     height: 3rem;
   }
   .modal-author-name-link {
     text-decoration: none;
   }
   #modal-articles-container {
     background-color: hsl(var(--primary-foreground));
     border: 1px solid hsl(var(--border));
     padding: 0.7rem 0.7rem;
     border-radius: 0.75rem;
     overflow-y: scroll;
     display: flex;
     flex-direction: column;
     row-gap: 0.7rem;
   }
   .modal-article .modal-article-title {
     cursor: pointer;
     text-decoration: none;
     display: -webkit-box;
     -webkit-line-clamp: 2;
     line-clamp: 2;
     -webkit-box-orient: vertical;
     overflow: hidden;
     text-overflow: ellipsis;
   }
   .modal-article .modal-article-date {
     font-size: 0.75rem;
     line-height: 1rem;
     text-align: right;
   }

   /* Articles */
   .articles-container {
     display: flex;
     flex-direction: column;
     row-gap: 0.7rem;
   }
   .article {
     display: flex;
     align-items: center;
     column-gap: 0.7rem;
   }
   .article-image img {
     border-radius: 999px;
     min-width: 2rem;
     min-height: 2rem;
     width: 2rem;
     height: 2rem;
   }
   .article-container {
     flex-grow: 1;
     border-radius: 0.75rem;
     padding: 0.3rem 1rem;
     border: 1px solid hsl(var(--border));
     display: flex;
     align-items: center;
     column-gap: 0.6rem;
     transition: background-color 0.2s;
   }
   .article-container:hover {
     background-color: hsl(var(--primary-foreground));
   }
   .author-click {
     cursor: pointer;
   }
   .article-author {
     white-space: nowrap;
   }
   .article-title {
     overflow: hidden;
     display: -webkit-box;
     -webkit-box-orient: vertical;
     -webkit-line-clamp: 1;
     line-clamp: 1;
     flex-grow: 1;
     text-decoration: none;
     color: hsl(var(--foreground));
     transition: color 0.2s;
   }
   .article-date {
     font-family:
       ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
       "Courier New", monospace;
     font-size: 0.75rem;
     line-height: 1rem;
   }
   @media (max-width: 640px) {
     .article {
       align-items: start;
     }
     .article-image {
       margin-top: 0.3rem;
     }
     .article-container {
       flex-wrap: wrap;
     }
     .article-author {
       flex-grow: 1;
     }
     .article-title {
       order: 3;
       flex-basis: 100%;
     }
   }
   /* Load more */
   #load-more-btn {
     background-color: hsl(var(--primary-foreground));
     border: 1px solid hsl(var(--border));
     border-radius: 0.75rem;
     padding: 0.2rem 1rem;
     margin: 0.75rem auto;
     display: block;
     transition:
       color 0.2s,
       background-color 0.2s;
   }
   #load-more-btn:hover {
     color: hsl(var(--primary));
     background-color: hsl(var(--input));
   }
   /* Status */
   #stats-container {
     font-size: 0.75rem;
     line-height: 1rem;
     text-align: right;
   }
   #stats-container > * {
     margin-bottom: 0.2rem;
   }
   #stats-container a {
     color: hsl(var(--foreground));
     text-decoration: none;
   }
   ```

   理论上这样就配置好了，
   需要注意的是当前配置是半自动的，
   每次增删调改友链后要重新生成 `json` 文件，
   你需要在博客仓库根目录下执行如下指令：

   ```shell
   node scripts/generate-format-friends.cjs
   ```

> 本文封面为作品[Summer Pockets REFLECTION BLUE](https://key.visualarts.gr.jp/summer_rb/)中的 CG
