'use client';
import React from 'react'
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
import { get } from 'http';

function page() {
  const [data , setData]= useState([])
  const GetForms = async () => {
    try {
      const response = await axios("/api/business-activity");
      setData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  }

   const handleDelete = async (postId) => {
     const response = await axios("/api/business-activity", {method:"DELETE",data:{id:postId}})
     console.log(response.data)
     GetForms()
      // toast({
      //   title: "Post Deleted",
      //   description: "The blog post has been successfully deleted.",
      // });
    };

  useEffect(()=>{
GetForms()
  },[])
  return (
     <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-headline">Email</TableHead>
                      <TableHead className="font-headline hidden md:table-cell">Name</TableHead>
                      <TableHead className="font-headline hidden sm:table-cell">phone</TableHead>
                      <TableHead className="font-headline hidden sm:table-cell">message</TableHead>
                      <TableHead className="font-headline hidden sm:table-cell">activity</TableHead>
                      <TableHead className="font-headline hidden sm:table-cell">details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    
                     {data.map((item)=>(
                       <TableRow key={item._id} >
                        <TableCell className="font-medium">{item.email}</TableCell>
                        <TableCell className="hidden md:table-cell">{item.name}</TableCell>
                        <TableCell className="hidden md:table-cell">{item.phone}</TableCell>
                        <TableCell className="hidden md:table-cell">{item.message}</TableCell>
                        <TableCell className="hidden md:table-cell">{item.activity}</TableCell>
                        <TableCell className="hidden md:table-cell">{item.details}</TableCell>
                        <TableCell className="text-right">
                          
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
                                 
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(item._id)}  className="bg-destructive hover:bg-destructive/90">
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
  )
}

export default page