import css from "./RevievsList.module.css"

const RevievsList = () => {
    return(
        <div className={css.parent}>
            <div className="container">
                <div className={css.content}>
                    <h1>Отзывы</h1>
                </div>
            </div>
        </div>
    )
}

export default RevievsList;