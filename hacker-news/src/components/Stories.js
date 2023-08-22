import React, { useEffect, useState } from "react";
import "../styles/Styles.css";

const Stories = () => {
  const [storyIds, setStoryIds] = useState([]);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    async function fetchStoryIds() {
      const response = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );
      const data = await response.json();
      setStoryIds(data);
    }
    fetchStoryIds();
  }, []);
  useEffect(() => {
    async function fetchStoryData() {
      const promises = storyIds.slice(0, 10).map(async (id) => {
        const storyResponse = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        );
        const storyData = await storyResponse.json();

        const userResponse = await fetch(
          `https://hacker-news.firebaseio.com/v0/user/${storyData.by}.json `
        );
        const useData = await userResponse.json();
        return { ...storyData, karma: useData.karma };
      });
      const storyData = await Promise.all(promises);
      const sortesStories = storyData.sort((a, b) => a.score - b.score);
      setStories(sortesStories);
    }
    fetchStoryData();
  }, [storyIds]);
  return (
    <div className="main-page">
      <div className="page-title">
        <h1>Hacker News Stories</h1>
      </div>
      <div className="stories">
        <ul className="container">
          {stories.map((story, index) => (
            <li key={index} className="item">
              <h2> {story.title}</h2>
              <img src="Story Images/img0.jpg" className="image" />
              <p>story tmestamp = {story.time}</p>
              <p>Author id = {story.by}</p>
              <p>Story Score = {story.score}</p>
              <p>Karma: {story.karma}</p>
              <a href=""> {story.url}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stories;
