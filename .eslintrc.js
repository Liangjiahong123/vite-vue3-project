module.exports = {
  parserOptions: {
    ecmaVersion: 2022 // 指定使用ECMAScript版本为2022
  },
  extends: [
    "plugin:vue/vue3-essential", // 使用Vue3的规则配置
    "eslint:recommended",
    "prettier", // 继承prettier配置
    "plugin:prettier/recommended" // 使用Prettier的推荐配置
  ],
  // 自定义规则
  rules: {
    "vue/multi-word-component-names": "off", // 关闭Vue组件名称必须使用多个单词的规则
    "no-return-assign": "off", // 关闭函数中允许使用赋值表达式的规则
    "no-param-reassign": "off", // 关闭函数参数不允许重新赋值的规则
    "guard-for-in": "off" // 关闭for-in循环中需要使用hasOwnProperty()的规则
  }
};
