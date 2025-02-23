import css from "./Aplication.module.css";
import { CgPin } from "react-icons/cg";
import { IoMdTime } from "react-icons/io";
import { MdOutlinePhone } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import InputMask from 'react-input-mask'

const Aplication = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone_number: "",
        message: ""
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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
        try {
            const response = await axios.post("/api/consultation/", formData, {
                headers: {
                    "X-CSRFToken": getCookie("csrftoken")
                },
            });
            console.log("Ответ сервера:", response.data);
            alert('Сообщение отправлено!')
            setFormData({ name: "", phone_number: "", message: "" });
        } catch (error) {
            alert('Ошибка отправки!')
            console.log(error.response?.data);
        }
    };

    return (
        <div className={css.block_contain}>
            <form className={css.blockForm} onSubmit={handleSubmit}>
                <input
                    className={css.int}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Имя"
                    required />
                <InputMask className={css.int}
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
                <div className={css.textarea_container} data-placeholder="Введите ваше сообщение...">
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder=" "
                        required />
                    <label>Что вас интересует?</label>
                </div>
                <button type="submit">Отправить</button>
            </form>

            <div className={css.blockright}>
                <a href="tel:+996 703 003 995" className={css.block}>
                    <span className={css.icons}><MdOutlinePhone /></span>
                    <div>
                        <span>Телефон</span>
                        <p>0703 003 995</p>
                    </div>
                </a>
                <a href="https://2gis.kg/bishkek/geo/70000001068487796" className={css.block}>
                    <span className={css.icons}><CgPin /></span>
                    <div>
                        <span>Адрес</span>
                        <p>г. Бишкек, ул. Манас 60/1</p>
                    </div>
                </a>
                <div className={css.block}>
                    <span className={css.icons}><IoMdTime /></span>
                    <div>
                        <span>Режим работы</span>
                        <p>с 10:00 до 19:00, Пн-Сб</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aplication;
