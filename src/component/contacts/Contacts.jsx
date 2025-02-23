import Aplication from '../aplication/Aplication'
import css from './Contacts.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Contacts = () => {
    const [articles, setArticles] = useState([]);
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

    if (error) return <p>{error}</p>;
    return(
        <div className={css.parent}>
            <div className="container">
                <div className={css.content}>
                <p className={css.min}>Заявка</p>
                <h1 className={css.big}>Получить бесплатную консультацию</h1>
                    <Aplication/>
                    <div className={css.sotset}>
                        <p >Мы в соцсетях:</p>
                        <div className={css.icons}>
                        {articles.map((el)  => (
                                <a href={el.urls} key={el.id}><span><img src={el.logo} alt="" /></span></a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
export default Contacts