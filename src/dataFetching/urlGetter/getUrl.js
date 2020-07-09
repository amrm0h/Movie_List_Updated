import { api } from "../../shared/constants/api/apiUrlAndKey";

const { baseUrl, key } = api;
const lang = "&language=en-US&page=";
const categories = {
   "top-rated": "top_rated?api_key=",
   "now-playing": "now_playing?api_key=",
   "upcoming": "upcoming?api_key="
};

const getUrl = (cat, page = 1) => {
   const url = `${baseUrl}movie/${categories[cat]}${key}${lang}${page}`;
   return url;
}

export default getUrl;
