import UrlResolver from '@/config/urls';
import axios from 'axios';


class Civility {
    public static all(callback: (civilities: Array<never>) => void) {
        axios.get(UrlResolver.CIVILITIES_ALL_API).then((response) => { callback(response.data); });
    }
}

export default Civility;