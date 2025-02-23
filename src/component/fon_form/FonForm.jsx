import css from "./FonForm.module.css"
import Aplication from "../aplication/Aplication";

const FonForm = () => {
    return(
        <div className="container">
            <div className={css.parent}>
                <p className={css.min}>Заявка</p>
                <p className={css.big}>Получить бесплатную консультацию</p>
                <Aplication/>
            </div>
        </div>
    )
}

export default FonForm