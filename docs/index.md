---
layout: home
title: coderccb

hero:
  name: Coderccb Docs
  text: 分享前端知识和遇到的bug。
  tagline: 争取每天进步一点点
  image:
    src: /logo.png
    alt: 网站的 logo 图片
  actions:
    - theme: brand
      text: 快速开始
      link: /blog/
    - theme: alt
      text: 在 github 上查看
      link: https://github.com/DJHWSAB/Docs
features:
  - icon: 📋
    title: 面试专栏
    details: 海量前端面试问题解答，一站式阅读体验。
    link: '/blog/'
    linkText: 开始刷题
  - icon: ⚡️
    title: 前端开发
    details: 从0开始学前端
    link: '/blog/'
    linkText: 开始学习
  - icon: 🛠️
    title: 编程工具
    details: 提高效率
    link: '/tools/'
    linkText: 提高效率
  - icon: 🚚
    title: bug总结
    details: 将日常工作中遇到的问题做一份备忘录，方便查阅。。
    link: '/blog/'
    linkText: 开始查阅
  - icon: 🌱
    title: 成长之路
    details: 记录成长之路
    link: '/blog/'
    linkText: 记录当下
  - icon: ✋
    title: 博客网站
    details: 从0搭建博客网站,到逐渐完善
    link: '/blog/'
    linkText: 开始搞起  
---



<style>
  :root {
    --vp-home-hero-name-color: transparent;
    --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
    /* 鼠标小手 */
    --vp-home-hero-name-cursor: pointer;
  }

  img[data-v-6db2186b],
  img[data-v-262f00eb] {
    border-radius: 50%;
  }

  /* logo */
  .title[data-v-4d981103]:hover, 
  .title[data-v-55e263fd]:hover {
    opacity: 0.6;
    transition: opacity .3s ease-in-out;
  }

  /* 一行只显示3个 */
  .items[data-v-f5090ebe] {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .item.grid-4[data-v-f5090ebe] {
    width: calc((100% - 4.5rem) / 3);
  }

</style>