import { Axios } from "axios";
import { AppState } from "../AppState";
import { api } from "./AxiosService.js"


class ImagesService {


  async getImage() {
    const res = await api.get()
    AppState.image = res.data
    console.log(AppState.image);
  }

  async changeDate(date) {
    console.log(date);
    const res = await api.get(`?date=${date}`)
    console.log(res.data);
    AppState.image = res.data
  }
}

export const imagesService = new ImagesService()