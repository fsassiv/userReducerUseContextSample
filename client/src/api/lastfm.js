import axios from "axios";

export const apiSettings = {
  baseUrl: "https://ws.audioscrobbler.com/2.0/",
  key: "23d94315217c996868a5f3feb48f00c3"
};

// if (process.env.NODE_ENV === "production") {
//   //CHANGE SETTINGS ON PRODUCTION
//   apiSettings.baseUrl = "/api";
//   apiSettings.key = process.env.API_KEY;
// }

export default async ({ target, searchValue, page }) => {
  try {
    // request for production
    // if (process.env.NODE_ENV === "production") {
    //   const response = await axios.get(
    //     // `/api/?target=${target}&searchvalue=${searchValue}&page=${page}`
    //     // `${apiSettings.baseUrl}?method=${target}.search&${target}=${searchValue}&api_key=${apiSettings.key}&page=${page}&format=json`,
    //     `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=slipknot&api_key=23d94315217c996868a5f3feb48f00c3&page=${page}&format=json`,

    //     {
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json"
    //       }
    //     }
    //   );
    //   const { data } = response;
    //   return { data, error: { error: false } };
    // }

    //default request - development
    const response = await axios.get(
      `${apiSettings.baseUrl}?method=${target}.search&${target}=${searchValue}&api_key=${apiSettings.key}&page=${page}&format=json`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    const { data } = response;
    return { data, error: { error: false } };
  } catch (error) {
    console.log(error);
    return { error: true, errorMessage: "Desculpe, algo deu errado" };
  }
};
