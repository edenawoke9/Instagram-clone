async function Users() {
  try {
    const response = await fetch("api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const users = await response.json();
      console.log(users)
      
      return users;
    } else {
      console.log("Error: response not ok");
      return [];
    }
  } catch (error) {
    console.log("There is an error:", error.message);
    return [];
  }
}


export default Users;
