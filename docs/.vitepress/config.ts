import { defineConfig } from "vitepress"

export default defineConfig({
  // outDir: "../dist",
  server: {
    hmr: {
      overlay: false,
    },
  },
  cacheDir: "./.vitepress/cache",
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  ],
  title: "mellow Blog",
  description: "一路花香",
  lang: "zh-CN",
  base: "/blog/",
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: "/favicon.ico",
    siteTitle: "mellow Blog",
    authorAvatar: "/public/avatar.png",
    type: "blog",
    outline: "deep",
    // 社交链接
    socialLinks: [
      { icon: "discord", link: "https://discord.com/" },
      { icon: "github", link: "https://github.com" },
    ],
    lastUpdatedText: "最近更新时间",
    docFooter: { prev: "上一篇", next: "下一篇" },
    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    // footer: {
    //   message: "Released under the MIT License.",
    //   copyright: "Copyright © 2019-present Evan You",
    // },
    footer: {
      message: 'mellow 的博客，欢迎 <a target="_blank" style="color: var(--vp-c-brand)" href="${github}">star ⭐</a> 让更多人发现',
      copyright: '<a target="_blank" href="${github}/blob/main/LICENSE">MIT License DoubleXm </a> | 版权所有 © 2023-${new Date().getFullYear()}',
    },
    nav: [
      {
        text: "Guide",
        link: "/guide/what-is-vitepress",
        activeMatch: "/guide/what-is-vitepress",
      },
      {
        text: "下拉选择框",
        items: [
          { text: "随笔", link: "/essay/essay-01" },
          { text: "java-web", link: "/java-web/java-web-01" },
        ],
      },
      {
        text: "首页",
        link: "/",
      },
      {
        text: "开始阅读",
        link: "/guide/",
        // activeMatch: "/guide/what-is-vitepress",
      },
      {
        text: "xinyu zheng 的链接",
        items: [
          {
            text: "掘金",
            link: "https://juejin.cn/user/2942709146585208",
          },
          {
            text: "Github",
            link: "https://github.com/xinyuzheng",
          },
        ],
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          items: [
            { text: "什么是 VitePress", link: "/guide/what-is-vitepress" },
            { text: "快速开始", link: "/guide/getting-started" },
          ],
          collapsible: true,
        },
        // {
        //   text: "开始阅读",
        //   items: [
        //     {
        //       text: "java-web-第一篇章",
        //       link: "/java-web/java-web-01",
        //     },
        //     {
        //       text: "java-web-第二篇章",
        //       link: "/java-web/java-web-02",
        //     },
        //   ],
        //   collapsible: true,
        // },
      ],
      "/essay/": [
        {
          text: "开始阅读",
          collapsible: true,
        },
        {
          text: "随笔",
          items: [
            {
              text: "essay-第一篇章",
              link: "/essay/essay-01",
            },
            {
              text: "essay-第二篇章",
              link: "/essay/essay-02",
            },
            {
              text: "essay-第三篇章",
              link: "/essay/essay-03",
            },
            {
              text: "essay-第四篇章",
              link: "/essay/essay-04",
            },
            {
              text: "essay-第五篇章",
              link: "/essay/essay-05",
            },
            {
              text: "essay-第六篇章",
              link: "/essay/essay-06",
            },
            {
              text: "essay-第七篇章",
              link: "/essay/essay-07",
            },
          ],
          collapsible: true,
        },
      ],
      "/java-web/": [
        {
          text: "开始阅读",
          collapsible: true,
        },
        {
          text: "java-web篇",
          items: [
            {
              text: "java-web-第一篇章",
              link: "/java-web/java-web-01",
            },
            {
              text: "java-web-第二篇章",
              link: "/java-web/java-web-02",
            },
            {
              text: "java-web-第三篇章",
              link: "/java-web/java-web-03",
            },
            {
              text: "java-web-第四篇章",
              link: "/java-web/java-web-04",
            },
            {
              text: "java-web-第五篇章",
              link: "/java-web/java-web-05",
            },
            {
              text: "java-web-第六篇章",
              link: "/java-web/java-web-06",
            },
            {
              text: "java-web-第七篇章",
              link: "/java-web/java-web-07",
            },
            {
              text: "java-web-第八篇章",
              link: "/java-web/java-web-08",
            },
            {
              text: "java-web-第九篇章",
              link: "/java-web/java-web-09",
            },
            {
              text: "java-web-第十篇章",
              link: "/java-web/java-web-10",
            },
            {
              text: "java-web-第十一篇章",
              link: "/java-web/java-web-11",
            },
            {
              text: "java-web-第十二篇章",
              link: "/java-web/java-web-12",
            },
            {
              text: "java-web-第十三篇章",
              link: "/java-web/java-web-13",
            },
          ],
          collapsible: true,
        },
      ],
    },
    blogConfig: {
      category: {
        location: 3, // 在导航栏菜单中所占的位置，默认2
        text: "博客", // 默认文案 “分类”
      },
      tag: {
        location: 5, // 在导航栏菜单中所占的位置，默认4
        text: "Tag", // 默认文案 “标签”
      },
    },
  },
})
