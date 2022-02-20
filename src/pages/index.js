import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"

import Seo from "../components/seo"

const Home = ({ data }) => {
  return (
    <Layout>
      <Seo />
      <section className="hero">
        <figure>
          {/* <img src="/images/hero.jpg" alt="" /> */}
          <Img
            fluid={data.hero.childImageSharp.fluid}
            alt=""
            style={{ height: "100%" }}
          />
        </figure>
        <div className="catch">
          <h1>
            There is no love sincerer than
            <br /> the love of food.
          </h1>
          <p>食物を愛するよりも誠実な愛はない ― バーナード・ショー</p>
        </div>
        <div className="wave">
          {/* <img src="/images/wave.svg" alt="" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1366 229.5"
            fill="#fff"
          >
            <path
              d="M1369,6.3C1222.5-12.2,1189.5,8,919.2,96.6C665,179.8,160,141.7-2,53.1v150l1371-14.2V6.3z"
              opacity=".53"
            />
            <path d="M1369 229.5V55.8c-9.5-2.4-19.2-4.4-28.9-5.8-196.9-29.9-203.4-15.8-503.9 82.6-219.8 72-627.6 53.2-838.2-10.5v107.4h1371z" />
          </svg>
        </div>
      </section>
      <section className="food">
        <div className="container">
          <h2 className="bar">
            Food <span>Essence</span>
          </h2>
          <div className="details">
            <div className="detail">
              <figure>
                <Img fixed={data.fruit.childImageSharp.fixed} alt="" />
              </figure>
              <h3>フルーツ</h3>
              <p>FRUIT</p>
              <p>
                甘くてすっぱくておいしい果実たち。
                <br />
                旬のフルーツを満喫します。
              </p>
            </div>
            <div className="detail">
              <figure>
                {/* <img src="/images/grain.jpg" alt="" /> */}
                <Img fixed={data.grain.childImageSharp.fixed} alt="" />
              </figure>
              <h3>穀物</h3>
              <p>GRAIN</p>
              <p>
                食事の基本となる穀物。
                <br />
                毎日の活動のエネルギー源になります。
              </p>
            </div>
            <div className="detail">
              <figure>
                {/* <img src="/images/beverage.jpg" alt="" /> */}
                <Img fixed={data.beverage.childImageSharp.fixed} alt="" />
              </figure>
              <h3>飲み物</h3>
              <p>BEVERAGE</p>
              <p>
                リラックスするのに欠かせない飲み物。
                <br />
                お気に入りの一杯はありますか？
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="photo">
        <h2 className="sr-only">Photo</h2>
        <figure>
          {/* <img src="/images/berry.jpg" alt="赤く熟したベリー" /> */}
          <Img
            fluid={data.berry.childImageSharp.fluid}
            alt="赤く熟したベリー"
            style={{ height: "100%" }}
          />
        </figure>
      </section>
      <section>
        <div className="container">
          <h2 className="sr-only">RECENT POSTS</h2>
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
        </div>
      </section>
    </Layout>
  )
}

// ファイルごとに一つのページクエリしか設定できない
// ページコンポーネントでのクエリ結果はdataプロパティに返ってくる
export const query = graphql`
  query {
    hero: file(relativePath: { eq: "hero.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    fruit: file(relativePath: { eq: "fruit.jpg" }) {
      childImageSharp {
        fixed(width: 200) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    grain: file(relativePath: { eq: "grain.jpg" }) {
      childImageSharp {
        fixed(width: 200) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    beverage: file(relativePath: { eq: "beverage.jpg" }) {
      childImageSharp {
        fixed(width: 200) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
    berry: file(relativePath: { eq: "berry.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    allContentfulBlogPost(
      sort: { fields: publishDate, order: DESC }
      limit: 4
      skip: 0
    ) {
      edges {
        node {
          title
          id
          eyecatch {
            gatsbyImageData(width: 573)
            description
          }
          slug
        }
      }
    }
  }
`

export default Home
