const API_BASE_URL = "http://localhost:3000/api";

export const fetchItems = async () => {
  const response = await fetch(`${API_BASE_URL}/items`);
  if (!response.ok) throw new Error("Failed to fetch items");
  return response.json();
};

export const fetchItemById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/items/${id}`);
  if (!response.ok) throw new Error("Failed to fetch item");
  return response.json();
};

export const addItem = async (itemData) => {
  const response = await fetch(`${API_BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemData),
  });
  if (!response.ok) throw new Error("Failed to add item");
  return response.json();
};
