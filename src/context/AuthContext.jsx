import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('mock_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading] = useState(false);

  const register = async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
        if (users.find((u) => u.email === email)) {
          return reject({ code: 'auth/email-already-in-use' });
        }
        const newUser = { uid: Date.now().toString(), email, displayName: name, password };
        users.push(newUser);
        localStorage.setItem('mock_users', JSON.stringify(users));

        const currentUser = { uid: newUser.uid, email, displayName: name };
        localStorage.setItem('mock_user', JSON.stringify(currentUser));
        setUser(currentUser);
        resolve({ user: currentUser });
      }, 500);
    });
  };

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
        const existingUser = users.find((u) => u.email === email && u.password === password);
        if (!existingUser) {
          if (users.find((u) => u.email === email)) {
            return reject({ code: 'auth/invalid-credential' });
          } else {
            return reject({ code: 'auth/user-not-found' });
          }
        }
        const currentUser = { uid: existingUser.uid, email: existingUser.email, displayName: existingUser.displayName };
        localStorage.setItem('mock_user', JSON.stringify(currentUser));
        setUser(currentUser);
        resolve();
      }, 500);
    });
  };

  const logout = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('mock_user');
        setUser(null);
        resolve();
      }, 300);
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
