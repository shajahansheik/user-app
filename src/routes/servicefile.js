import { useLocation } from 'react-router-dom'
import serviceResponse from "./response.json";

function ServiceFile() {
    const location = useLocation()
    const { language } = location.state;
    const { service } = location.state;

    return (
        <div className=''>
            <div>{language}</div>
            <div>{service}</div>
            <div className="sdHeading">{serviceResponse[service].title[language]}</div>
        </div>
    );
}

export default ServiceFile;