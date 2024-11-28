import router from "@/router";
import defaultSettings from "@/settings";

// 导入 Element Plus 中英文语言包
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import { store } from "@/store";

export const useAppStore = defineStore("app", () => {
  // 语言
  const language = useStorage("language", defaultSettings.language);

  /**
   * 根据语言标识读取对应的语言包
   */
  const locale = computed(() => {
    if (language?.value == "en") {
      return en;
    } else {
      return zhCn;
    }
  });

  /**
   * 切换语言
   *
   * @param val
   */
  function changeLanguage(val: string) {
    language.value = val;
  }

  // 顶部菜单激活路径
  const activeTopMenuPath = useStorage("activeTopMenuPath", "");

  function activeTopMenu(val: string) {
    activeTopMenuPath.value = val;
  }

  const getActivePath = () => {
    console.log(router, "????");

    let path = "";
    router.options.routes.forEach((item) => {
      if (item.path === router.currentRoute.value.path) {
        // active.value = item.path;
        path = item.path;
        // resolve(item.path);
      } else if (item.children) {
        const child = item.children.find((child) => child.path === router.currentRoute.value.path);
        if (child) {
          // active.value = child.path;
          // resolve(child.path);
          path = child.path;
        }
      }
    });

    return path || "";
  };

  return {
    language,
    locale,
    changeLanguage,
    activeTopMenu,
    activeTopMenuPath,
    getActivePath,
  };
});

/**
 * 用于在组件外部（如在Pinia Store 中）使用 Pinia 提供的 store 实例。
 * 官方文档解释了如何在组件外部使用 Pinia Store：
 * https://pinia.vuejs.org/core-concepts/outside-component-usage.html#using-a-store-outside-of-a-component
 */
export function useAppStoreHook() {
  return useAppStore(store);
}
