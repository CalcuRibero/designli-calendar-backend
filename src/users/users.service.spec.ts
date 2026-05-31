import { Test, TestingModule } from '@nestjs/testing';
import { UsersService, GoogleUserProfile } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a Google user and return the same instance on repeated lookup', () => {
    const profile: GoogleUserProfile = {
      googleId: 'google-123',
      email: 'test@example.com',
      name: 'Test User',
    };

    const firstUser = service.findOrCreateGoogleUser(profile);
    const secondUser = service.findOrCreateGoogleUser(profile);

    expect(firstUser).toBeDefined();
    expect(firstUser.email).toBe('test@example.com');
    expect(secondUser).toEqual(firstUser);
  });

  it('should look up a user by Google ID', () => {
    const profile: GoogleUserProfile = {
      googleId: 'google-456',
      email: 'lookup@example.com',
    };

    const created = service.findOrCreateGoogleUser(profile);
    const found = service.findByGoogleId(profile.googleId);

    expect(found).toEqual(created);
  });
});
