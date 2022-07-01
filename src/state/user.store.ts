import create from 'zustand';
import jwt_decode from 'jwt-decode';

const decodeToken = () => {
  const token =
    localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    const decodedToken: any = jwt_decode(token);
    let currentDate = new Date();
    if (decodedToken) {
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        return null;
      } else {
        return decodedToken;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const deleteToken = () => {
  localStorage.removeItem('token');
  return null;
};

interface DecodedUser {
  _id: string;
  email: string;
}

interface UserStore {
  isAuth: DecodedUser | null;
  updateIsAuth: () => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set: any) => ({
  isAuth: decodeToken(),
  updateIsAuth: () =>
    set((state: any) => ({
      ...state,
      isAuth: decodeToken(),
    })),
  logout: () =>
    set((state: any) => ({
      ...state,
      isAuth: deleteToken(),
    })),
}));
