const API_URL = 'http://localhost:3001';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error en login:', error);
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
  login,
  checkApiHealth
};
