import { ElLoading } from "element-plus";

/**
 * @text {string} text loading加时的问题
 * @returns loadingInstance-loading实例 closeLoading关闭loading的回调
 */
// 全局loading
const useLoadingHook = (text = "loading") => {
  const loadingInstance = ElLoading.service({
    text,
    background: "rgba(0, 0, 0, 0.7)"
  });

  const closeLoading = () => loadingInstance.close();
  return { loadingInstance, closeLoading };
};

export default useLoadingHook;
