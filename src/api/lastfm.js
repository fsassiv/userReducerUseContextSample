import axios from "axios";

const apiSettings = {
  baseUrl: "https://ws.audioscrobbler.com/2.0/",
  key: "23d94315217c996868a5f3feb48f00c3"
};

export default async ({ target, searchValue, page }) => {
  try {
    const response = await axios.get(
      `${apiSettings.baseUrl}?method=${target}.search&${target}=${searchValue}&api_key=${apiSettings.key}&page=${page}&format=json`,
      {
        headers: {
          Accept: "application/json"
        }
      }
    );
    const { data } = response;
    return data;
  } catch (error) {
    return { statusCode: "404", error: "Result not found" };
  }
};
