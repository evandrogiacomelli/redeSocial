import { IUserRepository } from "../../../../domain/User/ports/IUserRepository";
import { PostgresUserRepository } from "../../../../infra/persistence/user/PostgresUserRepository";
import { PasswordHasher } from "../../../../application/user/ports/password-hasher";
import { BcryptPasswordHasher } from "../../../../infra/security/bcrypt-pass-hash";
import { TokenService } from "../../../../application/user/ports/token-service";
import { JwtTokenService } from "../../../../infra/security/JwtTokenService";
import { LoginService } from "../../../../application/user/use-cases/loginService";

class AuthContainer {
  private userRepository: IUserRepository = new PostgresUserRepository();
  private passwordHasher: PasswordHasher = new BcryptPasswordHasher();
  private tokenService: TokenService = new JwtTokenService(
    process.env.JWT_SECRET ?? "",
    Number(process.env.JWT_EXPIRES_IN ?? 86400),
  );

  login: LoginService = new LoginService(
    this.userRepository,
    this.passwordHasher,
    this.tokenService,
  );
}

export const authContainer = new AuthContainer();
