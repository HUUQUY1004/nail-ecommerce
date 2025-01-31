import axios from 'axios';
import { AddProduct, AddToCart, UserLogin, UserRegister } from "./types/type";
import { log } from 'node:console';
const BASE_URL ="http://localhost:5000"
export const register = async (user: UserRegister) => {
    try {
      const { data } = await axios.post(
        '${BASE_URL}/auth/register',
        user, // Pass the user object directly as the payload
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return data; // Return the response data
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      throw error; // Re-throw the error for upstream handling
    }
  };

export const login = async (user:UserLogin) =>{
    const {data} = await axios.post(`${BASE_URL}/auth/login`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return data;
}

// product
export const addProduct = async (product: AddProduct)=>{
  const token = localStorage.getItem('access_token'); // Assuming token is stored in local storage
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data', // Change to multipart/form-data
      Authorization: `Bearer ${token}`,
    },
  };

  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('price', product.price.toString());
  formData.append('discount', product.discount.toString());
  formData.append('description', product.description);
  formData.append('quantity', product.quantity.toString());
  
  // Append image files
  if (product.imageMain) {
    formData.append('files', product.imageMain); // Assuming imageMain is a file object
  }
  if (product.imageOther && Array.isArray(product.imageOther)) {
    product.imageOther.forEach(image => {
      formData.append('files', image); // Assuming imageOther is an array of file objects
    });
  }

  try {
    const { data } = await axios.post(
      `${BASE_URL}/admin/add-product`,
      formData,
      config
    );
    return data;
  } catch (error) {
    console.error('Error during adding product:', error.response?.data || error.message);
    throw error; // Re-throw the error for upstream handling
  }
}

// get product
export const getProductById= async (id: any)=>{
  try {
    const { data } = await axios.get(`${BASE_URL}/product/${id}`,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return data;
  } catch (error) {
    console.error('Error during getting product:', error.response?.data || error.message);
    throw error;
  }
}

// Add to cart
export const  addToCart= async (addToCart:AddToCart)=>{
  const token = localStorage.getItem('access_token');
  const refresh_token = localStorage.getItem('refresh_token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      RefreshToken: refresh_token
    },
  };
  const {data} = await axios.post(
    `${BASE_URL}/cart/addToCart`,
    addToCart,
    config 
  ); 
  console.log(token);
  
  return data;
}
// Get cart data
export const  getCart = async () => {
  const token = localStorage.getItem('access_token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const {data} = await axios.get(
    `${BASE_URL}/cart/getCart`,
    config
  );
  return data;
}