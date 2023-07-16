import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
export async function getMoviebyTitle(movieTitle: string) {
    try {
        const response = await axios.get(publicRuntimeConfig.baseApiURL, {
            params: { s: movieTitle, apikey: publicRuntimeConfig.apiKey },
        });
        return response.data
    } catch (error) {
        console.error(error);
    }
}
export async function getMovieByID(movieID: string) {
    try {
        const response = await axios.get(publicRuntimeConfig.baseApiURL, {
            params: { i: movieID, apikey: publicRuntimeConfig.apiKey },
        });
        return response.data
    } catch (error) {
        console.error(error);
    }
}

