import UrlResolver from '@/config/urls';
import axios from 'axios';


class Speciality {
    public static all(callback: (specialites: Array<never>) => void) {
        axios.get(UrlResolver.SPECIALITIES_ALL_API).then((response) => { callback(response.data); });
    }
}

export default Speciality;