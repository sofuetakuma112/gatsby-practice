import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"

import Seo from "../components/seo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"

const Blog = ({ data, location, pageContext }) => (
  <Layout>
    <Seo
      pagetitle={`CATEGORY: ${pageContext.catname}`}
      pagedesc={`「${pageContext.catname}」カテゴリーの記事です`}
      pagepath={location.pathname}
    />
    <section className="content bloglist">
      <div className="container">
        <h1 className="bar">CATEGORY: {pageContext.catname}</h1>
        <div className="posts">
          {data.allContentfulBlogPost.edges.map(({ node }) => (
            <article className="post" key={node.id}>
              <Link to={`/blog/post/${node.slug}/`}>
                <figure>
                  <GatsbyImage
                    image={getImage(node.eyecatch.gatsbyImageData)}
                    alt={node.eyecatch.description}
                    style={{ width: "100%" }}
                  />
                </figure>
                <h3>{node.title}</h3>
              </Link>
            </article>
          ))}
        </div>

        <ul className="pagenation">
          {!pageContext.isFirst && (
            <li className="prev">
              <Link
                to={
                  pageContext.currentPage === 2
                    ? `/cat/${pageContext.catslug}`
                    : `/cat/${pageContext.catslug}/${pageContext.currentPage - 1}`
                }
                rel="prev"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>前のページ</span>
              </Link>
            </li>
          )}
          {!pageContext.isLast && (
            <li class="next">
              <Link to={`/cat/${pageContext.catslug}/${pageContext.currentPage + 1}/`} rel="next">
                <span>次のページ</span>
                <FontAwesomeIcon icon={faChevronRight} />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>
  </Layout>
)

export const query = graphql`
  query ($skip: Int!, $limit: Int!, $catid: String!) {
    allContentfulBlogPost(
      filter: {category: {elemMatch: {id: {eq: $catid}}}}
      sort: { fields: publishDate, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          id
          eyecatch {
            gatsbyImageData(width: 500)
            description
          }
          slug
        }
      }
    }
  }
`

export default Blog
