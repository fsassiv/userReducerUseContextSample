import uniqid from "uniqid";

export const createNewUser = credentials => {
  const { name, email, password } = credentials;
  const userDB = JSON.parse(localStorage.getItem("users"));

  const newUser = {
    id: uniqid(),
    name,
    email,
    password
  };

  //save newUser in store
  const newUserDB = JSON.stringify([...userDB, newUser]);
  localStorage.setItem("users", newUserDB);

  return { id: newUser.id, name: newUser.name, email: newUser.email };
};

export const getUser = credentials => {
  const { email, password } = credentials;
  const userDB = JSON.parse(localStorage.getItem("users"));

  const registeredUser = userDB.filter(user => {
    if (user.email === email && user.password === password) {
      return user;
    }
  });

  return registeredUser;
};
