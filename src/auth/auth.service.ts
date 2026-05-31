import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import { UsersService, GoogleUserProfile, GoogleUser } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly authCodes = new Map<string, string>();

  constructor(private readonly usersService: UsersService) {}

  generateGoogleAuthCode(profile: GoogleUserProfile): { authCode: string; user: GoogleUser } {
    const user = this.usersService.findOrCreateGoogleUser(profile);
    const authCode = randomBytes(32).toString('hex');

    this.authCodes.set(authCode, user.id);
    return { authCode, user };
  }

  validateAuthCode(authCode: string): GoogleUser | undefined {
    const userId = this.authCodes.get(authCode);
    if (!userId) {
      return undefined;
    }
    return this.usersService.findById(userId);
  }
}
