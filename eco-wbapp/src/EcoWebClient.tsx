import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { CreateProductDto, ShopProductDto } from './Dtos/Products';

export interface ProductDto {
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

    const token = localStorage.getItem(tokenId);

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

  public async login(data: {
    username: string;
    password: string;
  }): Promise<ClientResponse<{ token: string } | null>> {
    try {
      const response: AxiosResponse<{ token: string }> = await this.client.post(
        '/auth/login',
        data
      );

      const token = response.data.token;

      if (token) {
        localStorage.setItem(tokenId, response.data.token ?? '');
        this.client.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${token}`;
      }

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
    localStorage.removeItem(tokenId);
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
}
