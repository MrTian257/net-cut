export interface Auth {
  isAuthenticated: boolean;
  hash: string;
  navigateTo?: string;
  redirect?: string;
}

export const useAuth = () => useState<Auth>('auth', () => ({
  isAuthenticated: false,
  hash: '',
  navigateTo: '/',
  redirect: '/',
}))