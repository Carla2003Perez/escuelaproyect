import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './rol.entity';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private rolRepo: Repository<Rol>,
  ) {}

  async crear(nombre: string): Promise<Rol> {
    const rol = this.rolRepo.create({ nombre });
    return this.rolRepo.save(rol);
  }

  async obtenerTodos(): Promise<Rol[]> {
    return this.rolRepo.find();
  }
}
