import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import Layout from '../../components/Layout';

interface PostPageProps {
  post: {
    title: string;
    date: string;
    content: string;
    tags: string[];
    excerpt: string;
  };
}

export default function PostPage({ post }: PostPageProps) {
  if (!post) return null;

  return (
    <Layout>
      <article className="py-24 px-6 md:px-12 max-w-3xl mx-auto">
        <Link 
          href="/#blog" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 transition-colors mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <header className="mb-10">
          <div className="flex gap-2 mb-4">
            {post.tags.map((tag) => (
              <span 
                key={tag}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border border-violet-100/40 dark:border-violet-900/30"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-zinc-900 dark:text-white leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            <Calendar className="w-4 h-4" />
            <span>Published on {post.date}</span>
          </div>
        </header>

        {/* Content Body */}
        <div 
          className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 space-y-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  
  if (!fs.existsSync(postsDirectory)) {
    return { paths: [], fallback: false };
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const paths = fileNames
    .filter(f => f.endsWith('.md'))
    .map((fileName) => ({
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const fullPath = path.join(process.cwd(), 'content/blog', `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Markdown to simple HTML converter
  const parsedContent = content
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold font-heading text-zinc-900 dark:text-white mt-6 mb-3">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold font-heading text-zinc-900 dark:text-white mt-8 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold font-heading text-zinc-900 dark:text-white mt-10 mb-6">$1</h1>')
    .replace(/^\- (.*$)/gim, '<li class="list-disc ml-6 my-1.5 text-zinc-700 dark:text-zinc-300">$1</li>')
    .replace(/^\d+\.\s(.*$)/gim, '<li class="list-decimal ml-6 my-1.5 text-zinc-700 dark:text-zinc-300">$1</li>')
    .split('\n\n')
    .map(para => {
      const trimmed = para.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<h') || trimmed.startsWith('<li')) {
        return trimmed;
      }
      return `<p class="my-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">${trimmed}</p>`;
    })
    .filter(p => p !== '')
    .join('\n');

  return {
    props: {
      post: {
        title: data.title || '',
        date: data.date || '',
        excerpt: data.excerpt || '',
        tags: data.tags || [],
        content: parsedContent,
      },
    },
  };
}
