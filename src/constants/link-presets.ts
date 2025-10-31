import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { LinkPreset, type NavBarLink } from "@/types/config";

export const LinkPresets: { [key in LinkPreset]: NavBarLink } = {
	[LinkPreset.Home]: {
		icon: "fa6-solid:house",
		name: i18n(I18nKey.home),
		url: "/",
	},
	[LinkPreset.About]: {
		icon: "fa6-solid:address-card",
		name: i18n(I18nKey.about),
		url: "/about/",
	},
	[LinkPreset.Archive]: {
		icon: "fa6-solid:box-archive",
		name: i18n(I18nKey.archive),
		url: "/archive/",
	},

	[LinkPreset.Notes]: {
		icon: "fa6-solid:note-sticky",
		name: i18n(I18nKey.notes),
		url: "/note/",
	},
	[LinkPreset.Friends]: {
		icon: "fa6-solid:user-group",
		name: i18n(I18nKey.friends),
		url: "/links/",
	},
};
