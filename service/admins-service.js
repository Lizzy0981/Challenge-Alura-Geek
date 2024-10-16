const API_URL = 'http://localhost:3001';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const adminList = async () => {
  try {
    const response = await fetch(`${API_URL}/admins`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching admin list:', error);
    throw error;
  }
};

const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/productos`);
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

export const adminService = {
  adminList,
  checkApiHealth
};