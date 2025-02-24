import css from "./FonForm.module.css"
import Aplication from "../aplication/Aplication";

const FonForm = () => {
    return(
        <div className="container">
            <div className={css.parent}>
                <p className={css.min}>Заявка</p>
                <h1 className={css.big}>Получить бесплатную консультацию</h1>
                <Aplication/>
            </div>
        </div>
    )
}

export default FonForm