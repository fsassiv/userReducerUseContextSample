//save result of user search in localStorage
//provite JSON.parse(localStorage.getItem("userHistory")) as default value
export const createUserHistory = currentUserId => {
  let userHistory = JSON.parse(localStorage.getItem("userHistory"));

  let newHistory = {
    userId: currentUserId,
    history: {
      artist: [],
      album: []
    }
  };
  //if there is no userHistory, create it
  //and set the first record
  if (!userHistory) {
    localStorage.setItem("userHistory", JSON.stringify([{ ...newHistory }]));
  } else {
    //check for userHistory of the currentUser
    const registeredUserHistory = userHistory.filter(
      history => history.userId === currentUserId
    );
    //if is a new user, create its history
    if (registeredUserHistory.length === 0) {
      localStorage.setItem(
        "userHistory",
        JSON.stringify([...userHistory, newHistory])
      );
    }
  }
};

export const saveResultInHistory = ({ userId, resultType, searchValue }) => {
  let userHistory = JSON.parse(localStorage.getItem("userHistory"));

  const currentUserHistory = userHistory.filter(
    history => history.userId === userId
  );

  saveRestult({
    currentUserHistory,
    userId,
    userHistory,
    searchValue,
    resultType
  });
};

const saveRestult = ({
  currentUserHistory,
  userId,
  userHistory,
  searchValue,
  resultType
}) => {
  let newUserHistory = {};
  //check if the user doesnt have a history
  //if not, create it
  if (currentUserHistory.length === 0) {
    newUserHistory = {
      userId,
      history: {
        [resultType]: [searchValue]
      }
    };
    userHistory.push({ ...newUserHistory });

    //save to the localStorage
    localStorage.setItem("userHistory", JSON.stringify(userHistory));
  } else {
    //if the user already have a history
    //update it
    let { userId: id } = currentUserHistory[0];
    // save the record on localStorage
    userHistory.map(userH => {
      if (userH.userId === id) {
        userH.history = {
          ...userH.history,
          //[...new Set - to remove duplicated values]
          [resultType]: [
            ...new Set([...userH.history[resultType], searchValue])
          ]
        };
      }
    });
    localStorage.setItem("userHistory", JSON.stringify([...userHistory]));
  }
};

//get storage result from localStorage
export const getResultFromHistory = userId => {
  const userHistory = JSON.parse(localStorage.getItem("userHistory"));
  const currentUserHistory = userHistory.filter(
    history => history.userId === userId
  );
  //return the current users history
  return typeof currentUserHistory[0] !== "undefined"
    ? currentUserHistory[0].history
    : [];
};
