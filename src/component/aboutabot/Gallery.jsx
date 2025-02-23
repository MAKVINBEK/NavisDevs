import css from "./Gallery.module.css"
import { useState, useEffect } from "react"
import axios from "axios"

const AboutGallery = () => {

    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const response = await axios.get("api/aboutUsView/",{
                    headers: {
                      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
                      "Pragma": "no-cache" } });
                setArticles(response.data);
            } catch (err) {
                console.error("Ошибка загрузки:", err);
                setError("Ошибка при загрузке данных. Попробуйте позже.");
            }
        };
        loadArticles();
    }, []);

    if (error) return <p>{error}</p>;

    return(
        <div className='container'>
            <p className={css.min+" "+css.mins}>Компания</p>
            <p className={css.aboutus+" "+css.mins}>О нас</p>
            {articles.map((el, index) => (
            <div key={index} className={css.about}>
                <img
                src={el.image}/>
                    <div className={css.compani}>
                    <span className={css.min}>Компания</span>
                    <p className={css.aboutus}>{el.title}</p>
                    <p className={css.text}>{el.description}</p>
                </div>
            </div>
            ))}
        </div>
        )};

export default AboutGallery;