import { TrackType } from "@/src/sharedTypes/sharedTypes";
import { BASE_URL } from "../services/constants"
import axios from "axios";

export const getAllTracks = ():Promise<TrackType[]> => {
    return axios(BASE_URL + '/catalog/track/all/').then((res) =>{return res.data.data});
}