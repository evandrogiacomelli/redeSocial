import {TokenPayload} from "./token-payload";
import {LoginResult} from "./login-result";

export interface TokenService {
    signIn(payload: TokenPayload): LoginResult;
}