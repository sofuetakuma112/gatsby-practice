const path = require("path")

// GatsbyのAPI(createPages etc...)を使用するには、gatsby-node.jsファイルを作成し,functionをエクスポートする

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const blogresult = await graphql(`
    query {
      allContentfulBlogPost(sort: { fields: publishDate, order: DESC }) {
        edges {
          node {
            id
            slug
          }
          previous {
            slug
            title
          }
          next {
            slug
            title
          }
        }
      }
    }
  `)

  if (blogresult.errors) {
    reporter.panicOnBuild("GraphQLのクエリでエラーが発生しました")
    return
  }

  blogresult.data.allContentfulBlogPost.edges.forEach(
    ({ node, next, previous }) => {
      createPage({
        path: `/blog/post/${node.slug}`,
        component: path.resolve("./src/templates/blogpost-template.js"),
        context: {
          id: node.id,
          next,
          previous,
        },
      })
    }
  )
}
