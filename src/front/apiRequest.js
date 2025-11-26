const apiRequest = async (host, endpoint, metodo, body = null) => {
  const uri = `${host}${endpoint}`;
  const options = {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
    },
    body: body && JSON.stringify(body),
  };
  const response = await fetch(uri, options);
  if (response.status === 404) {
    props.setLoged(false);
    props.setUser("");
    alert("Un hijo de su madre te borro la cuenta :(");
    return;
  }
  if (!response.ok) {
    console.log("dio un error", response.status, response.statusText);
    return;
  }
  if (metodo === "GET" && response.ok) return await response.json();
  getTasks();
};

export default apiRequest;