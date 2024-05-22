import AuthProvided from './auth';
//import { AuthContext } from './context';

export default function AuthProvider({ children }) {
  const auth = AuthProvided();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
