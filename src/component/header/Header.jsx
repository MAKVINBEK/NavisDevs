import { Link } from "react-router-dom";
import css from "./Header.module.css";
import logo from "../../assets/favicon.png";
import { useState,useEffect, useRef  } from "react";
import flagRU from "../../assets/RU.png";
import { RiArrowDownSLine } from "react-icons/ri";
import { Squash as Hamburger } from 'hamburger-react'
const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState("РУС");
    const [flag, setFlag] = useState(flagRU);
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef(null);
    const menuRef = useRef(null);

    const languages = [
        { code: "РУС", flag: flagRU },
    ];

    const toggleMenu = () => setOpen(!open);
    const changeLanguage = (lang) => {
        setLanguage(lang.code);
        setFlag(lang.flag);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };
    
    useEffect(() => {
        const handleScroll = () => {
            setIsOpen(false);
            setOpen(false);
        };
    
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("scroll", handleScroll);
    
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [open]);
    

    return (
        <div className={css.content}>
            <div className="container">
                <div className={css.parent}>
                <Link to="/"><img className={css.devs} src={logo} alt="" /></Link>
                <div className={`${css.menu} ${open ? css.active : ""}`}>
                    <div className={css.burger}>
                        <Link onClick={toggleMenu} to="/"><img src={logo} alt="" /></Link>
                    <div onClick={toggleMenu}>
                    <Hamburger  toggled={open} toggle={open} className={css.Hamburger } size={30}/>
                    </div>
                    </div>
                    <Link onClick={toggleMenu} className={css.menu_item} to="/projects">Проекты</Link>
                    <span className={css.divider}></span>
                    <Link onClick={toggleMenu} className={css.menu_item} to="/Vacancies">Вакансии</Link>
                    <span className={css.divider}></span>
                    <Link onClick={toggleMenu} className={css.menu_item} to="/about">О нас</Link>
                    <span className={css.divider}></span>
                    <Link onClick={toggleMenu} className={css.menu_item} to="/reviews">Отзывы</Link>
                    <span  className={css.divider}></span>
                    <Link onClick={toggleMenu} className={css.menu_item} to="/contacts">Контакты</Link>
                </div>
                 <div className={css.langue}>
                    <div className={css.align} >
                    <button className={css.dropdownButton} onClick={toggleDropdown}>
                        <img src={flag} alt="current flag" className={css.flag} />
                        <span className={css.ru}>{language}</span>
                        <div className={`${css.reacticon} ${isOpen ? css.rotate : ""}`}><RiArrowDownSLine /></div>
                    </button>

                    {isOpen && (
                        <ul ref={dropdownRef} className={css.dropdownMenu}>
                            {languages.map((lang) => (
                                <li
                                    key={lang.code}
                                    onClick={() => changeLanguage(lang)}
                                    className={css.dropdownItem}>
                                    <img src={lang.flag} alt={`${lang.code} flag`} className={css.flag} />
                                    <span className={css.ru}>{lang.code}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <a href="tel:+996 703 003 995" className={css.gap}>
                    <p>Нужна консультация?</p>
                    <span>0703 003 995</span>
                </a>
                <Link to="/contacts" className={css.napisat}> Написать</Link>
                 </div>
                 <div className={css.burgerMenu} onClick={toggleMenu}>
                    <Hamburger toggled={open} toggle={setOpen} size={24}/>
                    </div>
                 </div>
                
            </div>
        </div>
    );
};

export default Header;
