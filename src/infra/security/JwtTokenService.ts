import { TokenService } from "../../application/user/ports/token-service";
import { TokenPayload } from "../../application/user/ports/token-payload";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { LoginResult } from "../../application/user/ports/login-result";

export class JwtTokenService implements TokenService {
  private readonly secret: Secret;
  private readonly expiresIn: number;

  constructor(secret: Secret, expiresIn: number) {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  signIn(payload: TokenPayload): LoginResult {
    const options: SignOptions = { expiresIn: this.expiresIn };
    const token: string = jwt.sign(payload, this.secret, options);
    return {
      accessToken: token,
      expiresInSec: this.expiresIn,
    };
  }
}
