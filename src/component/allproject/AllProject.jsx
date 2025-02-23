import css from "./AllProject.module.css"
import { GoArrowUpRight } from "react-icons/go";
import { useState, useEffect } from "react"
import axios from "axios"

const AllProject = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const response = await axios.get("api/projects",{
                    headers: {
                      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
                      "Pragma": "no-cache"} });
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
        <div className={css.parent}>
            <div className="container">
                <p className={css.big}>Все проекты</p>
                <div className={css.block_contain}>
                    {articles.map((el) => (
                        <div key={el.id} className={css.block}>
                            <img src={el.image}alt=""/>
                            <div>
                                <p>{el.title}</p>
                                <span><GoArrowUpRight /></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllProject;