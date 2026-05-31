import { Injectable } from '@nestjs/common';

export interface GoogleUserProfile {
  googleId: string;
  email: string;
  name?: string;
  picture?: string;
}

export interface GoogleUser {
  id: string;
  googleId: string;
  email: string;
  name?: string;
  picture?: string;
}

@Injectable()
export class UsersService {
  private readonly usersById = new Map<string, GoogleUser>();
  private readonly usersByGoogleId = new Map<string, string>();
  private nextId = 1;

  findByGoogleId(googleId: string): GoogleUser | undefined {
    const userId = this.usersByGoogleId.get(googleId);
    return userId ? this.usersById.get(userId) : undefined;
  }

  findOrCreateGoogleUser(profile: GoogleUserProfile): GoogleUser {
    const existing = this.findByGoogleId(profile.googleId);
    if (existing) {
      return existing;
    }

    const id = String(this.nextId++);
    const newUser: GoogleUser = {
      id,
      googleId: profile.googleId,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
    };

    this.usersById.set(id, newUser);
    this.usersByGoogleId.set(profile.googleId, id);
    return newUser;
  }

  findById(id: string): GoogleUser | undefined {
    return this.usersById.get(id);
  }
}
