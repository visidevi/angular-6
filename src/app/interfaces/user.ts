export interface User {
    nick: string;
    subnick?: string;
    age?: number;
    email: string;
  friend?: boolean;
  friends?: any[];
    uid?: any;
    status? : string;
    avatar? : string;
}
