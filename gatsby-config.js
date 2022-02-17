/**
 * 作成するサイトのメタデータや、プラグインの設定を始め、サイトの構成を設定するファイル
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
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
  ],
}
