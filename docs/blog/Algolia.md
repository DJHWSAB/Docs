---
layout: doc
---


# 博客优化之开启 Algolia 全文搜索

## Algolia

Algolia 是一个数据库实时搜索服务，能够提供毫秒级的数据库搜索服务，并且其服务能以 API 的形式方便地布局到网页、客户端、APP 等多种场景。

像 VuePress 官方文档就是使用的 Algolia 搜索，使用 Algolia 搜索最大的好处就是方便，它会自动爬取网站的页面内容并构建索引，你只用申请一个 Algolia 服务，在网站上添加一些代码，就像添加统计代码一样，然后就可以实现一个全文搜索功能：

![s](/blog_21.png)

## 申请

 - 搜索服务申请地址：[docsearch.algolia.com/apply/](docsearch.algolia.com/apply/)

 - 打开后填写地址、邮箱和仓库地址等信息，这里注意，网站需要是公开可访问的：

 - 填写完后，等待一段时间（我等了三天），如果申请通过，我们就会收到邮件：

 ![s](/blog_22.png)

 ![s](/blog_23.png)

 - 申请成功后,记得保存这三个后续有用到!!!

## 默认主题

如果你用的是 VitePress VitePress 直接提供了[themeConfig.algolia](https://vitepress.dev/reference/default-theme-search#algolia-search)选项来用 Algolia 搜索替换内置的搜索框：

::: details Click me to view the code
```js
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    search: {
      provider: 'algolia',
      options: {
        // 输入刚才保存的值
        appId: '...',
        apiKey: '...',
        indexName: '...'
      }
    }
  }
})
```
:::

 ![s](/blog_24.png)

## 配置爬虫文件 
- 在项目根目录创建配置 algolia.json （爬虫的配置文件）

::: details Click me to view the code
```js
{
  "index_name": "vitepress-blog", // 之前保存的indexName
  "start_urls": ["https://mingyuli97.github.io/blog"], // 博客地址
  "rateLimit": 8,
  "maxDepth": 10,
  "selectors": {
    "lvl0": {
      "selector": "",
      "defaultValue": "Documentation"
    },
    "lvl1": ".content h1",
    "lvl2": ".content h2",
    "lvl3": ".content h3",
    "lvl4": ".content h4",
    "lvl5": ".content h5",
    "content": ".content p, .content li"
  }
}Ï
```
:::

- 在.github/workflows/deploy.yml文件中补充
```yml
jobs:
  ...
  
  algolia:
    needs: deploy
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Get the content of algolia.json as config
        id: algolia_config
        run: echo "::set-output name=config::$(cat algolia.json | jq -r tostring)"
      - name: Push indices to Algolia
        uses: signcl/docsearch-scraper-action@master
        env:
          APPLICATION_ID: ${{ secrets.APPLICATION_ID }}
          API_KEY: ${{ secrets.API_KEY }}
          CONFIG: ${{ steps.algolia_config.outputs.config }}
```

- 在Github添加两个变量 `APPLICATION_ID` 和 `API_KEY`,记得变量名要和algolia.yml文件中的变量保持一致

![s](/blog_25.png)
