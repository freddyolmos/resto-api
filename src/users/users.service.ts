import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { User } from './user.types';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'Jhon', email: 'jhon@example.com', isActive: true },
    { id: 2, name: 'Jhoana', email: 'jhoana@example.com', isActive: false },
  ];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: number): Promise<User> {
    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestException('Invalid id.');
    }
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado.`);
    }
    return user;
  }
  async create(dto: CreateUserDto): Promise<User> {
    const nextId = this.users.length ? Math.max(...this.users.map((u) => u.id)) + 1 : 1;

    const newUser: User = {
      id: nextId,
      name: dto.name,
      email: dto.email,
      isActive: true,
    };
    this.users.push(newUser);
    return newUser;
  }
}
