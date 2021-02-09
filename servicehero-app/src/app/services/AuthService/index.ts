import jwt_decode from 'jwt-decode';
import { JwtPayload } from 'types';
const ls = localStorage;

const JWT_TOKEN = 'access_token';

export class AuthService {
  static saveJwtToken(jwtToken: string) {
    ls.setItem(JWT_TOKEN, jwtToken);
  }
  static getJwtToken() {
    return ls.getItem(JWT_TOKEN) || '';
  }
  static getPayload(): JwtPayload | null {
    const token = ls.getItem(JWT_TOKEN);
    if (token != null) {
      try {
        return jwt_decode(token);
      } catch (err) {}
    }
    return null;
  }
  static isTokenValid() {
    const payload = AuthService.getPayload();
    if (payload && Date.now() < payload.exp * 1000) {
      return true;
    }
    return false;
  }
  static removeToken() {
    ls.removeItem(JWT_TOKEN);
  }
}
