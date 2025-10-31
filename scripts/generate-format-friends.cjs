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
