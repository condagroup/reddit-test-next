'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    let result = await response.json();
    if (response.ok) {
      localStorage.setItem("token", result?.data.token as string | null || "");
      toast({
        title: "Success",
        description: "Login is Successful",
      })
      window.location.href = "/feeds"
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive"
      })
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <Toaster />
      <div className="max-w-md w-full p-6 dark:bg-gray-900 shadow-lg rounded-md">
        <h1 className="text-2xl font-semibold mb-2">Login</h1>
        <div className="text-muted-foreground mb-4">{`Don't have account? `}<Link className="text-blue-600" href={'/register'}>Register</Link></div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold">Username:</label>
            <Input
              type="username"
              value={username}
              placeholder="Username"
              onChange={handleUsernameChange}
              className="border border-gray-500 rounded-md py-2 px-3 w-full bg-transparent focus-within:ring-0 ring-0 focus:outline-none focus:border-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Password:</label>
            <Input
              type="password"
              value={password}
              placeholder="Password"
              onChange={handlePasswordChange}
              className="border border-gray-500 rounded-md py-2 px-3 w-full bg-transparent focus-within:ring-0 ring-0 focus:outline-none focus:border-none"
              required
            />
          </div>
          <div className="text-center">
            <Button
              type="submit"
              className="bg-blue-500 w-full text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
