//save result of user search in localStorage
export const saveResultInHistory = ({ userId, resultType, resultValue }) => {
  const userHistory = JSON.parse(localStorage.getItem("userHistory"));

  const history = {
    userId,
    album:
      Object.entries([{ ...resultValue.album }][0]).length > 1
        ? [{ ...resultValue.album }]
        : userHistory.album,
    artist:
      Object.entries([{ ...resultValue.artist }][0]).length > 1
        ? [{ ...resultValue.artist }]
        : userHistory.artist
  };

  //update userHistory
  localStorage.setItem("userHistory", JSON.stringify({ ...history }));
};

//get storeg result from localStorage
export const getResultFromHistory = userId => {};
