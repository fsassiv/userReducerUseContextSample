//save result of user search in localStorage
//provite JSON.parse(localStorage.getItem("userHistory")) as default value
export const createUserHistory = (
  userHistory = JSON.parse(localStorage.getItem("userHistory"))
) => {
  let newHistory = {};
  if (!userHistory) {
    newHistory = [
      {
        userId: "k5psa2hk",
        history: {
          artist: [],
          album: []
        }
      }
    ];
    localStorage.setItem("userHistory", JSON.stringify([...newHistory]));
  }
};

export const saveResultInHistory = ({
  userId,
  resultType,
  resultValue,
  searchValue
}) => {
  let userHistory = JSON.parse(localStorage.getItem("userHistory"));
  let newUserHistory = "";

  const currentUserHistory = userHistory.filter(
    history => history.userId === userId
  );

  let { userId: id, history: uHistory } = currentUserHistory[0];

  if (resultType === "artist") {
    // save the record on localStorage
    userHistory.map(userH => {
      if (userH.userId === id) {
        userH.history = {
          ...userH.history,
          artist: [...userH.history.artist, searchValue]
        };
      }
    });
  }

  localStorage.setItem("userHistory", JSON.stringify([...userHistory]));
};

//get storage result from localStorage
export const getResultFromHistory = userId => {
  const userHistory = JSON.parse(localStorage.getItem("userHistory"));
  const currentUserHistory = userHistory.filter(
    history => history.userId === userId
  );
  return currentUserHistory || [];
};
