import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  dailyGenerationsUsed: number;
  maxDailyGenerations: number;
  designs: SavedDesign[];
}

interface SavedDesign {
  id: string;
  storeName: string;
  businessType: string;
  aiPrompt: string;
  generatedImages: string[];
  createdAt: string;
  ordered: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  canGenerateDesign: () => boolean;
  incrementGenerationCount: () => void;
  saveDesign: (design: Omit<SavedDesign, 'id' | 'createdAt'>) => void;
  getUserDesigns: () => SavedDesign[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Demo account for testing
    if (email === 'demo@test.com' && password === 'demo123') {
      const demoUser: User = {
        id: 'demo-user',
        email: 'demo@test.com',
        name: 'کاربر آزمایشی',
        dailyGenerationsUsed: 0,
        maxDailyGenerations: 2,
        designs: [
          {
            id: 'demo-design-1',
            storeName: 'کافه رویا',
            businessType: 'کافه',
            aiPrompt: 'تابلو مدرن با رنگ‌های گرم و نور LED',
            generatedImages: [
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzU3RENEQSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPtmG2YXZiNmG2Ycg2LfYsdit8J+OqDwvdGV4dD48L3N2Zz4=',
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMjIyIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzNBQURBQiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPtmG2YXZiNmG2Ycg2LfYsdit8J+OqjI8L3RleHQ+PC9zdmc+',
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzRBQkVCQyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPtmG2YXZiNmG2Ycg2LfYsdit8J+OqzM8L3RleHQ+PC9zdmc+',
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDQ0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iIzU3RENEQSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPtmG2YXZiNmG2Ycg2LfYsdit8J+OqzQ8L3RleHQ+PC9zdmc+'
            ],
            createdAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
            ordered: false
          }
        ]
      };
      
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
      return;
    }
    
    // Regular login simulation
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      dailyGenerationsUsed: 0,
      maxDailyGenerations: 2,
      designs: []
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const canGenerateDesign = () => {
    return user ? user.dailyGenerationsUsed < user.maxDailyGenerations : false;
  };

  const incrementGenerationCount = () => {
    if (user) {
      const updatedUser = { ...user, dailyGenerationsUsed: user.dailyGenerationsUsed + 1 };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const saveDesign = (design: Omit<SavedDesign, 'id' | 'createdAt'>) => {
    if (user) {
      const newDesign: SavedDesign = {
        ...design,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      const updatedUser = {
        ...user,
        designs: [...user.designs, newDesign]
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const getUserDesigns = () => {
    return user?.designs || [];
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      canGenerateDesign,
      incrementGenerationCount,
      saveDesign,
      getUserDesigns
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
