import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService, GoogleUserProfile, GoogleUser } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      findOrCreateGoogleUser: jest.fn((profile: GoogleUserProfile) => ({
        id: '1',
        googleId: profile.googleId,
        email: profile.email,
        name: profile.name,
      } as GoogleUser)),
      findById: jest.fn((id: string) => ({
        id,
        googleId: 'google-123',
        email: 'test@example.com',
      } as GoogleUser)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a Google auth code and validate the code', () => {
    const profile: GoogleUserProfile = {
      googleId: 'google-123',
      email: 'test@example.com',
      name: 'Test User',
    };

    const result = service.generateGoogleAuthCode(profile);

    expect(result).toBeDefined();
    expect(result.authCode).toHaveLength(64);
    expect(result.user.email).toBe('test@example.com');
    expect((usersService.findOrCreateGoogleUser as jest.Mock).mock.calls.length).toBe(1);

    const validated = service.validateAuthCode(result.authCode);
    expect(validated).toBeDefined();
    expect(validated?.email).toBe('test@example.com');
  });

  it('should return undefined for invalid auth codes', () => {
    expect(service.validateAuthCode('invalid-code')).toBeUndefined();
  });
});
