import css from "./Reviews.module.css";
import axios from "axios";
import quote from "../../assets/quote.png"
import { useState, useEffect } from "react";

const Reviews = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const response = await axios.get("api/reviews",{
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
            <p className={css.min}>Отзывы</p>
            <p className={css.big}>Благодарности наших клиентов</p>
            <div className={css.block_contain}>
                {articles.map((el, index) => (
                    <div key={index} className={css.block}>
                        <img className={css.quote} src={quote} alt="Quote" />
                        <div className={css.name}>
                            <img
                            src={el.image}
                            alt={el.title }/>
                            <div>
                                <p className={css.iam}>
                                    {el.first_name} {el.last_name}
                                </p>
                                <p className={css.title}>{el.job_title}</p>
                            </div>
                        </div>
                        <div className={css.hidden}>
                            <p className={css.text}>{el.title}</p>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
