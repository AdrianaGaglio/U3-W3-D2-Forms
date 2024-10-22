import { iAuth } from './iauth';

export interface iUser {
  id: number;
  firstName: string;
  lastName: string;
  genre: string;
  profileImg: string;
  description: string;
  username: string;
  authData: iAuth;
}
