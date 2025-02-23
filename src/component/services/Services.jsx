import css from "./Services.module.css"
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"


const Services = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const response = await axios.get("api/services",{
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
        <div className={css.parent}>
        <div className="container">
            <div className={css.content}>
                <p className={css.min}>Предоставляем</p>
                <p className={css.big}>Наши услуги</p>
                <div className={css.contain_block}>
                    <div className={css.elip}></div>
                    {articles.map((el) => (
                        <Link key={el.id} to={`/Service/${el.slug}`} className={css.div}>
                        <div  className={css.block}>
                            <div className={css.divik}>
                                <div className={css.blockin}>
                        <div><img src={el.image} alt="" /></div>
                        <span><GoArrowUpRight /></span>
                        </div>
                        <h3>{el.sphere}</h3>
                        <p className={css.p}>{el.title}</p>
                        <div className={css.custom_list} dangerouslySetInnerHTML={{ __html:el.industry }}/>
                        </div>
                    </div>
                    </Link>
                    ))}
                </div>
            </div>
        </div>
        </div>
    )
}

export default Services;