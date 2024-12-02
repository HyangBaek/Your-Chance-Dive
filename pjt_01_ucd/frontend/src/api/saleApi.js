const API_BASE_URL = "http://localhost:3000/api";

export const fetchSales = async () => {
  const response = await fetch(`${API_BASE_URL}/sales`);
  if (!response.ok) throw new Error("Failed to fetch sales");
  return response.json();
};

export const fetchSaleById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/sales/${id}`);
  if (!response.ok) throw new Error("Failed to fetch sale");
  return response.json();
};

export const updateSalse = async (saleData) => {
  const response = await fetch(`${API_BASE_URL}/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(saleData),
  });
  if (!response.ok) throw new Error("Failed to update sale");
  return response.json();
};
