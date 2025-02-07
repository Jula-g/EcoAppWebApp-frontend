import axios, { AxiosInstance } from 'axios';

export class EcoWebClient {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000/api', // Your NestJS backend
    });

    // Initialize token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      this.api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    // Add a request interceptor to ensure Authorization header is always set
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  // Register a new user
  async register(
    username: string,
    password: string,
    email: string,
    name: string,
    lastName: string,
    phoneNumber: string
  ) {
    return this.api.post('/auth/register', {
      username,
      password,
      email,
      name,
      lastName,
      phoneNumber,
    });
  }

  // Login an existing user
  async login(username: string, password: string) {
    const response = await this.api.post('/auth/login', { username, password });

    console.log('response:', response);

    const token = response.data.data.token; // Extract token from response
    const userId = response.data.data.userId;

    const userData = await this.getUser(userId); // Get user info using userId
    console.log('user:', userData);

    localStorage.setItem('authUser', userData); // Save user data to local storage
    localStorage.setItem('authToken', token); // Save token to local storage
    this.api.defaults.headers.Authorization = `Bearer ${token}`; // Update Axios headers

    return { userData, token }; // Return user and token
  }

  // Logout the current user
  logout() {
    localStorage.removeItem('authToken'); // Remove token
    localStorage.removeItem('authUser'); // Remove user data
    delete this.api.defaults.headers.Authorization; // Clear Axios headers
  }

  async getUser(userId: string) {
    try {
      const response = await this.api.get(`/users/${userId}`); // Call backend API
      return response.data; // Return user data
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      // Make a request to verify token on the backend
      await this.api.get('/auth/verify-token', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true; // Token is valid
    } catch (error) {
      console.error('Token verification failed:', error);
      return false; // Token is invalid
    }
  }
}
