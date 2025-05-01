import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthResponse} from "./auth-response.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5282/api/auth'; // adjust if needed
  private tokenKey = 'wanderly_token';

  constructor(private http: HttpClient) {}

  signup(email: string, password: string, fullName: string) {
    return this.http.post(`${this.apiUrl}/signup`, { email, password, fullName });
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password });
  }

  storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
