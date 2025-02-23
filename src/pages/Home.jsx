import About from "../component/about/About"
import FonForm from "../component/fon_form/FonForm"
import Project from "../component/projects/Project"
import Reviews from "../component/reviews/Reviews"
import Services from "../component/services/Services"
import BackgroundSlider from "../component/slider/Slider"
import Steps from "../component/steps/Steps"

const Home = () => {
    return(
        <>
            <BackgroundSlider/>  
            <Services/>
            <About/>
            <Steps/>
            <Project/>
            <Reviews/>
            <FonForm/>
            
        </>
    )
}

export default Home