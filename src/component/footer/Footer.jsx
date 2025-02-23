import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import css from "./Footer.module.css"
import { BiSolidFilePdf } from "react-icons/bi";

const Footer = () => {
    const [articles, setArticles] = useState([]);
    const [selk, setSelk] = useState ([])
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const response = await axios.get("api/Urls_to_social_network",{
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

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const response = await axios.get("api/upload/",{
                    headers: {
                      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
                      "Pragma": "no-cache"
                  }
                  });
                setSelk(response.data);
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
                    <div className={css.block_contain}>
                        <div className={css.div}>
                                <svg width="30" height="30">
                                    <defs>
                                        <linearGradient id="grad1" x1="50%" y1="100%" x2="120%" y2="0%">
                                            <stop offset="22.38%" style={{ stopColor: "#D4151C", stopOpacity: 1 }} />
                                            <stop offset="87.43%" style={{ stopColor: "#D35400", stopOpacity: 1 }} />
                                        </linearGradient>
                                    </defs>
                                    <BiSolidFilePdf size={30} style={{ fill: "url(#grad1)" }} />
                                </svg>
                        {selk.map((el)=>(
                            <a href={el.file} download>Скачать презентацию</a>
                        ))}
                        </div>
                        <div className={css.block_logos}>
                            {articles.map((el)  => (
                                <a href={el.urls} key={el.id}><span><img src={el.logo} alt="" /></span></a>
                            ))}
                        </div>
                    </div>
                    <div className={css.line}></div>
                    <div className={css.block_contains}>
                        <p className={css.p}>Все права защищены</p>
                        <div className={css.menu}>
                            <Link className={css.menu_item} to="/meropreyatiya">Мероприятия</Link>
                            <Link className={css.menu_item} to="/projects">Проекты</Link>
                            <Link className={css.menu_item} to="/partners">Партнеры</Link>
                            <Link className={css.menu_item} to="/reviews">Отзывы</Link>
                            <Link className={css.menu_item} to="/contacts">Контакты</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;