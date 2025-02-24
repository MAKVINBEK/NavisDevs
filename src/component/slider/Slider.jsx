import css from "./Slider.module.css";
import image1 from "../../assets/image (1).png";
import image2 from "../../assets/image (2).png";
import image3 from "../../assets/image (3).png";
import image4 from "../../assets/image (4).png";
import image5 from "../../assets/image (5).png";
import image6 from "../../assets/image.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import InputMask from 'react-input-mask'


const BackgroundSlider = () => {
    const images = [image1, image2, image3, image4, image5, image6];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [formData, setFormData] = useState({
        phone_number:"",
        email:"",
    });
    const[status, setStatus] = useState()

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

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
        const phoneDigits = formData.phone_number.replace(/\D/g, '');
    
    if (phoneDigits.length < 13) {
        alert("Введен не полный номер телефона!");
        return;
    }
        console.log(formData);
        if (!formData.phone_number || formData.phone_number.length < 13) {
            alert("Номер телефона должен содержать не менее 13 символов!");
        }
        try{
            const response = await axios.post("/api/consultation/",formData,{
                headers: {
                    "X-CSRFToken": getCookie("csrftoken")
                },}) 
                console.log("Ответ сервера:", response.data);
        setStatus("Сообщение отправлено!");
        setFormData({ email: "", phone_number: "",}); 
    } catch (error) {
        console.log(error.response?.data);
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
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); 

        return () => clearInterval(interval); 
    }, [images.length]);

    return (

        <div className={css.backgroundSlider}>
            <div className="container">
                <div className={css.parent}>
                    <div className={css.elip}></div>
                <div className={css.content}>
                <p className={css.min}>IT компания</p>
                <h2>Разработка <span>цифрового продукта </span> <br /> для вашего бизнеса</h2>
                <p className={css.slidTitle}>Заказывайте у нас проекты для электронной коммерции,<br /> и будьте лучшими в вашей сфере </p>
                <p className={css.slidTitleBig}>Мы готовы помочь! Оставьте заявку, и мы с радостью<br />
                    свяжемся с вами, чтобы провести бесплатную консультацию</p>
                <form className={css.aplication} onSubmit={handleSubmit}>
                <InputMask
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
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Электронная почта" required />
                    <button type="submit">Отправить</button>
                </form>
            </div>
                </div>
             
             </div>
            <div className={css.imageContainer}>
                {images.map((el, index) => (
                    <img
                        key={index}
                        src={el}
                        className={`${css.image} ${index === currentIndex ? css.active : ""}`}
                        alt=""/>))}
            </div>

            
        </div>
    );
}

export default BackgroundSlider;
