import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole, Project } from '../types';
import {
  auth,
  db as firestore,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  ADMIN_EMAIL,
} from '../lib/firebase';
import { db as localDb } from '../lib/storage';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  company?: string;
  website?: string;
  phone?: string;
  serviceInterest?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; role: UserRole; message?: string }>;
  sendEmailOtp: (email: string) => Promise<{ success: boolean; message?: string; verificationToken?: string }>;
  verifyEmailOtp: (
    email: string,
    otp: string,
    verificationToken: string,
    extraData?: { name?: string; company?: string; serviceInterest?: string }
  ) => Promise<{ success: boolean; role: UserRole; message?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => localDb.getCurrentUser());
  const [loading, setLoading] = useState<boolean>(true);

  // Synchronize with Firebase Auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const cleanEmail = firebaseUser.email?.toLowerCase().trim() || '';
        const isOfficialAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase();
        const assignedRole: UserRole = isOfficialAdmin ? 'admin' : 'client';

        try {
          // Read user profile from Google Cloud Firestore
          const userDocRef = doc(firestore, 'users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          let resolvedUser: User;

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            resolvedUser = {
              id: firebaseUser.uid,
              name: data.name || firebaseUser.displayName || cleanEmail.split('@')[0],
              email: cleanEmail,
              role: assignedRole,
              company: data.company || '',
              website: data.website || '',
              phone: data.phone || '',
              serviceInterest: data.serviceInterest || 'All Services',
              avatarUrl: firebaseUser.photoURL || data.avatarUrl || undefined,
              createdAt: data.createdAt || new Date().toISOString(),
              lastLogin: new Date().toISOString(),
            };
            // Update last login in Firestore asynchronously
            updateDoc(userDocRef, {
              lastLogin: resolvedUser.lastLogin,
              role: assignedRole,
            }).catch(() => {});
          } else {
            // Document does not exist in Firestore yet (e.g. first Google Sign-In)
            resolvedUser = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || cleanEmail.split('@')[0] || 'Client',
              email: cleanEmail,
              role: assignedRole,
              avatarUrl: firebaseUser.photoURL || undefined,
              company: '',
              createdAt: new Date().toISOString(),
              lastLogin: new Date().toISOString(),
            };

            await setDoc(userDocRef, resolvedUser, { merge: true });

            // If client, create default growth roadmap in Firestore
            if (assignedRole === 'client') {
              const defaultProj: Project = {
                id: `proj_${firebaseUser.uid}`,
                clientId: firebaseUser.uid,
                clientName: resolvedUser.name,
                clientEmail: cleanEmail,
                title: `${resolvedUser.name}'s Growth Acceleration Campaign`,
                serviceCategory: 'website',
                status: 'planning',
                progress: 15,
                startDate: new Date().toISOString().split('T')[0],
                targetDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
                deliverables: [
                  { id: 'del_fb_1', title: 'Google Identity & Account Verified', completed: true },
                  { id: 'del_fb_2', title: 'Performance Strategy & Target KPIs', completed: false },
                  { id: 'del_fb_3', title: 'Conversion Funnel & Campaign Launch', completed: false },
                ],
                updates: [
                  {
                    id: 'up_fb_1',
                    date: new Date().toISOString().split('T')[0],
                    author: 'NYSAX Welcome Desk',
                    text: 'Account linked with Google databases. Your dedicated growth director will review your roadmap.',
                  },
                ],
              };
              setDoc(doc(firestore, 'projects', defaultProj.id), defaultProj).catch(() => {});
              localDb.saveProject(defaultProj);
            }
          }

          setUser(resolvedUser);
          localDb.saveUser(resolvedUser);
          localDb.setCurrentUser(resolvedUser);
        } catch (err) {
          console.warn('[Firestore sync fallback]:', err);
          // Fallback to local session if Firestore read encountered network delay
          const localUser = localDb.getCurrentUser();
          if (localUser) {
            setUser(localUser);
          }
        }
      } else {
        // No active Firebase user
        localDb.setCurrentUser(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 1. Actual Password Login via Firebase Auth
  const login = async (email: string, password?: string): Promise<{ success: boolean; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!password) {
      return { success: false, message: 'Password is required to authenticate.' };
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
      const fbUser = userCredential.user;
      const isOfficialAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase();
      const assignedRole: UserRole = isOfficialAdmin ? 'admin' : 'client';

      // Load Firestore doc
      try {
        const userRef = doc(firestore, 'users', fbUser.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const data = snap.data();
          const loggedInUser: User = {
            id: fbUser.uid,
            name: data.name || fbUser.displayName || cleanEmail.split('@')[0],
            email: cleanEmail,
            role: assignedRole,
            company: data.company || '',
            website: data.website || '',
            phone: data.phone || '',
            serviceInterest: data.serviceInterest || 'All Services',
            avatarUrl: fbUser.photoURL || undefined,
            createdAt: data.createdAt || new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          };
          setUser(loggedInUser);
          localDb.saveUser(loggedInUser);
          localDb.setCurrentUser(loggedInUser);
          updateDoc(userRef, { lastLogin: loggedInUser.lastLogin, role: assignedRole }).catch(() => {});
        }
      } catch (e) {
        console.warn('Firestore doc read error on login:', e);
      }

      return { success: true };
    } catch (err: any) {
      const errorCode = err.code || '';
      let msg = 'Authentication failed. Please check your credentials.';

      if (errorCode === 'auth/invalid-credential' || errorCode === 'auth/wrong-password') {
        msg = 'Invalid email or password. Please verify and try again.';
      } else if (errorCode === 'auth/user-not-found') {
        msg = 'No account found with this email. Please register to create one.';
      } else if (errorCode === 'auth/too-many-requests') {
        msg = 'Access temporarily restricted due to repeated attempts. Try again later or reset password.';
      } else if (errorCode === 'auth/network-request-failed') {
        msg = 'Network connection issue. Please check your internet connection.';
      } else if (err.message) {
        msg = err.message;
      }

      return { success: false, message: msg };
    }
  };

  // 2. Actual Registration via Firebase Auth
  const register = async (data: RegisterData): Promise<{ success: boolean; message?: string }> => {
    const cleanEmail = data.email.trim().toLowerCase();
    const isOfficialAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase();
    const assignedRole: UserRole = isOfficialAdmin ? 'admin' : 'client';

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, data.password);
      const fbUser = userCredential.user;

      // Update user display name in Google Identity
      await updateProfile(fbUser, { displayName: data.name });

      const newUser: User = {
        id: fbUser.uid,
        name: data.name,
        email: cleanEmail,
        role: assignedRole,
        company: data.company || '',
        website: data.website || '',
        phone: data.phone || '',
        serviceInterest: data.serviceInterest || 'All Services',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      // Write user record directly to Google Cloud Firestore
      try {
        await setDoc(doc(firestore, 'users', fbUser.uid), newUser);
      } catch (fsErr) {
        console.warn('Firestore user write error:', fsErr);
      }

      // If client, create default onboarding project in Firestore
      if (assignedRole === 'client') {
        const initialProj: Project = {
          id: `proj_${fbUser.uid}`,
          clientId: fbUser.uid,
          clientName: newUser.name,
          clientEmail: cleanEmail,
          title: `${newUser.company || newUser.name}'s Growth Acceleration Campaign`,
          serviceCategory: 'website',
          status: 'planning',
          progress: 15,
          startDate: new Date().toISOString().split('T')[0],
          targetDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
          deliverables: [
            { id: 'del_init_1', title: 'Onboarding & Strategic Diagnostic', completed: true },
            { id: 'del_init_2', title: 'Campaign Architecture & Target KPIs', completed: false },
            { id: 'del_init_3', title: 'Creative & Technical Execution Phase', completed: false },
          ],
          updates: [
            {
              id: 'up_init_1',
              date: new Date().toISOString().split('T')[0],
              author: 'NYSAX Welcome Desk',
              text: 'Account created and synchronized with Google database. Your strategist will review your roadmap within 4 hours.',
            },
          ],
        };

        try {
          await setDoc(doc(firestore, 'projects', initialProj.id), initialProj);
        } catch (projErr) {
          console.warn('Firestore project write error:', projErr);
        }
        localDb.saveProject(initialProj);
      }

      localDb.saveUser(newUser);
      localDb.setCurrentUser(newUser);
      setUser(newUser);

      return { success: true };
    } catch (err: any) {
      const errorCode = err.code || '';
      let msg = 'Registration failed. Please try again.';

      if (errorCode === 'auth/email-already-in-use') {
        msg = 'An account with this email address already exists. Please log in.';
      } else if (errorCode === 'auth/weak-password') {
        msg = 'Password is too weak. Please use at least 6 characters.';
      } else if (errorCode === 'auth/invalid-email') {
        msg = 'The email address is invalid.';
      } else if (err.message) {
        msg = err.message;
      }

      return { success: false, message: msg };
    }
  };

  // 3. Complete Native Google Sign-In linked to Google Databases
  const loginWithGoogle = async (): Promise<{ success: boolean; role: UserRole; message?: string }> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;
      const cleanEmail = fbUser.email?.toLowerCase().trim() || '';
      const isOfficialAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase();
      const assignedRole: UserRole = isOfficialAdmin ? 'admin' : 'client';

      const userDocRef = doc(firestore, 'users', fbUser.uid);
      const userSnap = await getDoc(userDocRef);

      let targetUser: User;

      if (userSnap.exists()) {
        const data = userSnap.data();
        targetUser = {
          id: fbUser.uid,
          name: data.name || fbUser.displayName || cleanEmail.split('@')[0],
          email: cleanEmail,
          role: assignedRole,
          company: data.company || '',
          website: data.website || '',
          phone: data.phone || '',
          serviceInterest: data.serviceInterest || 'All Services',
          avatarUrl: fbUser.photoURL || undefined,
          createdAt: data.createdAt || new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };
        updateDoc(userDocRef, {
          lastLogin: targetUser.lastLogin,
          role: assignedRole,
          avatarUrl: targetUser.avatarUrl || '',
        }).catch(() => {});
      } else {
        // First-time Google user -> Create in Firestore
        targetUser = {
          id: fbUser.uid,
          name: fbUser.displayName || cleanEmail.split('@')[0],
          email: cleanEmail,
          role: assignedRole,
          avatarUrl: fbUser.photoURL || undefined,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        };

        await setDoc(userDocRef, targetUser);

        if (assignedRole === 'client') {
          const googleProj: Project = {
            id: `proj_${fbUser.uid}`,
            clientId: fbUser.uid,
            clientName: targetUser.name,
            clientEmail: cleanEmail,
            title: `${targetUser.name}'s Growth Acceleration Campaign`,
            serviceCategory: 'website',
            status: 'planning',
            progress: 15,
            startDate: new Date().toISOString().split('T')[0],
            targetDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0],
            deliverables: [
              { id: 'del_g_1', title: 'Google Identity Setup & Growth Audit', completed: true },
              { id: 'del_g_2', title: 'Performance Strategy Roadmap', completed: false },
              { id: 'del_g_3', title: 'Conversion Funnel Execution', completed: false },
            ],
            updates: [
              {
                id: 'up_g_1',
                date: new Date().toISOString().split('T')[0],
                author: 'NYSAX Welcome Desk',
                text: 'Authenticated with Google. Your growth workspace has been initialized in Google Cloud.',
              },
            ],
          };
          setDoc(doc(firestore, 'projects', googleProj.id), googleProj).catch(() => {});
          localDb.saveProject(googleProj);
        }
      }

      localDb.saveUser(targetUser);
      localDb.setCurrentUser(targetUser);
      setUser(targetUser);

      return { success: true, role: assignedRole };
    } catch (err: any) {
      console.error('[Google Sign-In Error]:', err);
      const errorCode = err.code || '';
      let msg = 'Google Sign-In was cancelled or encountered an error.';

      if (errorCode === 'auth/popup-closed-by-user') {
        msg = 'Google Sign-In popup was closed before signing in.';
      } else if (errorCode === 'auth/unauthorized-domain') {
        msg = 'This domain is not yet authorized in Firebase Console. Please add nysax.vercel.app under Authentication > Settings > Authorized Domains.';
      } else if (errorCode === 'auth/operation-not-allowed') {
        msg = 'Google provider is not enabled yet in Firebase Console under Authentication > Sign-in method.';
      } else if (err.message) {
        msg = err.message;
      }

      return {
        success: false,
        role: 'client',
        message: msg,
      };
    }
  };

  // 4. Google Password Reset Email
  const resetPassword = async (email: string): Promise<{ success: boolean; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, message: 'Please enter your email address to receive password reset instructions.' };
    }

    try {
      await sendPasswordResetEmail(auth, cleanEmail);
      return {
        success: true,
        message: `A password reset email has been dispatched by Google to ${cleanEmail}. Please check your inbox and spam folder.`,
      };
    } catch (err: any) {
      const errorCode = err.code || '';
      let msg = 'Failed to dispatch password reset email.';
      if (errorCode === 'auth/user-not-found') {
        msg = 'No account was found with that email address.';
      } else if (err.message) {
        msg = err.message;
      }
      return { success: false, message: msg };
    }
  };

  // 5. Resend OTP Dispatch (preserved for seamless multi-channel verification)
  const sendEmailOtp = async (email: string): Promise<{ success: boolean; message?: string; verificationToken?: string }> => {
    try {
      const res = await fetch('/api/auth-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', email }),
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return { success: false, message: 'Failed to communicate with OTP verification server.' };
    }
  };

  // 6. Resend OTP Verification
  const verifyEmailOtp = async (
    email: string,
    otp: string,
    verificationToken: string,
    extraData?: { name?: string; company?: string; serviceInterest?: string }
  ): Promise<{ success: boolean; role: UserRole; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const isOfficialAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase();
    const assignedRole: UserRole = isOfficialAdmin ? 'admin' : 'client';

    try {
      const res = await fetch('/api/auth-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', email: cleanEmail, otp, verificationToken }),
      });
      const result = await res.json();

      if (!result.success) {
        return { success: false, role: assignedRole, message: result.message || 'Invalid passcode.' };
      }

      // Check if user exists in local or Firestore
      const sessionUser: User = {
        id: `user_otp_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        name: extraData?.name || cleanEmail.split('@')[0],
        email: cleanEmail,
        role: assignedRole,
        company: extraData?.company || '',
        serviceInterest: extraData?.serviceInterest || 'General Inbound',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      localDb.saveUser(sessionUser);
      localDb.setCurrentUser(sessionUser);
      setUser(sessionUser);

      // Async write to Firestore
      try {
        setDoc(doc(firestore, 'users', sessionUser.id), sessionUser, { merge: true }).catch(() => {});
      } catch (e) {}

      return { success: true, role: assignedRole };
    } catch (err: any) {
      return { success: false, role: assignedRole, message: 'Network error verifying passcode.' };
    }
  };

  // 7. Logout via Firebase & Local
  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('Firebase signout warning:', err);
    }
    localDb.setCurrentUser(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase(),
        loading,
        login,
        register,
        loginWithGoogle,
        sendEmailOtp,
        verifyEmailOtp,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
