import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '../components/Layout';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Portfolio from '../components/sections/Portfolio';
import Skills from '../components/sections/Skills';
import Testimonials from '../components/sections/Testimonials';
import Blog, { BlogPost } from '../components/sections/Blog';
import Contact from '../components/sections/Contact';

interface HomeProps {
  posts: BlogPost[];
}

export default function Home({ posts }: HomeProps) {
  return (
    <Layout>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Skills />
      <Testimonials />
      <Blog posts={posts} />
      <Contact />
    </Layout>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  
  let posts: BlogPost[] = [];
  
  try {
    if (fs.existsSync(postsDirectory)) {
      const fileNames = fs.readdirSync(postsDirectory);
      posts = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map((fileName) => {
          const slug = fileName.replace(/\.md$/, '');
          const fullPath = path.join(postsDirectory, fileName);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data } = matter(fileContents);
          
          return {
            slug,
            title: data.title || '',
            date: data.date || '',
            excerpt: data.excerpt || '',
            tags: data.tags || [],
          };
        });
        
      // Sort posts by date descending
      posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  } catch (error) {
    console.error('Error fetching static blog posts:', error);
  }

  return {
    props: {
      posts,
    },
  };
}
