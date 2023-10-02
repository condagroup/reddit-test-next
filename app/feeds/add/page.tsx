'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from 'react';

const NewFeed = () => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    username: '',
    url: '',
    category: '',
    type: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const setCategory = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  const setType = (value: string) => {
    setFormData({
      ...formData,
      type: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let jwt = localStorage.getItem('token')

    try {
      console.log(formData)
      const response = await fetch('http://localhost:3001/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(formData),
      });


      if (response.ok) {
        toast({
          title: 'Feed created successfully',
          description: "You'll be redirected in 3 seconds",
          duration: 5000,
        })
        window.location.href = '/feeds'
      } else if (response.status == 401) {
        toast({
          title: 'An error occurred.',
          description: 'You are not authorized to create a feed.',
          duration: 5000,
          variant: "destructive"
        })
        window.location.href = '/login'
      }
      else {
        toast({
          title: 'An error occurred.',
          description: 'Unable to create feed.',
          duration: 5000,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  useEffect(() => {
    let jwt = localStorage.getItem('token')
    if (!jwt) {
      window.location.href = "/login"
    }
  }, []);

  return (
    <div className="min-h-full flex items-center justify-center">
      <Toaster />
      <div className="max-w-lg w-full p-6 dark:bg-gray-900 shadow-lg rounded-md">
        <h1 className="mb-4 text-2xl font-bold">Create a New Feed</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Title:</Label>
            <Input
              type="text"
              id="title"
              name="title"
              className="bg-transparent border-gray-300"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Image URL:</Label>
            <Input
              type="text"
              id="url"
              name="url"
              className="bg-transparent border-gray-300"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Category:</Label>
            <Select onValueChange={setCategory}>
              <SelectTrigger className="bg-transparent border-gray-300 w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Type:</Label>
            <Select onValueChange={setType}>
              <SelectTrigger className="bg-transparent border-gray-300 w-full">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="text">Content:</Label>
            <Textarea
              id="text"
              name="text"
              className="bg-transparent border-gray-300"
              value={formData.text}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Button className="w-full" type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFeed;
