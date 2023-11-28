const login = (user) => {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = storedUsers.find(
    (storedUser) =>
      storedUser.email === user.email && storedUser.password === user.password
  );

  if (foundUser) {
    return foundUser;
  } else {
    return false;
  }
};

const signup = (user) => {
  let users = localStorage.getItem("users");

  if (!users) {
    users = [];
  } else {
    users = JSON.parse(users);
  }

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return true;
};

const getTasks = (email) => {
  const userTasksKey = `${email}-tasks`;
  const tasksString = localStorage.getItem(userTasksKey);

  if (tasksString) {
    try {
      const tasks = JSON.parse(tasksString);
      return tasks;
    } catch (error) {
      console.error(`Parsing tasks for ${email} failed:`, error);
      return null;
    }
  } else {
    console.error(`Tasks for ${email} not found`);
    return null;
  }
};

const LocalStore = { login, signup, getTasks };

export default LocalStore;
