import UrlResolver from '@/config/urls';
import axios from 'axios';


class Subject {
    public static all(callback: (subjects: Array<never>) => void) {
        axios.get(UrlResolver.SUBJECTS_ALL_API).then((response) => { callback(response.data); });
    }
}

export default Subject;