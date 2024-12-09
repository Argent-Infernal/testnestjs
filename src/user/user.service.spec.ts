import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma.service';
import { UserService } from './user.service';

const mockUser = {
  id: 1,
  username: 'testuser',
  password: 'password',
  name: 'Test User',
};

const mockPrismaService = {
  user: {
    create: jest.fn().mockResolvedValue(mockUser),
    findMany: jest.fn().mockResolvedValue([mockUser]),
    findUnique: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    delete: jest.fn().mockResolvedValue(mockUser),
  },
};

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const result = await service.create({
        password: 'password',
        name: 'Test User',
        roles: [],
      });
      expect(result).toEqual({ success: true });
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          password: 'password',
          name: 'Test User',
          roles: undefined,
        },
      });
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual([mockUser]);
      expect(prisma.user.findMany).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by login', async () => {
      const user = await service.findOne('testuser');
      expect(user).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { username: 'testuser' },
        include: { roles: true },
      });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const result = await service.update('testuser', {
        name: 'Updated User',
        password: 'dsadads',
        roles: []
      });
      expect(result).toEqual({ success: true });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { username: 'testuser' },
        data: {
          name: 'Updated User',
        },
      });
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const result = await service.remove('testuser');
      expect(result).toEqual({ success: true });
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { username: 'testuser' },
      });
    });
  });
});