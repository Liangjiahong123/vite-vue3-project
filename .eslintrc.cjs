module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: "latest", // 指定使用ECMAScript
    sourceType: "module",
    requireConfigFile: false
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential", // 使用Vue3的规则配置
    "prettier", // 继承prettier配置
    "plugin:prettier/recommended", // 使用Prettier的推荐配置
    "./.eslintrc-auto-import.json"
  ],
  plugins: ["vue"],
  // 自定义规则
  rules: {
    "vue/multi-word-component-names": "off", // 关闭Vue组件名称必须使用多个单词的规则
    "no-return-assign": "off", // 关闭函数中允许使用赋值表达式的规则
    "no-param-reassign": "off", // 关闭函数参数不允许重新赋值的规则
    "guard-for-in": "off", // 关闭for-in循环中需要使用hasOwnProperty()的规则
    "vue/component-tags-order": ["warn", { order: ["script", "template", "style"] }],
    // 警告出现未使用过的变量
    "no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "none"
      }
    ],
    "no-var": "error" // 要求使用 let 或 const 而不是 var
  }
};
