import React, { useState, useEffect} from "react";
import axios from "axios";
import "./ServicesDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Detail = () => {
    const { slug } = useParams();
    const [selectedId, setSelectedId] = useState(slug);
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [data,setData] = useState([]);
    const navigate = useNavigate();

    const loadArticles = async () => {
        try {
            const response = await axios.get("/api/services", {
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
                    "Pragma": "no-cache"
                }
            });
            console.log("Response Data: beka", response.data);
            setData(response.data)
    
            const selectedItem = response.data.find((item) => item.slug === selectedId);
            
            if (selectedItem) {
                setArticles(selectedItem); 
            } else {
                setError("Элемент не найден.");
            }
        } catch (err) {
            console.error("Ошибка при загрузке данных:", err);
            setError("Ошибка при загрузке данных. Попробуйте позже.");
        }
    };
    

    useEffect(() => {
        if (slug) {  
            loadArticles();
        }
    }, [slug]);

    if (error) return <p>{error}</p>;
    if (!articles) return <p>Новость не найдена!</p>;

    return (
        <div className="container">
            <div className="contentic">
                <div className="block-contain">
                    <img src={articles.baner} alt="" />
                    <div className="divis">
                        <div>
                           <h1 className="h1">{articles.titletwo}</h1>
                        <div className="html" dangerouslySetInnerHTML={{ __html: articles.description }} />
                        </div>
                       <div className="blocks">
                            <p className="she">Наши услуги</p>
                            {data.map((item) => (
                                <div className="cvadr" key={item.id} onClick={() => {navigate(`/Service/${item.slug}`);setSelectedId(item.slug)}}>
                                    <p className="totol">{item.sphere}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Detail;