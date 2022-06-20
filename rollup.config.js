import localResolve from "rollup-plugin-local-resolve";
import babel from "@rollup/plugin-babel";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json";

export default [
  {
    input: "src/quill.mention.js",
    output: [
      {
        file: `dist/${pkg.entry}.js`,
        format: "umd",
        name: "QuillMention",
      },
      {
        file: `dist/${pkg.entry}.mjs`,
        format: "esm",
        name: "QuillMention",
      },
    ],
    external: ["quill"],
    plugins: [
      del({
        targets: "dist/*",
      }),
      localResolve(),
      babel({
        exclude: ["node_modules/**"],
      }),
      copy({
        targets: [
          { src: "package.json", dest: "dist" },
          { src: "README.md", dest: "dist" },
        ],
      }),
      postcss({
        extract: "quill.mention.css",
      }),
    ],
  },
];
