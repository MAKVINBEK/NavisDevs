import css from "./Steps.module.css"
import { useState, useEffect } from "react"
import axios from "axios"

const Steps = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const response = await axios.get("api/tools/",{
                    headers: {
                      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
                      "Pragma": "no-cache"
                  }
                  });
                setArticles(response.data);
            } catch (err) {
                console.error("Ошибка загрузки:", err);
                setError("Ошибка при загрузке данных. Попробуйте позже.");
            }
        };

        loadArticles();
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div className={css.content}>
            <div className={css.color1}></div>
            <div className={css.color2}></div>
            <div className="container">
                <p className={css.min}>Инструменты</p>
                <p className={css.big}>Мы используем</p>
                <div className={css.parent}>
                    {articles.map((el, index) => (
                        <div key={index} className={css.block}>
                            <span><img src={el.image}/></span>
                            <p>{el.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Steps;