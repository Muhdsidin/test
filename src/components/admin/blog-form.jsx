"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
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
import { uploadToCloudinary } from "../../actions/upload";

const blogFormSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20),

  heading: z.string().min(3), // ✅ new
  tag: z.string().min(2), // ✅ new

  photo1Url: z.string().url().optional().or(z.literal("")),
});

export function BlogForm({ mode, initialData, onSubmit }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [heading, setHeading] = useState("");
  const [tag, setTag] = useState("");
  const [errors, setErrors] = useState({});
  
  const [image, setImage] = useState(null);
  console.log(image, heading, title, description, tag);
  
  const handleSumbit = async (e) => {
    
    e.preventDefault();

    const newErrors = {};

    if (title.trim().length < 5)
      newErrors.title = "Title must be at least 5 characters.";
    if (description.trim().length < 20)
      newErrors.description = "Description must be at least 20 characters.";
    if (heading.trim().length < 3)
      newErrors.heading = "Heading must be at least 3 characters.";
    if (tag.trim().length < 2)
      newErrors.tag = "Tag must be at least 2 characters.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    
    const formData = new FormData(e.target);
    const response = await uploadToCloudinary(formData);
    console.log(response);

    setErrors({});
    if(newErrors.length > 0) return 

    try {
      toast({
        title: "Post Created!",
        description: `"${title}" has been successfully created.`,
      });
      router.push("/");
    } catch (error) {
      console.error("Failed to create post:", error);
      toast({
        title: "Error Creating Post",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

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
          <form onSubmit={handleSumbit} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <div className=" grid-cols-2 items-center gap-2">
                    <FormControl>
                      <Input
                        name="title"
                        placeholder="Enter blog post title"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormControl>
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title}
                      </p>
                    )}
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
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write your blog post description here..."
                      className="min-h-[200px] font-code"
                    />
                  </FormControl>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description}
                    </p>
                  )}

                  <FormDescription>
                    The main body of your blog post. Use markdown for formatting
                    if needed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                        onChange={(e) => setHeading(e.target.value)}
                        placeholder="heading Of the Post"
                      />
                    </FormControl>
                    {errors.heading && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.heading}
                      </p>
                    )}

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
                          onChange={(e) => setTag(e.target.value)}
                          placeholder="heading Of the Post"
                        />
                      </FormControl>
                      {errors.tag && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.tag}
                        </p>
                      )}
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
                          setImage(file);
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
              <Button type="submit" disabled={form.formState.isSubmitting}>
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

BlogForm.displayName = "BlogForm";
