require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

/**
 * 作成するサイトのメタデータや、プラグインの設定を始め、サイトの構成を設定するファイル
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "ESSENTIALS",
    description: "おいしい食材と食事を探求するサイト",
    lang: "ja",
    siteUrl: "https://priceless-aryabhata-c5c774.netlify.app",
    locale: "ja_JP",
    fbappid: "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem", // ローカルにあるファイルを読み込むためのプラグイン
      options: {
        name: "images",
        path: `${__dirname}/src/images/`,
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "ESSENTIALS エッセンシャルズ",
        short_name: "ESSENTIALS",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#477294",
        display: "standalone",
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      },
    },
  ],
}
