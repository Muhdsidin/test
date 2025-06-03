'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { CalendarIcon, Sparkles, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { BlogPost } from '@/lib/types';
import { generateBlogTitle } from '@/ai/flows/generate-blog-title';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

const blogFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }).max(100),
  content: z.string().min(20, { message: 'Content must be at least 20 characters.' }),
  author: z.string().min(2, { message: 'Author name must be at least 2 characters.' }),
  publishDate: z.date({ required_error: 'Publish date is required.' }),
  photo1Url: z.string().url({ message: 'Please enter a valid URL for photo 1.' }).optional().or(z.literal('')),
  photo2Url: z.string().url({ message: 'Please enter a valid URL for photo 2.' }).optional().or(z.literal('')),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

interface BlogFormProps {
  mode: 'create' | 'edit';
  initialData?: BlogPost;
  onSubmit: (data: BlogFormValues) => Promise<void>;
}

export function BlogForm({ mode, initialData, onSubmit }: BlogFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);

  const defaultValues = initialData
    ? {
        ...initialData,
        publishDate: initialData.publishDate ? new Date(initialData.publishDate) : new Date(),
      }
    : {
        title: '',
        content: '',
        author: '',
        publishDate: new Date(),
        photo1Url: '',
        photo2Url: '',
      };

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues,
  });

  const handleGenerateTitle = async () => {
    const content = form.getValues('content');
    if (!content || content.length < 20) {
      toast({
        title: 'Content too short',
        description: 'Please write at least 20 characters of content to generate a title.',
        variant: 'destructive',
      });
      return;
    }
    setIsGeneratingTitle(true);
    try {
      const result = await generateBlogTitle({ content });
      if (result.title) {
        form.setValue('title', result.title, { shouldValidate: true });
        toast({
          title: 'Title Generated!',
          description: 'A new title has been generated based on your content.',
        });
      }
    } catch (error) {
      console.error('Error generating title:', error);
      toast({
        title: 'Error',
        description: 'Could not generate title. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGeneratingTitle(false);
    }
  };
  
  const photo1Url = form.watch('photo1Url');
  const photo2Url = form.watch('photo2Url');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          {mode === 'create' ? 'Create New Blog Post' : 'Edit Blog Post'}
        </CardTitle>
        <CardDescription>
          {mode === 'create' ? 'Fill in the details to publish a new post.' : 'Update the details of your existing post.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input placeholder="Enter blog post title" {...field} />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGenerateTitle}
                      disabled={isGeneratingTitle || form.getValues('content').length < 20}
                      className="shrink-0"
                    >
                      <Sparkles className={cn("mr-2 h-4 w-4", isGeneratingTitle && "animate-spin")} />
                      {isGeneratingTitle ? 'Generating...' : 'Generate'}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog post content here..."
                      className="min-h-[200px] font-code"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The main body of your blog post. Use markdown for formatting if needed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="publishDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Publish Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="photo1Url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><ImageIcon className="h-4 w-4"/> Photo 1 URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image1.png" {...field} />
                    </FormControl>
                    {photo1Url && (
                      <Image src={photo1Url} alt="Photo 1 Preview" width={200} height={150} className="mt-2 rounded-md object-cover border" data-ai-hint="blog visual" onError={(e) => e.currentTarget.style.display='none'}/>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="photo2Url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2"><ImageIcon className="h-4 w-4"/> Photo 2 URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/image2.png" {...field} />
                    </FormControl>
                     {photo2Url && (
                      <Image src={photo2Url} alt="Photo 2 Preview" width={200} height={150} className="mt-2 rounded-md object-cover border" data-ai-hint="article image" onError={(e) => e.currentTarget.style.display='none'}/>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => router.push('/admin/posts')}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? 'Saving...'
                  : mode === 'create'
                  ? 'Create Post'
                  : 'Update Post'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

BlogForm.displayName = 'BlogForm';
