import AboutGallery from "../../component/aboutabot/Gallery";
import FonForm from "../../component/fon_form/FonForm";
import GallaryUs from "../../component/gallaryUs/GalleryUs";
import Steps from "../../component/steps/Steps";
import css from "./AboutUs.module.css"

const AboutUs = () => {
    
    return(
        <div className={css.parent}>
            <div className={css.elip1+" "+css.elip}></div>
            <div className={css.elip2+" "+css.elip}></div>
            <div className={css.elip3+" "+css.elip}></div>
        <div className="container">
            <div className={css.red}>
                <p className={css.min}>Добро пожаловать в IT компанию <br /> <span>NavisDevs</span></p>
            </div>
            <div className={css.clients}> 
                <div>
                    <span>98+</span>
                    <p>Довольных клиентов</p>
                </div>   
                <div>
                    <span>100+</span>
                    <p>Завершенных проектов</p>
                </div>
                <div>
                    <span>25+</span>
                    <p>Сотрудников</p>
                </div>
            </div>
            </div>
            <AboutGallery/>
            <GallaryUs/>
            <Steps/>
            <FonForm/>
        </div>
        )
}

export default AboutUs;