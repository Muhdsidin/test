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

function page() {
  return (
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
                    
                      <TableRow >
                        <TableCell className="font-medium">hello world </TableCell>
                        <TableCell className="hidden md:table-cell">ok</TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="outline">very good person</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/admin/posts/new/edit`)}
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
                                 
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction  className="bg-destructive hover:bg-destructive/90">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                 
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
  )
}

export default page