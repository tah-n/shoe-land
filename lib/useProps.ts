import { create } from 'zustand';
import Parse from 'parse';

type Products = {
    id: string | undefined;
    name: string;
    price: number;
    category: string;
    variations:{
        color: string;
        sizes: {
            size: number;
            inStock: boolean;
        }[];
        pic1: string;
        pic2?: string;
    }[]
    quantity: number;
}

type PropTypes = {
  openSideMenu: boolean;
  setOpenSideMenu: () => void;
  isMobile: boolean;
  openSignIn: boolean,
  setIsMobile: (value: boolean) => void;
  setOpenSignInForm: (value: boolean) => void;
  openSignUp: boolean,
  setOpenSignUpForm: (value: boolean) => void;
  showWarningPwd: boolean;
  setShowWarningPwd: (value: boolean) => void;
  enteredCode: string;
  setEnteredCode: (value: string) => void;
  currentUser: Parse.User | null;
  setCurrentUser: (user: Parse.User | null) => void;
  fetchCurrentUser: () => void;
  openCart: boolean;
  setOpenCart: (value: boolean) => void; 
  selectedProduct: Products | null;
  setSelectedProduct: (id: Products) => void;

}

const useProps = create<PropTypes>((set) => ({
  openSideMenu: false,
  setOpenSideMenu: () => set((state) => ({ openSideMenu: !state.openSideMenu })),
  isMobile: false,
  setIsMobile: (value) => set({ isMobile: value }),
  openSignIn: false,
  setOpenSignInForm: (value) => set({ openSignIn: value }),
  openSignUp: false,
  setOpenSignUpForm: (value) => set({ openSignUp: value }),
  showWarningPwd: false,
  setShowWarningPwd: (value) => set({ showWarningPwd: value }),
  enteredCode: '',
  setEnteredCode: (value) => set({ enteredCode: value }),
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  fetchCurrentUser: () => {
    const user = Parse.User.current();
    console.log(user);
    set({ currentUser: user });
  },
  openCart: false,
  setOpenCart: (value) => set({ openCart: value }),
  selectedProduct: null,
  setSelectedProduct: (id) => set({ selectedProduct: id })

}))

export default useProps;

interface CartItems {
  id: string ;
    name: string,
    price: number,
    quantity: number,
    color: string,
    size: number,
    image: string | undefined,
}

interface CartState {
  items: CartItems[];
  setItems: (items: CartItems[]) => void;
  addToCart: (item: CartItems) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: number;
  setSelectedSize: (value: number) => void;
}

const getInitialCart = () : CartItems[] => {
  if(typeof window !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    if(storedCart) {
      return JSON.parse(storedCart);
    }
  }
  return [];
}



export const useCartStore = create<CartState>((set) => ({
  items: [],
  setItems: (items) => set({ items: items }),
 addToCart: (item) =>
  set((state) => {
    const exists = state.items.find((i) => i.id === item.id);
    if (exists) {
      return {
        items: state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        ),
      };
    } else {
      return {
        items: [...state.items, item],
        
      };
    }
  }),
  removeFromCart: (id) => set((state) => ({
    items: state.items.filter((i) => i.id !== id)
  })) ,

  clearCart: () => set({ items: [] }),

  updateQuantity: (id, quantity) =>
  set(state => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, quantity } : item
    ),
  })),

  selectedColor: '',
  setSelectedColor: (color) => set({ selectedColor: color }),
  selectedSize: 0,
  setSelectedSize: (value) => set({ selectedSize: value })
}))