import React, { useState, useEffect, useRef } from "react";
import { SlArrowLeft } from "react-icons/sl";
import "./Vacancies.css";
import file from "../../assets/file.png";
import axios from "axios";
import InputMask from 'react-input-mask'

const Vacancies = () => {
  const [activeCategory, setActiveCategory] = useState("Backend");
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [fileAttached, setFileAttached] = useState(false);
  const fileInputRef = useRef(null);
  

  const [formData, setFormData] = useState({
    phone_number: "",
    email: "",
    name: "",
    urls: "",
    fields: null, 
  });

  const [status, setStatus] = useState();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        setFileAttached(true);
        setFormData((prev) => ({ ...prev, fields: selectedFile }));
    }
};

const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].trim();
          if (cookie.startsWith(name + "=")) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.phone_number || formData.phone_number.length < 13) {
    alert("Номер телефона должен содержать не менее 13 символов!");
}
  console.log("Отправляемые данные:", formData);

  const formDataToSend = new FormData();
  formDataToSend.append("name", formData.name);
  formDataToSend.append("phone_number", formData.phone_number.replace(/\D/g, ""));
  formDataToSend.append("email", formData.email);
  formDataToSend.append("urls", formData.urls);

  if (formData.fields) {
    formDataToSend.append("fields", formData.fields); 
    console.log("Файл добавлен в FormData:", formData.fields);
  } else {
    console.log("Файл не выбран");
  }

  try {
    const response = await axios.post("/api/jobApplication", formDataToSend,{
      headers: {
          "X-CSRFToken": getCookie("csrftoken")
      },})
    console.log("Ответ сервера:", response.data);
    setStatus("Сообщение отправлено!");

    setFormData({
      phone_number: "",
      email: "",
      name: "",
      urls: "",
      fields: null,
    });
    setFileAttached(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  } catch (error) {
    console.log("Ошибка при отправке:", error.response?.data || error.message);
    setStatus("Ошибка отправки!");
  }
};

useEffect(() => {
  if (status) {
      alert(status);
      setStatus("");
  }
}, [status]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await axios.get("api/vacancy", {});
        setArticles(response.data);
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
        setError("Ошибка при загрузке данных. Попробуйте позже.");
      }
    };

    loadArticles();
  }, [activeCategory]);

  if (error) return <p>{error}</p>;

  const vacancies = articles[activeCategory] || [];

  const resetVacancy = () => {
    setSelectedVacancy(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="contain">
      <div className="container">
        <div className={selectedVacancy ? "ext" : ""}>
          <div onClick={resetVacancy} className={selectedVacancy ? "exts" : "lol"}>
            <SlArrowLeft />
          </div>
          <h3 className={selectedVacancy ? "h3 h30" : "h3"}>Вакансии</h3>
        </div>

        {!selectedVacancy && (
          <div className="categories">
            {Object.keys(articles).map((category) => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => {
                  setActiveCategory(category);
                  resetVacancy();
                }}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="content">
          <div className={selectedVacancy ? "vacancy-list vacancy-listno" : "vacancy-list"}>
            {vacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className={selectedVacancy ? "none vacancy-card" : "vacancy-card"}
                onClick={() => {
                  setSelectedVacancy(vacancy);
                  scrollToTop();
                }}
              >
                <div className="div">
                  <div className="divs div1">
                    <p>{vacancy.schedule}</p>
                  </div>
                  <div className="divs div2">
                    <p>{vacancy.level}</p>
                  </div>
                </div>
                <h3 className="title">{vacancy.title_work}</h3>
                <div className="border"></div>
                <p className="text">{vacancy.title}</p>
              </div>
            ))}
          </div>

          {selectedVacancy && (
            <div className="detail">
              <div className="vacancy-details">
                <div className="div">
                  <div className="divs div1">
                    <p>{selectedVacancy.schedule}</p>
                  </div>
                  <div className="divs div2">
                    <p>{selectedVacancy.level}</p>
                  </div>
                </div>
                <h3 className="title">{selectedVacancy.title_work}</h3>
                <div className="border tops"></div>
                <div
                  className="description"
                  key={selectedVacancy.id}
                  dangerouslySetInnerHTML={{ __html: selectedVacancy.content }}
                />
              </div>

              <div className="font">
                    <p className="fontSpan">Заявка</p>
                    <p className="fontTitle">Оставьте свои данные для отклика</p>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="input">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Имя"
                                required
                            /><InputMask
                            mask="+996 XXX XX XX XX"
                            maskChar=" "
                            type="tel"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            placeholder="номер телефона"
                            required
                            formatChars={{ "X": "[0-9]" }}
                        />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Электронная почта"
                                required
                            />
                            <input
                                type="text"
                                name="urls"
                                value={formData.urls}
                                onChange={handleChange}
                                placeholder="Ссылка на соцсеть (LinkedIn)"
                            />
                        </div>

                        <div className="fail">
                            {fileAttached ? "✅" : <img src={file}/>}
                            <p>{fileAttached ? "Файл прикреплен" : "Прикрепить файл"}</p>
                            <input
                                type="file"
                                name="fields"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </div>
                        <button type="submit">Отправить</button>
                    </form>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Vacancies;
