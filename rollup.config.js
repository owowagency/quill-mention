import localResolve from "rollup-plugin-local-resolve";
import babel from "@rollup/plugin-babel";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default [
  {
    input: "src/quill.mention.js",
    output: [
      {
        file: "docs/quill.mention.min.js",
        format: "iife",
        name: "quillMention",
        plugins: [terser()],
        globals: {
          quill: "Quill",
        },
      },
      {
        file: "dist/quill.mention.min.js",
        format: "iife",
        name: "quillMention",
        plugins: [terser()],
        globals: {
          quill: "Quill",
        },
      },
    ],
    external: ["quill"],
    plugins: [
      del({
        targets: ["docs/*", "dist/*"],
      }),
      localResolve(),
      babel({
        exclude: ["node_modules/**"],
      }),
      postcss({
        extract: true,
        minimize: true,
      }),
    ],
  },
  {
    input: "src/quill.mention.js",
    output: [
      {
        file: pkg.main,
        format: "cjs",
      },
      {
        file: pkg.module,
        format: "es",
      },
    ],
    external: ["quill"],
    plugins: [
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
