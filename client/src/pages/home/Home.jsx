import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import Sidebar from '../../components/sidebar/Sidebar';
import './home.css';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from '../../config';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();

    useEffect(() => {
        // fetching data function
        // before fetching data, you must add "proxy"
        // to package.json file, and then
        // you can get the api
        const fetchPosts = async () => {
            const response = await axiosInstance.get("/posts" + search);
            setPosts(response.data);
        }
        fetchPosts();
    }, [search])
    return (
        <>
            <Header/>
            <div className="home">
                <Posts posts={posts}/>
                <Sidebar/>
            </div>
        </>
    )
}
