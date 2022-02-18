import React from "react"

import Header from "../components/header"
import Footer from "../components/footer"

import "./layout.css"

import "@fortawesome/fontawesome-svg-core/styles.css" // Font Awesomeのcssを先読みする
// import { config } from "@fortawesome/fontawesome-svg-core"
// config.autoAddCss = false // Font Awesomeのコンポーネント内でCSSを適用しないように設定

// <Layout></Layout>で囲んだコンテンツがchildrenプロパティとして渡される
const Layout = ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
)

export default Layout
