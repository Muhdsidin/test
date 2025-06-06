'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlusCircle, Edit2, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useBlogPosts } from '@/hooks/use-blog-posts';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import axios from "axios"
import { useEffect, useState } from 'react';


export default  function BlogListingPage() {
  const { posts, deletePost } = useBlogPosts();
  const [post , setPost] = useState([])
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async (postId: string) => {
   const response = await axios("/api/delete-blog", {method:"POST",data:{id:postId}})
   console.log(response.data)
   handleGetRequest()
    toast({
      title: "Post Deleted",
      description: "The blog post has been successfully deleted.",
    });
  };

const  handleGetRequest =async()=>{
    try {
      const response = await axios("/api/get-blog");
      setPost(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    handleGetRequest()
  },[])
  // const data = await getBlogPost()
  // console.log(data)

  return (
    <div className="container mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-headline text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your blog content here.</p>
        </div>
        <Button asChild>
          <Link href="/admin/posts/new">
            <PlusCircle className="mr-2 h-5 w-5" />
            Create
          </Link>
        </Button>
      </div>

      {post.length === 0 ? (
         <Card className="text-center py-12">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">No Blog Posts Yet</CardTitle>
              <CardDescription>Ready to share your thoughts? Create your first blog post!</CardDescription>
            </CardHeader>
            <CardContent>
               <Image src="https://placehold.co/400x300.png" alt="Empty state illustration" width={400} height={300} className="mx-auto mb-6 rounded-md shadow-md" data-ai-hint="writer computer"/>
              <Button asChild size="lg">
                <Link href="/admin/posts/new">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Create First Post
                </Link>
              </Button>
            </CardContent>
          </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-headline">Title</TableHead>
                  <TableHead className="font-headline hidden md:table-cell">Tag</TableHead>
                  <TableHead className="font-headline hidden sm:table-cell">Heading</TableHead>
                  <TableHead className="font-headline text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {post.map((post : any) => (
                  <TableRow key={post._id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{post.tag}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline">{post.heading}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.push(`/admin/posts/${post._id}/edit`)}
                        aria-label="Edit Post"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label="Delete Post">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the blog post
                              titled &quot;{post.title}&quot;.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(post._id)} className="bg-destructive hover:bg-destructive/90">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
