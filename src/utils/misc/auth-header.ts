export default () => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (user && user.accessToken) {
    return {
      "X-Access-Token": user.accessToken,
    };
  }
  return {};
};