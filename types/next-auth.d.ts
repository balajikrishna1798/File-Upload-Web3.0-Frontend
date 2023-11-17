// types/next-auth.d.ts
import { Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username:string;
      name: string;
      email: string;
      picture: string;
      provider: string;
    };
  }
}
