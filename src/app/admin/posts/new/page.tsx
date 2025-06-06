'use client';

import { useRouter } from 'next/navigation';
import { BlogForm } from '@/components/admin/blog-form';
import { useBlogPosts } from '@/hooks/use-blog-posts';
import type { BlogPost } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function NewPostPage() {
  const router = useRouter();
  const { addPost } = useBlogPosts();
  const { toast } = useToast();

  const handleSubmit = async (data: any) => {
    try {
      addPost(data);
      toast({
        title: 'Post Created!',
        description: `"${data.title}" has been successfully created.`,
      });
      router.push('/admin/posts');
    } catch (error) {
      console.error('Failed to create post:', error);
      toast({
        title: 'Error Creating Post',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto">
      <BlogForm mode="create" onSubmit={handleSubmit} initialData={undefined} />
    </div>
  );
}
