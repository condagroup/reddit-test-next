'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };


  const handleCPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password == cPassword) {
      let response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, username, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let data = await response.json();
      console.log(data);
      if (response.ok) {
        toast({
          title: "Success",
          description: "Login is Successful",
        })
      }
      else {
        toast({
          title: "Error",
          description: data.message,
          variant: "destructive"
        })
      }
    } else {
      toast({
        title: "Error",
        description: "Password and Confirm Password do not match",
        variant: "destructive"
      })
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center">
      <Toaster />
      <div className="max-w-md w-full p-6 dark:bg-gray-900 shadow-lg rounded-md">
        <h1 className="text-2xl font-semibold mb-2">Register</h1>
        <div className="text-muted-foreground mb-4">{`Already have an account? `}<Link className="text-blue-600" href={'/login'}>Login</Link></div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold">Username:</label>
            <Input
              type="text"
              value={username}
              placeholder="Username"
              onChange={handleUsernameChange}
              className="border border-gray-500 rounded-md py-2 px-3 w-full bg-transparent focus-within:ring-0 ring-0 focus:outline-none focus:border-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Email:</label>
            <Input
              type="email"
              value={email}
              placeholder="Email"
              onChange={handleEmailChange}
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
          <div className="mb-4">
            <label className="block font-semibold">Confirm Password:</label>
            <Input
              type="password"
              value={cPassword}
              placeholder="Confirm Password"
              onChange={handleCPasswordChange}
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
