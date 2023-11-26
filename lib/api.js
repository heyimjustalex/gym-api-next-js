const BASIC_URL = "https://afefitness2023.azurewebsites.net/api";

export async function addTrainer(data, token) {
  console.log("REQYEST DATA", data);
  console.log("REQYEST DATA TOKEN", token);
  try {
    const response = await fetch(BASIC_URL + "/Users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  } catch (error) {
    console.log("Error Adding new Trainer:", error);
    throw error;
  }
}
