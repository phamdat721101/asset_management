import axios from "axios";

const SERVICE_API_URL = "http://localhost:3002/api";

class ChapterDataService {
  getAllChapters() {
    return axios.get(`${SERVICE_API_URL}/chapters/get_all`);
  }

  addChapter(chapter) {
    return axios.post(`${SERVICE_API_URL}/`, chapter);
  }
}

export default new ChapterDataService();
