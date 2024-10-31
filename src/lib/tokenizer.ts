/* eslint-disable @typescript-eslint/no-explicit-any */
import Token from "jsonwebtoken";
import appConfig from "../config/app.config";

interface JwtPayload extends Record<string, any> {
  id: number;
}

export type TokenType = "access" | "refresh";

export type AccessToken = string;
export type RefreshToken = string;

export interface Tokens {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}
export interface TokenResponse extends Tokens {
  type: string;
  expiresIn: string;
}

class Tokenizer {
  /**
   * Sign a token using jsonwebtoken
   */
  public signToken = (payload: JwtPayload, type: TokenType): string => {
    return Token.sign(
      payload,
      type === "access" ? appConfig.jwt.secret : appConfig.jwt.refresh.secret,
      {
        expiresIn: `${
          type === "access"
            ? `${appConfig.jwt.expiresIn}m`
            : `${appConfig.jwt.refresh.expiresIn}h`
        }`,
        notBefore: "0", // Cannot use before now, can be configured to be deferred.
        algorithm: "HS256",
        audience: appConfig.jwt.audience,
        issuer: appConfig.jwt.issuer,
      }
    );
  };

  /**
   * Verify a token
   *  */
  public verifyToken = (
    token: AccessToken | RefreshToken,
    type: TokenType
  ): JwtPayload | null => {
    try {
      return Token.verify(
        token,
        type === "access" ? appConfig.jwt.secret : appConfig.jwt.refresh.secret,
        {
          issuer: appConfig.jwt.issuer,
          audience: appConfig.jwt.audience,
        }
      ) as JwtPayload;
    } catch (_error) {
      throw new Error("Invalid auth token");
    }
  };

  /**
   * Generate access token
   */
  public generateAccessToken = (payload: JwtPayload): AccessToken => {
    return this.signToken(payload, "access") as AccessToken;
  };

  /**
   * Generate refresh token
   */
  public generateRefreshToken = (payload: JwtPayload): RefreshToken => {
    return this.signToken(payload, "refresh") as RefreshToken;
  };

  /**
   * Generate access and refresh tokens
   */
  public generateTokens = (payload: JwtPayload): Tokens => {
    const accessToken = this.generateAccessToken({ id: payload["id"] });
    const refreshToken = this.generateRefreshToken({
      id: payload["id"],
    });
    return { accessToken, refreshToken } as Tokens;
  };

  /**
   * Verify access token
   */
  public verifyAccessToken = (token: AccessToken): JwtPayload | null => {
    return this.verifyToken(token, "access");
  };

  /**
   * Verify refresh token
   */
  public verifyRefreshToken = (token: string): JwtPayload | null => {
    return this.verifyToken(token, "refresh");
  };

  /**
   * Decode a token by first verifying it
   */
  public decodeToken = (
    token: AccessToken | RefreshToken,
    type: TokenType = "access",
    options?: Token.DecodeOptions
  ) => {
    this.verifyToken(token, type);
    return Token.decode(token, options) as JwtPayload;
  };

  public generateTokenResponse(tokens: Tokens):TokenResponse {
    return {
      ...tokens,
      type: "Bearer",
      expiresIn: `${appConfig.jwt.expiresIn} minutes`,
    };
  }
}

const tokenizer = new Tokenizer();
export default tokenizer;
