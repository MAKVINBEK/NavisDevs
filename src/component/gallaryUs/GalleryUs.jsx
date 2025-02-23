import css from "./GallaryUs.module.css" 
import { useState, useEffect } from "react"
import axios from "axios"
const GallaryUs = ()=> {

    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const response = await axios.get("api/gallery",{
                    headers: {
                      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
                      "Pragma": "no-cache"
                  }});
                setArticles(response.data);
            } catch (err) {
                console.error("Ошибка загрузки:", err);
                setError("Ошибка при загрузке данных. Попробуйте позже.");
            }};
        loadArticles();
    }, []);

    if (error) return <p>{error}</p>;

    return(
        <div className='container'>
            <div className={css.galler}>
                <p>Фотографии</p>
                <h2>Галерея</h2>
            <div className={css.photos}>
                {articles.map((item) => (
                    <img key={item.id} src={item.img} alt="" />
                ))}
            </div>
            </div>
            
        </div>
        )
}

export default GallaryUs;