import React, { useEffect, useState } from 'react'

const Stories = () => {
    const [storyIds, setStoryIds] = useState([]);
    const [stories,setStories] = useState([]);

    useEffect(()=>{
    async function fetchStoryIds() {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const data = await response.json();
        setStoryIds(data)
    }
    fetchStoryIds()
    },[])
    useEffect(()=>{
        async function fetchStoryData(){
            const promises = storyIds.slice(0,10).map(async(id)=>{
            const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            const storyData = await storyResponse.json();

            const userResponse = await fetch(`https://hacker-news.firebaseio.com/v0/user/${storyData.by}.json `);
            const useData = await userResponse.json();
            return {...storyData, karma: useData.karma};
            });
            const storyData = await Promise.all(promises);
            const sortesStories = storyData.sort((a,b)=>a.score - b.score)
            setStories(sortesStories)
        }
        fetchStoryData()
    },[storyIds])
  return (
    <div>
        <h1>Hacker News Stories</h1>
        <ul>
            {stories.map((story,index)=>(
            <li key = {index}>
             <img src='Story Images/img3.jpg' style={{height:"150px", width: "150px"}}className='image'/>
            <h5> story url = {story.url}</h5>
            <h5> storty title = {story.title}</h5>
            <h5>story tmestamp = {story.time}</h5>
            <h5>Author id = {story.by}</h5>
            <h5>Story Score = {story.score}</h5>
            <h5>Karma: {story.karma}</h5>
                </li>
            ))}
        </ul>
        
    </div>
  )
}

export default Stories
