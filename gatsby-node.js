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
      allContentfulCategory {
        edges {
          node {
            categorySlug
            id
            category
            blogpost {
              title
            }
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

  const blogPostPerPage = 6
  const blogPosts = blogresult.data.allContentfulBlogPost.edges.length
  const blogPages = Math.ceil(blogPosts / blogPostPerPage) // 切り上げ

  Array.from({ length: blogPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? "/blog/" : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/blog-template.js"),
      context: {
        skip: blogPostPerPage * i,
        limit: blogPostPerPage,
        currentPage: i + 1,
        isFirst: i + 1 === 1,
        isLast: i + 1 === blogPages,
      },
    })
  })

  blogresult.data.allContentfulCategory.edges.forEach(({ node }) => {
    const catPostsPerPage = 6
    const catPosts = node.blogpost.length
    const catPages = Math.ceil(catPosts / catPostsPerPage)

    Array.from({ length: catPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/cat/${node.categorySlug}/`
            : `/cat/${node.categorySlug}/${i + 1}/`,
        component: path.resolve("./src/templates/cat-template.js"),
        context: {
          catid: node.id,
          catname: node.category,
          catslug: node.categorySlug, // ページネーションのリンク設定に使用する
          skip: catPostsPerPage * i,
          limit: catPostsPerPage,
          currentPage: i + 1,
          isFirst: i + 1 === 1,
          isLast: i + 1 === catPostsPerPage,
        },
      })
    })
  })
}
