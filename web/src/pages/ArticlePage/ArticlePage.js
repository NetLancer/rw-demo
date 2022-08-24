import { MetaTags } from '@redwoodjs/web' 
import ArticleCell from 'src/components/ArticleCell' 

const ArticlePage = ({ id }) => {
  return (
    <>
      <MetaTags title="Article" description="Article page" />

      <h1>ArticlePage</h1>
      <ArticleCell id={id} rand={Math.random() * 10} />
    </>
  )
}

export default ArticlePage
