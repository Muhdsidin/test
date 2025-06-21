"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import { CalendarIcon, Sparkles, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { generateBlogTitle } from "@/ai/flows/generate-blog-title";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import {updateToCloudinary} from "../../actions/update"

const blogFormSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20),

  heading: z.string().min(3), // ✅ new
  tag: z.string().min(2),     // ✅ new
  
  photo1Url: z.string().url().optional().or(z.literal("")),
 
});


export function EditForm({ mode, initialData, onSubmit }) {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const [data , setData] = useState({})
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [heading, setHeading] = useState("");
  const [tag, setTag] = useState("");

  const [image, setImage] = useState(null);
  console.log(image , heading , title, description , tag)

  const [loading , setLoading] = useState(false) 

  const  handleGetRequest =async()=>{
    setLoading(true)
      try {
        const response = await axios(`/api/get-blog/${params.id}`);
        // setPost(response.data)
        console.log(response.data)
        setData(response.data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
  
    useEffect(()=>{
      handleGetRequest()
    },[])

  const  handleSumbit  = async(e)=>{
    try {
      e.preventDefault()
       const formData = new FormData(e.target);
          const response = await updateToCloudinary(formData);
          console.log(response);

     
    
      toast({
        title: 'Post Created! ',
        description: `"${title}" has been successfully created.`,
      });
      router.push('/');
    } catch (error) {
      console.error('Failed to create post:', error);
      toast({
        title: 'Error Creating Post',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  }

 


  const defaultValues = initialData
    ? {
        ...initialData,
        publishDate: initialData.publishDate
          ? new Date(initialData.publishDate)
          : new Date(),
      }
    : {
        title: "",
        content: "",
        author: "",
        publishDate: new Date(),
        photo1Url: "",
        photo2Url: "",
      };

  const form = useForm({
    resolver: zodResolver(blogFormSchema),
    defaultValues,
  });

  const handleGenerateTitle = async () => {
    const content = form.getValues("content");
    if (!content || content.length < 20) {
      toast({
        title: "Content too short",
        description:
          "Please write at least 20 characters of content to generate a title.",
        variant: "destructive",
      });
      return;
    }
    setIsGeneratingTitle(true);
    try {
      const result = await generateBlogTitle({ content });
      if (result.title) {
        form.setValue("title", result.title, { shouldValidate: true });
        toast({
          title: "Title Generated!",
          description: "A new title has been generated based on your content.",
        });
      }
    } catch (error) {
      console.error("Error generating title:", error);
      toast({
        title: "Error",
        description: "Could not generate title. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingTitle(false);
    }
  };

  const photo1Url = form.watch("photo1Url");
  const photo2Url = form.watch("photo2Url");
  if(loading){
    return (
       <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500" />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          {mode === "create" ? "Create New Blog Post" : "Edit Blog Post"}
        </CardTitle>
        <CardDescription>
          {mode === "create"
            ? "Fill in the details to publish a new post."
            : "Update the details of your existing post."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSumbit} action={updateToCloudinary}  className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input
                      name="title"
                        value={title ? title : data.title}
                        placeholder="Enter blog post title"
                        onChange={(e) => setTitle(e.target.value)}
                      
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGenerateTitle}
                      disabled={
                        isGeneratingTitle ||
                        form.getValues("content").length < 20
                      }
                      className="shrink-0"
                    >
                      <Sparkles
                        className={cn(
                          "mr-2 h-4 w-4",
                          isGeneratingTitle && "animate-spin"
                        )}
                      />
                      {isGeneratingTitle ? "Generating..." : "Generate"}
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <Textarea
                      name="description"
                      value={description ? description : data.description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write your blog post description here..."
                      className="min-h-[200px] font-code"
                    />
                  </FormControl>
                  <FormDescription>
                    The main body of your blog post. Use markdown for formatting
                    if needed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

             <input type="hidden" name="id" value={params.id} />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="headings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Heading</FormLabel>
                    <FormControl>
                      <Input
                        name="heading"
                          value={heading ? heading : data.heading}
                        onChange={(e) => setHeading(e.target.value)}
                        placeholder="heading Of the Post"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="Tags"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormItem>
                      <FormLabel>Tag</FormLabel>
                      <FormControl>
                        <Input
                          name="Tag"
                            value={tag ? tag : data.tag}
                          onChange={(e) => setTag(e.target.value)}
                          placeholder="heading Of the Post"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
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
                    <FormLabel className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" /> Photo 1 URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          setImage(file)
                        }}
                        name="file"
                      />
                    </FormControl>
                    {/* {photo1Url && (
                      <Image
                        src={photo1Url}
                        alt="Photo 1 Preview"
                        width={200}
                        height={150}
                        className="mt-2 rounded-md object-cover border"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )} */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="photo2Url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4" /> Photo 2 URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image2.png"
                        {...field}
                      />
                    </FormControl>
                    {photo2Url && (
                      <Image
                        src={photo2Url}
                        alt="Photo 2 Preview"
                        width={200}
                        height={150}
                        className="mt-2 rounded-md object-cover border"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/posts")}
              >
                Cancel
              </Button>
              <Button type="submit"  disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "Saving..."
                  : mode === "create"
                  ? "Create Post"
                  : "Update Post"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}


