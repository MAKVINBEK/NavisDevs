import React, { useState, useEffect } from "react";
import { SlArrowLeft } from "react-icons/sl";
import "./Events.css";
import axios from "axios";
import { FaRegCalendarDays } from "react-icons/fa6";
import { CgPin } from "react-icons/cg";
import { IoMdTime } from "react-icons/io";

const Events = () => {
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const response = await axios.get("api/events",{
                  headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
                    "Pragma": "no-cache"}
                });
                setArticles(response.data);
            } catch (err) {
                console.error("Ошибка загрузки:", err);
                setError("Ошибка при загрузке данных. Попробуйте позже."); }};
        loadArticles();
    }, []);

    if (error) return <p>{error}</p>;

  const resetVacancy = () => {
    setSelectedVacancy(null);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", 
    });
  };

  return (
    <div className="contain">
      <div className="container">
        <div className={selectedVacancy ? "ext" : ""}>
          <div onClick={resetVacancy} className={selectedVacancy ? "exts" : "lol"}>
            <SlArrowLeft />
          </div>
          <h3 className={selectedVacancy ? "h3 h30" : "h3"}>Мероприятия</h3>
        </div>

        <div className="content">
          <div className={selectedVacancy ? "vacancy-list vacancy-listno" : "vacancy-list"}>
            {articles.map((vacancy) => (
              <div
                key={vacancy.id}
                className={selectedVacancy ? "none vacancy-cards" : "vacancy-cards"}
                onClick={() => {
                  setSelectedVacancy(vacancy);
                  scrollToTop();
                }}>
                  <div className="blockTop">
                <div className="divsik">
                  <img src={vacancy.image} alt="" />
                </div>
                <h3 className="title">{vacancy.topic}</h3>
                <div className="border"></div>
                <p className="texts">{vacancy.title}</p>
                </div>
                <div className="blockAdres">
                <div className="adres">
                  <span><FaRegCalendarDays /></span>
                  <p>{vacancy.date}</p>
                </div>
                <div className="adres">
                  <span><IoMdTime /></span>
                  <p>{vacancy.time}</p>
                </div>
                <div className="adres">
                  <span><CgPin /></span>
                  <p>{vacancy.location}</p>
                </div>
              </div>
              </div>
            ))}
          </div>

          {selectedVacancy && (
            <div className="detail">
              <div className="vacancy-details">
              <img src={selectedVacancy.image} alt="" />
                <h3 className="title">{selectedVacancy.topic}</h3>
                <div className="border tops"></div>
                <div className="descriptions" dangerouslySetInnerHTML={{ __html: selectedVacancy.description }}/>
                <div className="blockAdres">
                <div className="adres">
                  <span><FaRegCalendarDays /></span>
                  <p>{selectedVacancy.date}</p>
                </div>
                <div className="adres">
                  <span><IoMdTime /></span>
                  <p>{selectedVacancy.time}</p>
                </div>
                <div className="adres">
                  <span><CgPin /></span>
                  <p>{selectedVacancy.location}</p>
                </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
