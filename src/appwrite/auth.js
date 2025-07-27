// src/appwrite/auth.js

import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf.js"; // Make sure you include `.js` if needed

class AuthService {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // ✅ Create a new user account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return await this.login({ email, password });
      }
    } catch (error) {
      console.error("AuthService :: createAccount :: error", error);
      throw error;
    }
  }

  // ✅ Login user
  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      console.error("AuthService :: login :: error", error);
      throw error;
    }
  }

  // ✅ Get current logged-in user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      if (error.code === 401) {
        // Not logged in (guest role) — return null gracefully
        return null;
      }
      console.error("AuthService :: getCurrentUser :: error", error);
      return null;
    }
  }

  // ✅ Logout current session
  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.error("AuthService :: logout :: error", error);
      throw error;
    }
  }

  // ✅ Optional: check login status
  async isLoggedIn() {
    const user = await this.getCurrentUser();
    return !!user;
  }
}

// Export a single instance
const authService = new AuthService();
export default authService;
