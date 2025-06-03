import type { BlogPost } from './types';

export const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14',
    content: 'Next.js 14 introduces new features like Server Actions and improved Turbopack support. In this post, we explore how to set up a new project and leverage these capabilities for better performance and developer experience.',
    author: 'Admin User',
    publishDate: '2023-10-26',
    photo1Url: 'https://placehold.co/600x400.png',
    photo2Url: 'https://placehold.co/600x400.png',
  },
  {
    id: '2',
    title: 'Deep Dive into Tailwind CSS',
    content: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. Learn advanced techniques, customization options, and best practices for efficient styling.',
    author: 'Jane Dev',
    publishDate: '2023-11-15',
    photo1Url: 'https://placehold.co/600x400.png',
    photo2Url: 'https://placehold.co/600x400.png',
  },
  {
    id: '3',
    title: 'Mastering React Server Components',
    content: 'React Server Components (RSCs) are changing how we build React applications. This guide covers their benefits, usage patterns, and how they integrate with Next.js.',
    author: 'Alex Coder',
    publishDate: '2023-12-05',
    photo1Url: 'https://placehold.co/600x400.png',
    photo2Url: 'https://placehold.co/600x400.png',
  },
];
