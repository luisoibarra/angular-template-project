export interface ILoginResult {
  refreshToken?: string ;
  sessionToken?: string ;
  refreshTokenExpires?: Date ;
  sessionTokenExpires?: Date;
}
