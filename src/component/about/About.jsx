import css from './About.module.css';
import portret from "../../assets/portrait.png";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from 'react';
import photo from "../../assets/photo_ (1).png"

// const data = [
//   {img:photo, id:1},{img:photo,id:2},{img:photo,id:3},{img:photo,id:4},{img:photo,id:5},
// ]

const About = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await axios.get("api/gallery",{
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
    <div className="container">
      <div className={css.content}>
        <p className={css.aboutus}>O нас</p>
        <div className={css.blockParent}>
          <p className={css.title}>Мы разрабатываем лучшие цифровые продукты для вашего бизнеса</p>
          <div className={css.blockChild}>
            <img src={portret} alt="Portret" />
            <div className={css.gap}>
              <p>Тилек Бегалиев</p>
              <span>Основатель</span>
            </div>
          </div>
        </div>

        <div className={css.gallery}>
          <div className={css.block}>
            {articles.slice(0, 2).map((article) => (
              <div>
                <img key={article.id} src={article.img} alt="" />
              </div>
            ))}
          </div>
          <div><img src={articles[2]?.img} alt="" /></div>
          <div className={css.blocks}>
            {articles.slice(3, 4).map((article) => (
              <><img key={article.id} src={article.img} alt="" /></>
            ))}
            <div>
              <div><img src={articles[4]?.img} alt="" /></div>
              <div className={css.cont}>
                <p>
                  <span>Ещё</span> больше <span> информации</span> о NavisDevs
                </p>
                <Link to='/about'>
                  Подробнее <span><GoArrowUpRight /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
