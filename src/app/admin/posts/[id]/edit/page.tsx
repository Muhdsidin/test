'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BlogForm } from '@/components/admin/blog-form';
import { useBlogPosts } from '@/hooks/use-blog-posts';
import type { BlogPost } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const { getPostById, updatePost } = useBlogPosts();
  const { toast } = useToast();
  const [initialData, setInitialData] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const postId = typeof params.id === 'string' ? params.id : undefined;

  useEffect(() => {
    if (postId) {
      const post = getPostById(postId);
      if (post) {
        setInitialData(post);
      } else {
        toast({
          title: 'Post not found',
          description: 'The requested blog post could not be found.',
          variant: 'destructive',
        });
        router.replace('/admin/posts');
      }
      setLoading(false);
    } else {
      router.replace('/admin/posts'); // Should not happen if route is matched correctly
    }
  }, [postId, getPostById, router, toast]);

  const handleSubmit = async (data: Omit<BlogPost, 'id' | 'publishDate'> & { publishDate: Date }) => {
    if (!initialData) return;
    try {
      updatePost({ ...initialData, ...data });
      toast({
        title: 'Post Updated!',
        description: `"${data.title}" has been successfully updated.`,
      });
      router.push('/admin/posts');
    } catch (error) {
      console.error('Failed to update post:', error);
       toast({
        title: 'Error Updating Post',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-8">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-40 w-full" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
           <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex justify-end gap-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!initialData) {
     return (
        <Card className="text-center py-12">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Post Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p>The blog post you are trying to edit does not exist or could not be loaded.</p>
              <Button onClick={() => router.push('/admin/posts')} className="mt-4">
                Back to Posts
              </Button>
            </CardContent>
          </Card>
     );
  }


  return (
    <div className="container mx-auto">
      <BlogForm mode="edit" initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}
