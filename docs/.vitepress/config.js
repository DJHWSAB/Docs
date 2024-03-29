import { defineConfig } from 'vitepress';

export default defineConfig({
  // 基础地址
  base: '/Docs/',
  // 语言
  lang: 'en',
  // 站点标题
  title: "coderccb Docs",
  // 描述
  description: '前端小知识',
  // 主题
  themeConfig: {
    siteTitle: 'coderccb',
    logo: 'logo.png',
    // 主导航栏
    nav: [
      // link 点击时跳转的默认地址
      // activeMatch 无论在 guide 下的哪一个子菜单都会保持高亮。
      {
        text: 'Code',
        activeMatch: '/code/',
        items: [
          { text: 'js', link: '/code/' },
        ]
      },
      {
        text: 'Interview',
        activeMatch: '/interview/',
        items: [
          { text: 'js', link: '/interview/' },
          { text: 'js高级', link: '/interview/js高级' },
        ]
      },
      {
        text: 'Bug',
        activeMatch: '/bug/',
        items: [
          { text: 'js', link: '/bug/' },
        ]
      },
      { text: 'Blog', link: '/blog/', activeMatch: '/blog/' },
      {
        text: 'Tools',
        activeMatch: '/tools/',
        items: [
          { text: '编程软件', link: '/tools/software/' },
          { text: '效率提升', link: '/tools/hoist/' }
        ]
      },
      {
        text: 'About', link: '/about/', activeMatch: '/about/'
      }
    ],
    // 社交链接
    socialLinks: [
      // 默认支持 'discord' | 'facebook' | 'github' | 'instagram' | 'linkedin' | 'slack' | 'twitter' | 'youtube'
      { icon: "github", link: "https://github.com" }
    ],
    // 侧边导航栏
    sidebar: {
      '/blog/': [
        {
          text: 'Blog',
          items: [
            { text: '搭建自己的 VitePress 个人博客', link: '/blog/' }, // /guide/index.md
            { text: '博客优化之开启 Algolia 全文搜索', link: '/blog/Algolia' }, // /guide/Algolia.md
            { text: '每日节点', link: '/blog/nodeUpdate' } // /guide/nodeUpdate.md
          ],
          // 是否收缩
          collapsible: true,
          // 是否折叠
          collapsed: false,
        }
      ],
      '/code/': [
        {
          text: 'Code',
          items: [
            { text: 'js', link: '/code/' }, // /code/index.md
            { text: 'words', link: '/code/words' }, // /code/words.md
          ],
          // 是否收缩
          collapsible: true,
          // 是否折叠
          collapsed: false,
        }
      ],
      '/bug/': [
        {
          text: 'Bug',
          items: [
            { text: 'js', link: '/bug/' }, // /bug/index.md
          ],
          // 是否收缩
          collapsible: true,
          // 是否折叠
          collapsed: false,
        }
      ],
      '/tools/': [
        {
          text: '编程软件',
          items: [
            { text: 'Vscode', link: '/tools/software/' }, // /tools/software/index.md
            { text: 'Chrome', link: '/tools/software/chrome' }, // /tools/software/chrome.md
            { text: 'Souhu', link: '/tools/software/souhu' }, // /tools/software/souhu.md
            { text: 'Typora', link: '/tools/software/typora' }, // /tools/software/typora.md
            { text: 'clash_Verge', link: '/tools/software/clash_Verge' }, // /tools/software/clash_Verge.md
          ],
          // 是否收缩
          collapsible: true,
          // 是否折叠
          collapsed: false,
        },
        {
          text: '效率提升',
          items: [
            { text: 'Github', link: '/tools/hoist/' }, // /tools/hoist/index.md
            { text: 'Xcode', link: '/tools/hoist/xcode' }, // /tools/hoist/xcode.md
            { text: 'Brew', link: '/tools/hoist/brew' }, // /tools/hoist/brew.md
            { text: 'iterm', link: '/tools/hoist/iterm' }, // /tools/hoist/iterm.md
            { text: 'zsh', link: '/tools/hoist/zsh' }, // /tools/hoist/zsh.md
            { text: 'mac', link: '/tools/hoist/mac' }, // /tools/hoist/mac.md
            { text: 'win', link: '/tools/hoist/win' }, // /tools/hoist/win.md
            { text: 'listary', link: '/tools/hoist/listary' }, // /tools/hoist/listary.md
            { text: 'thor', link: '/tools/hoist/thor' }, // /tools/hoist/thor.md
            { text: 'google', link: '/tools/hoist/google' }, // /tools/hoist/google.md
            { text: 'npkill', link: '/tools/hoist/npkill' }, // /tools/hoist/npkill.md
            { text: 'U盘', link: '/tools/hoist/U盘' }, // /tools/hoist/U盘.md
            { text: 'LX', link: '/tools/hoist/music' }, // /tools/hoist/music.md
            { text: '字幕生成', link: '/tools/hoist/字幕生成' }, // /tools/hoist/字幕生成.md
            { text: 'Alfred', link: '/tools/hoist/Alfred' }, // /tools/hoist/Alfred.md
          ],
          // 是否收缩
          collapsible: true,
          // 是否折叠
          collapsed: false,
        }
      ],
      '/about/': [
        {
          text: 'About',
          items: [
            { text: 'Index', link: '/about/' }, // /about/index.md
            { text: 'One', link: '/about/one' }, // /about/one.md
            { text: 'Two', link: '/about/two' } // /about/two.md
          ],
          // 是否收缩
          collapsible: true,
          // 是否折叠
          collapsed: false,
        }
      ],
    },
    // 搜索
    search: {
      provider: 'algolia',
      options: {
        appId: 'G8OVGKU8E1',
        apiKey: 'a1d249001bdaa0217999bdac930e178c',
        indexName: 'djhwsabio',
      }
    },
    // 上下翻页
    docFooter: { prev: '上一篇', next: '下一篇' },
    // 编辑链接
    editLink: {
      pattern: 'https://github.com/DJHWSAB/Docs/edit/main/docs/:path',
      text: '在github上编辑此页'
    },
    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present Evan You'
    },
    // outline设置为deep可以解析2-6层深度的标题嵌套
    outline: {
      level: 'deep',
      label: '本页目录'
    },
    lastUpdatedText: "最近更新时间",
    // aside，设定为false将关闭右侧栏，文档内容会填充剩余空白部分
    aside: true,
    // 暂时没发现这个属性有啥用
    outlineBadges: true,
    // 设置所有aside的标题
    outlineTitle: "just an demo",
  },
  // 最后更新时间
  lastUpdated: true,
  // 站点图标
  head: [
    [ 'link', { rel: 'icon', href: 'logo.png' }],
    // 添加 Permissions-Policy HTTP响应头
    [ 'meta', { 'http-equiv': 'Permissions-Policy', content: 'geolocation=(), camera=(), microphone=()' }]

  ],
  // 简洁化URL，即我们访问文件时不需要加后缀了，直接 /xxx/xxx即可，不要/xxx/xxx.md
  cleanUrls: true,
  // 当设置为true时，VitePress不会因死链接而导致构建失败。
  ignoreDeadLinks: true,
  // base: '/Coderccb-Docs/'
  markdown: {
    lineNumbers: true,
  },
});