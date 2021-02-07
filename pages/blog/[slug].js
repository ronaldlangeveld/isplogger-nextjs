import React from 'react';
import matter from 'gray-matter';
import LandNav from '../../components/landNav';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
import Footer from '../../components/footer';

const BlogPost = ({content, data}) => {

    const frontmatter = data;

    return (
        <>
        <Head>
        <title>
        {frontmatter.title} | ISP Logger
        </title>
        </Head>
        <LandNav/>
      <section className="section">
             <div className="container">
                <div className="columns is-centered">
                    <div className="column is-8">
                    <h1 className="title has-text-centered">{frontmatter.title}</h1>
                    <div className="content is-medium is-size-6-mobile">
                        <ReactMarkdown source={content} />
                    </div>
                    </div>
                </div>
             </div>
         </section>

         <Footer/>

        </>
    )
}

BlogPost.getInitialProps = async (context) => {
    const { slug } = context.query
    
    // Import our .md file using the `slug` from the URL
    const content = await import(`../_posts/${slug}.md`)
    
    // Parse .md data through `matter`
    const data = matter(content.default)
    
    // Pass data to our component props
    return { ...data }
  
    return { slug }
  }

export default BlogPost;