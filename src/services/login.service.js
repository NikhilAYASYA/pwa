async function fetchlogin(userInfo) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    return response.json();
  } catch (error) {
    return error.message;
  }
}

export { fetchlogin };
