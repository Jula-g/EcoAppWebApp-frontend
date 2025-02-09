import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { CreateProductDto, ShopProductDto } from './Dtos/Products';

export interface ProductDto {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  condition: string;
  style?: string;
  description: string;
  userId: string;
  status: string;
  price: string; // Notice: it's a string in your backend
  adress: {
    street: string;
    city: string;
    zip: string;
  };
  images: string[]; // Base64 images
  createdAt: { _seconds: number; _nanoseconds: number };
  updatedAt: { _seconds: number; _nanoseconds: number };
  transactionType: string;
}

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  status: number;
};

const tokenId = 'token';

export class EcoWebClient {
  private client: AxiosInstance;

  constructor() {
    console.log('EcoWebClient constructor');

    this.client = axios.create({
      baseURL: 'http://localhost:3000/api',
    });

    const token = localStorage.getItem('authToken');
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem(tokenId);
          this.client.defaults.headers.common['Authorization'] = '';
        }
        return Promise.reject(error);
      }
    );
  }

  // Login an existing user
  async login(username: string, password: string) {
    const response = await this.client.post('/auth/login', { username, password });

    console.log('response:', response);

    const token = response.data.data.token; // Extract token from response
    const userId = response.data.data.userId;

    const userData = await this.getUser(userId); // Get user info using userId
    console.log('user:', userData);

    localStorage.clear();
    localStorage.setItem('authUser', JSON.stringify(userData)); // Save user data to local storage
    localStorage.setItem('authToken', token); // Save token to local storage
    this.client.defaults.headers.Authorization = `Bearer ${token}`; // Update Axios headers

    return { userData, token }; // Return user and token
  }

  public async register(payload: {
    username: string;
    password: string;
    email: string;
    name: string;
    lastName: string;
    phoneNumber: string;
  }): Promise<ClientResponse<unknown | null>> {
    try {
      const response: AxiosResponse<unknown> = await this.client.post(
        '/auth/register',
        payload
      );
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async getProducts(): Promise<ClientResponse<any[] | null>> {
    try {
      const response: AxiosResponse<any[]> = await this.client.get('/products');
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }


  public logout(): void {
    localStorage.removeItem('authToken'); // Remove token
    localStorage.removeItem('authUser');
    delete this.client.defaults.headers.common['Authorization'];
  }

  public async getAllProducts(): Promise<ClientResponse<ProductDto[] | null>> {
    try {
      const response: AxiosResponse<ProductDto[]> = await this.client.get(
        '/products'
      );

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async createProduct(
    userId: string,
    data: CreateProductDto,
    images: File[]
  ): Promise<ClientResponse<any>> {
    try {
      const formData = new FormData();
      formData.append('name', data.name ?? '');
      formData.append('description', data.description ?? '');
      formData.append('price', data.price?.toString() ?? '');
      formData.append('condition', data.condition ?? '');
      formData.append('category', data.category ?? '');
      formData.append('subcategory', data.subcategory ?? '');
      formData.append('status', data.status ?? '');
      formData.append('transactionType', data.transactionType ?? '');

      if (data.style) {
        formData.append('style', data.style);
      }

      if (data.adress) {
        formData.append('adress', JSON.stringify(data.adress));
      }

      images.forEach((image) => {
        formData.append('images', image);
      });

      const response = await this.client.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }

  async getUser(userId: string) {
    try {
      const response = await this.client.get(`/users/${userId}`); // Call backend API
      return response.data; // Return user data
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  public async deleteProduct(userId: string, productId: string): Promise<ClientResponse<null>> {
    try {
      const response: AxiosResponse = await this.client.delete(`/products/${userId}/${productId}`);
      return {
        success: true,
        data: null,
        status: response.status,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async updateProduct(
    productId: string,
    data: CreateProductDto,
    images?: File[]
  ): Promise<ClientResponse<any>> {
    try {
      const formData = new FormData();
      formData.append('name', data.name ?? '');
      formData.append('description', data.description ?? '');
      formData.append('price', data.price?.toString() ?? '');
      formData.append('condition', data.condition ?? '');
      formData.append('category', data.category ?? '');
      formData.append('subcategory', data.subcategory ?? '');
      formData.append('status', data.status ?? '');
      formData.append('transactionType', data.transactionType ?? '');

      if (data.style) {
        formData.append('style', data.style);
      }

      if (data.adress) {
        formData.append('adress', JSON.stringify(data.adress));
      }

      // Append images if provided
      if (images) {
        images.forEach((image) => {
          formData.append('images', image);
        });
      }

      const response = await this.client.put(`/products/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async getProductsByUserId(userId: string): Promise<ClientResponse<ProductDto[] | null>> {
    try {
      const response: AxiosResponse<ProductDto[]> = await this.client.get(`/products/user/${userId}`);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async likeProduct(productId: string, userId: string): Promise<ClientResponse<any>> {
    try {
      const response = await this.client.post(`/matches/like/${productId}`, { userId });
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }

  public async getUserByFirebaseUid(firebaseUid: string): Promise<ClientResponse<any | null>> {
    try {
      const response: AxiosResponse = await this.client.get(`/users/${firebaseUid}`);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }


  public async getProductById(productId: string): Promise<ClientResponse<ProductDto | null>> {
    try {
      const response: AxiosResponse<ProductDto> = await this.client.get(`/products/${productId}`);
      return {
        success: true,
        data: response.data,
        status: response.status,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return {
        success: false,
        data: null,
        status: axiosError.response?.status || 0,
      };
    }
  }


  async verifyToken(token: string): Promise<boolean> {
    try {
      // Make a request to verify token on the backend
      await this.client.get('/auth/verify-token', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true; // Token is valid
    } catch (error) {
      console.error('Token verification failed:', error);
      return false; // Token is invalid
    }
  }
}
