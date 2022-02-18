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
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
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
  ],
}
