import moaqz from "eslint-config-moaqz";

export default [
  ...moaqz,
  {
    rules: {
      "@stylistic/jsx-quotes": ["error", "prefer-double"],
      "@stylistic/jsx-closing-tag-location": "off",
    },
  },
  {
    ignores: ["src-tauri/*", "dist"],
  },
];
