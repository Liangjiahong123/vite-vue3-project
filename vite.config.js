import { defineConfig, loadEnv } from "vite";
import { fileURLToPath, URL } from "url";
import vue from "@vitejs/plugin-vue";
import legacyPlugin from "@vitejs/plugin-legacy";
import { createHtmlPlugin } from "vite-plugin-html";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import dayjs from "dayjs"; // 使用day.js格式化时间，

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const outputDirName = dayjs(Date.now()).format("YYYYMMDDHHmmss");
  const isDev = env.NODE_ENV === "development";
  return {
    base: `${env.VITE_RESOURCE_URL}${!isDev ? outputDirName : ""}/`,
    mode,
    brotliSize: false, // 关闭打包计算的gzip大小报告
    server: {
      host: "0.0.0.0",
      port: 8888, // 端口
      proxy: env.VITE_BASE_URL
    },
    build: {
      outDir: `dist/${outputDirName}`, // 使用"dist/时间戳"作为打包后路径
      assetsInlineLimit: 1024, // 小于1024转化为base64
      reportCompressedSize: false, // 禁用 gzip 压缩大小报告
      rollupOptions: {
        output: {
          // 将静态资源输入到不同文件夹中，如图片输出到img文件夹，字体输出到fonts文件夹
          assetFileNames: (assetInfo) => {
            let info = assetInfo.name.split(".");
            let extType = info[info.length - 1];
            if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
              extType = "img";
            } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
              extType = "fonts";
            }
            return `${extType}/[name]-[hash][extname]`;
          },
          // 设置输出代码块文件的名称和路径，这里输出到js文件夹下
          chunkFileNames: "js/[name]-[hash].js",
          // 设置输出的入口文件的名称和路径，这里输出到js文件夹下
          entryFileNames: "js/[name]-[hash].js",
          // 根据模块的路径来判断是否属于第三方库，并将其归类到不同的代码块中
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              if (id.includes("crypto-js")) return "vendor_crypto-js";
              if (id.includes("gsap")) return "vendor_gsap";
              if (/@?pixi[\\.js]?/.test(id)) return "vendor_pixi";
              if (id.includes("vconsole")) return "vendor_vconsole";
              return "vendor";
            }
          }
        },
        preserveEntrySignatures: true // 保留每个入口模块的导出类型，配合Tree Shaking使用
      }
    },
    plugins: [
      vue(),
      legacyPlugin({
        targets: ["defaults", "not IE 11"]
      }),

      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ["vue", "vue-router"],
        eslintrc: { enabled: true }
      }),

      Components({
        resolvers: [ElementPlusResolver()]
      }),

      createHtmlPlugin({
        minify: true, // 开启压缩
        inject: {
          data: {
            title: "vite项目模板" // 可以配置动态标题
          }
        }
      })
    ],
    resolve: {
      alias: {
        // 配置路径别名
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    }
  };
});
