import uniqid from "uniqid";

export const createNewUser = credentials => {
  const { name, email, password } = credentials;
  const userDB = JSON.parse(localStorage.getItem("users"));

  const newUser = {
    id: uniqid(),
    name: name.replace(/^\w/, c => c.toUpperCase()),
    email,
    password
  };

  //save newUser in store
  const newUserDB = JSON.stringify([...userDB, newUser]);
  localStorage.setItem("users", newUserDB);
  setCurrentSession({
    id: newUser.id,
    name: newUser.name,
    email: newUser.email
  });
  return { id: newUser.id, name: newUser.name, email: newUser.email };
};

export const logUser = credentials => {
  const { email, password } = credentials;
  const userDB = JSON.parse(localStorage.getItem("users"));

  const registeredUser = userDB.filter(user => {
    if (user.email === email && user.password === password) {
      return user;
    }
  });

  setCurrentSession({ ...registeredUser[0] });
  return registeredUser;
};

export const setCurrentSession = ({ id, name, email }) => {
  const session = JSON.stringify({ id, name, email });

  //set to the localStorage
  sessionStorage.setItem("currentSession", session);
};

export const getCurrentSession = userId => {
  return JSON.parse(sessionStorage.getItem("currentSession"));
};

export const logOut = () => {
  sessionStorage.removeItem("currentSession");
};
