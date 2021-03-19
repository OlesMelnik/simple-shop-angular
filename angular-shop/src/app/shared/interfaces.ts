export interface User{
    email: string;
    password: string;
    returnSecureToken?: boolean;
}

export interface UserAddInfo{
    email: string;
    name: string;
    age: string;
    phone: string;
    photoUrl: string;
}

export interface FBAuthResponse {
    idToken: string;
    expiresIn: string;
}

export interface Post {
    id?: string;
    title: string;
    text: string;
    author: string;
    date: Date;
}

export interface Product {
    id?: string;
    title: string;
    text: string;
    price: string;
    seller: string;
    imageSrc: string;
    date: Date;
}

export interface CartProduct extends Product{
    amount?: number;
}
export interface Customer{
    id?: string;
    email: string;
    password: string;
    name: string;
    age: string;
    cart: {};
    date: Date;
}

export interface FbCreateresponse {
    name: string;
} 
   