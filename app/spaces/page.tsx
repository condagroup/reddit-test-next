'use client'

import { PlusCircle, UserIcon } from "lucide-react";
import { useEffect, useState } from 'react';

const Feeds = () => {
  const [feeds, setFeeds] = useState([]);
  const [filteredFeeds, setFilteredFeeds] = useState([]);
  const [tag, setTag] = useState(0);

  useEffect(() => {
    let jwt = localStorage.getItem('token')
    if (!jwt) {
      window.location.href = "/login"
    }
    async function fetchFeeds() {
      try {
        const response = await fetch('http://localhost:3001/api/posts/list', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setFeeds(data);
          setFilteredFeeds(data)
          setTag(0)
        } else {
          console.error('Failed to fetch feeds');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    }

    fetchFeeds();
  }, []);

  return (
    <div className="container mt-20 w-full flex flex-col justify-start items-center">
      <div className="flex md:w-[700px] justify-between items-center w-full">
        <div>
          <h1 className="my-4 text-2xl font-bold">Spaces</h1>
        </div>
      </div>
      <div className="flex md:w-[700px] justify-start gap-4 items-center w-full mb-4">
        <div onClick={() => {
          setFilteredFeeds(feeds)
          setTag(0)
        }} className={"rounded-lg min-w-[100px] text-center border border-gray-200 p-2 shadow-md dark:border-gray-700 cursor-pointer" + (tag === 0 ? " bg-white dark:bg-gray-800" : "")}>
          All Spaces
        </div>
        <div onClick={() => {
          setFilteredFeeds(feeds.filter((feed: any) => feed.category === "all"))
          setTag(1)
        }} className={"rounded-lg min-w-[100px] text-center border border-gray-200 p-2 shadow-md dark:border-gray-700 cursor-pointer" + (tag === 1 ? " bg-white dark:bg-gray-800" : "")}>
          All
        </div>
        <div onClick={() => {
          setFilteredFeeds(feeds.filter((feed: any) => feed.category === "social"))
          setTag(2)
        }} className={"rounded-lg min-w-[100px] text-center border border-gray-200 p-2 shadow-md dark:border-gray-700 cursor-pointer" + (tag === 2 ? " bg-white dark:bg-gray-800" : "")}>
          Social
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {filteredFeeds.map((feed: any, index: number) => (
          <article key={index} className="rounded-lg md:w-[700px] sm:w-[600px] w-96 border border-gray-200 bg-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-5 flex items-center justify-between text-gray-500">
              <span className="bg-primary-100 text-primary-800 dark:bg-primary-200 dark:text-primary-800 inline-flex items-center rounded text-xs font-medium">
                <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"></path><path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path></svg>
                Feed
              </span>
              <span className="text-sm">{new Date(feed.created).toDateString()}</span>
            </div>
            <div className="flex gap-1 justify-start items-end mb-5">
              <div className="border-2 w-fit aspect-square border-white rounded-full">
                <UserIcon />
              </div>
              <div className="font-bold">
                {feed.author.username}
              </div>
            </div>
            <div className="mb-5">
              <img className="rounded-lg w-full h-96 object-cover" src={feed.url} alt="" />
            </div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">{feed.title}</a></h2>
            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{feed.text}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-medium dark:text-white">
                  {feed.user}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Feeds;
