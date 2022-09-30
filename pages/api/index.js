import axios from 'axios';

class API {
    constructor() {
        this.url = process.env.NEXT_PUBLIC_API_URL;
        this.org = process.env.NEXT_PUBLIC_ORG;
        this.prefix = process.env.NEXT_PUBLIC_NAME;
    }

    // fetch repo list
    async fetchList() {
        return axios.get(`https://randomuser.me/api/?results=20.`);
    }


    // fetch search results
    async search({ query, per_page }) {
        return axios.get(`${this.url}/search/repositories?q=${query}+org:${this.org}&per_page=${per_page}`);
    }
}

let Api = new API();
export default Api;

