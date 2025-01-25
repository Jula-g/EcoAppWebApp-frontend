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

    const token = response.data.data.token; // Extract token from response
    localStorage.setItem('authToken', token); // Save token to localStorage
    this.api.defaults.headers.Authorization = `Bearer ${token}`; // Update Axios headers

    const user = {
      id: response.data.data.id,
      username: response.data.data.username,
      email: response.data.data.email,
    };
    localStorage.setItem('authUser', JSON.stringify(user)); // Save user data

    return { user, token }; // Return user and token
  }

  // Logout the current user
  logout() {
    localStorage.removeItem('authToken'); // Remove token
    localStorage.removeItem('authUser'); // Remove user data
    delete this.api.defaults.headers.Authorization; // Clear Axios headers
  }
}
