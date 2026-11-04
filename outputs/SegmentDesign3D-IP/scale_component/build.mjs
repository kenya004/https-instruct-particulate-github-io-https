import { build } from "esbuild";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";

const result = await build({
  entryPoints: ["src/editor.js"], bundle: true, minify: true, format: "esm", target: "es2020",
  outfile: "dist/editor.js", legalComments: "linked", metafile: true,
});
const version = createHash("sha256").update(fs.readFileSync("dist/editor.js")).digest("hex").slice(0, 12);
const htmlPath = "dist/index.html";
const html = fs.readFileSync(htmlPath, "utf8").replace(/src="\.\/editor\.js(?:\?v=[^"]*)?"/, `src="./editor.js?v=${version}"`);
fs.writeFileSync(htmlPath, html);
const packages = new Map();
for (const input of Object.keys(result.metafile.inputs)) {
  if (!input.includes("node_modules/")) continue;
  let directory = path.dirname(path.resolve(input));
  while (directory !== path.dirname(directory)) {
    const manifest = path.join(directory, "package.json");
    if (fs.existsSync(manifest)) {
      const info = JSON.parse(fs.readFileSync(manifest, "utf8"));
      if (info.name && info.version) {
        packages.set(directory, info);
        break;
      }
    }
    directory = path.dirname(directory);
  }
}
const notices = [];
for (const [directory, info] of packages) {
  const files = fs.readdirSync(directory).filter(name => /^(licen[sc]e|notice)(\..*)?$/i.test(name));
  const fallback = path.join("vendor_licenses", `${info.name.replaceAll("/", "_")}-LICENSE`);
  if (!files.length && !fs.existsSync(fallback)) throw new Error(`Missing bundled dependency license: ${info.name}`);
  const text = files.length ? files.map(name => fs.readFileSync(path.join(directory, name), "utf8")).join("\n") : fs.readFileSync(fallback, "utf8");
  notices.push(`${info.name} ${info.version}\n${text}`);
}
fs.writeFileSync("dist/THIRD_PARTY_LICENSES.txt", notices.join("\n\n----------------------------------------\n\n"));
console.log(`Built editor with ${packages.size} dependency notices.`);
