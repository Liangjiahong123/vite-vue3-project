module.exports = {
  // 继承的规则集
  extends: [
    "stylelint-config-standard", // 使用官方推荐的规则集
    "stylelint-config-recommended-less", // 针对less的规则集
    "stylelint-config-standard-vue" // 针对vue单文件组件的CSS规则集
  ],
  // 使用插件
  plugins: ["stylelint-order"], // 规定CSS书写属性顺序
  // 自定义CSS书写规则
  rules: {
    "selector-class-pattern": null, // 不强制限制选择器类名的格式
    "keyframes-name-pattern": null, // 不强制限制动画关键帧名称的格式
    "no-empty-source": true, // 可以使用空的CSS文件
    "alpha-value-notation": "number", // 强制要求alpha值使用数字表示
    "no-descending-specificity": null, // 不强制限制选择器的优先级
    // 强制要求伪元素选择器使用正确的语法，并忽略 v-deep 选择器
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["v-deep"]
      }
    ],
    // 强制要求伪类选择器使用正确的语法,并忽略 v-deep 选择器
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["deep"]
      }
    ],
    // 不强制限制选择器之前的空行
    "rule-empty-line-before": null,
    // 强制要求使用正确的 @ 规则,并忽略一些特殊的less指令
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["function", "if", "else", "else-if", "each", "include", "mixin"]
      }
    ],
    // 强制要求 @ 规则之前有空行
    "at-rule-empty-line-before": [
      "always",
      {
        except: ["blockless-after-same-name-blockless", "first-nested"],
        ignore: ["after-comment"],
        ignoreAtRules: ["else", "else-if"]
      }
    ],
    // 指定书写样式的排序
    "order/properties-order": [
      "position",
      "top",
      "right",
      "bottom",
      "left",
      "z-index",
      "display",
      "justify-content",
      "align-items",
      "flex-shrink",
      "float",
      "clear",
      "width",
      "min-width",
      "max-width",
      "height",
      "min-height",
      "max-height",
      "padding",
      "padding-top",
      "padding-right",
      "padding-bottom",
      "padding-left",
      "margin",
      "margin-top",
      "margin-right",
      "margin-bottom",
      "margin-left",
      "font-size",
      "line-height",
      "font-family",
      "text-align",
      "text-justify",
      "text-indent",
      "text-overflow",
      "text-decoration",
      "white-space",
      "color",
      "background",
      "background-position",
      "background-repeat",
      "background-size",
      "background-color",
      "background-clip",
      "border",
      "border-style",
      "border-width",
      "border-color",
      "border-top-style",
      "border-top-width",
      "border-top-color",
      "border-right-style",
      "border-right-width",
      "border-right-color",
      "border-bottom-style",
      "border-bottom-width",
      "border-bottom-color",
      "border-left-style",
      "border-left-width",
      "border-left-color",
      "border-radius",
      "overflow",
      "overflow-x",
      "overflow-y",
      "opacity",
      "filter",
      "list-style",
      "outline",
      "visibility",
      "box-shadow",
      "text-shadow",
      "resize",
      "transition",
      "content"
    ]
  },
  // 为不同类型的文件或语法提供不同的配置和规则
  overrides: [
    {
      files: ["**/*.(less|css|vue|html)"],
      customSyntax: "postcss-less"
    },
    {
      files: ["**/*.(html|vue)"],
      customSyntax: "postcss-html"
    }
  ]
};
