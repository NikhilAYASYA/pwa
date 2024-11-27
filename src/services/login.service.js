async function fetchlogin(userInfo) {
  try {
    const response = await fetch("http://localhost:8000/api/login", {
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
