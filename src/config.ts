import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "空と海",
	subtitle: "この綺麗世界",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 228, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: "assets/images/am_g_3.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: true, // Display the credit text of the banner image
			text: "VISUAL ARTS/Key - 総羽愛乃", // Credit text to be displayed
			url: "https://key.visualarts.gr.jp/anemoi/gallery.html", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		{
			src: "/favicon/aino_sns_icon1.png", // Path of the favicon, relative to the /public directory
			//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
			//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		},
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		LinkPreset.Friends,
		{
			icon: "fa6-solid:tv",
			name: "ACGN",
			url: "/bangumi/",
		},
		{
			icon: "fa6-solid:comment",
			name: "随记",
			url: "/fediverse/",
		},
		LinkPreset.Notes,
		//{
		//	name: "开往",
		//	icon: "fa6-solid:train-subway",
		//	url: "https://www.travellings.cn/train.html",
		//	external: true, // Show an external link icon and will open in a new tab
		//},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/aino_sns_icon1.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "千代有希=>",
	bio: "ignoramus et ignorabimus",
	links: [
		// {
		//	name: "Twitter",
		//	icon: "fa6-brands:twitter", // Visit https://icones.js.org/ for icon codes
		//	// You will need to install the corresponding icon set if it's not already included
		//	// `pnpm add @iconify-json/<icon-set-name>`
		//	url: "https://twitter.com",
		// },
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/chiyoyuki",
		},
		{
			name: "CodeForces",
			icon: "simple-icons:codeforces",
			url: "https://codeforces.com/profile/ChiyoYuki",
		},
		{
			name: "Steam",
			icon: "fa6-brands:steam",
			url: "https://steamcommunity.com/profiles/76561199200893188/",
		},
		{
			name: "rss",
			icon: "material-symbols:rss-feed",
			url: "./rss.xml",
		},
		{
			name: "Misskey",
			icon: "simple-icons:misskey",
			url: "https://voskey.icalo.net/@chiyoyuki",
		},
		{
			name: "e-mail",
			icon: "material-symbols:mail",
			url: "mailto:chiyo.uk@outlook.com",
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
