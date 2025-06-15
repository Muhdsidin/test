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
import { useState } from "react";
import {uploadToCloudinary} from "../../actions/upload"
import { set } from "mongoose";

const blogFormSchema = z.object({
   Heading: z.string().min(1),
  Description: z.string().min(1),
  Location: z.string().min(1),
  Type: z.string().min(1),
 
});


export function HireForm({ mode, initialData, onSubmit }) {
  const router = useRouter();
  const { toast } = useToast();
  
  const [description, setDescription] = useState("");
  const [heading, setHeading] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");


  
  

  const  handleSumbit  = async(e)=>{
    try {
      e.preventDefault()
      console.log(heading,description,location,type)
      const response = await axios("/api/hiring", {
        method : "POST",
        data : {
          Heading : heading,
          Description : description,
          Location : location,
          Type : type
        }
      }) 

      console.log(response.data)
     
    
      toast({
        title: 'Post Created! ',  
        description: ` has been successfully created.`,
      });

      setHeading("")
      setDescription("")
      setLocation("")
      setType("")
      // router.push('/');
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

  


  return (
    <Card>
  <CardHeader>
    <CardTitle className="font-headline text-2xl">
      {mode === "create" ? "Create New Record" : "Edit Record"}
    </CardTitle>
    <CardDescription>
      {mode === "create"
        ? "Fill in the details to create a new record."
        : "Update the details of the existing record."}
    </CardDescription>
  </CardHeader>

  <CardContent>
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSumbit}>
        <FormField
          control={form.control}
          name="Heading"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Heading</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter heading"
                  value={heading}
                  onChange={(e) => {
                    field.onChange(e);
                    setHeading(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description"
                  className="min-h-[150px] font-code"
                  value={description}
                  onChange={(e) => {
                    field.onChange(e);
                    setDescription(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="Location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter location or email"
                    value={location}
                    onChange={(e) => {
                      field.onChange(e);
                      setLocation(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter type of Job"
                    value={type}
                    onChange={(e) => {
                      field.onChange(e);
                      setType(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/records")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "Saving..."
              : mode === "create"
              ? "Create Record"
              : "Update Record"}
          </Button>
        </div>
      </form>
    </Form>
  </CardContent>
</Card>

  );
}

HireForm.displayName = "HireForm";
