import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Rol } from 'src/rol/rol.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarioRepo: Repository<Usuario>,
    @InjectRepository(Rol) private readonly rolRepo: Repository<Rol>,
  ) {}

  async crearUsuario(nombre_completo: string, correo: string, contraseña: string, rolNombre: string) {
    const rol = await this.rolRepo.findOne({ where: { nombre: rolNombre } });
    if (!rol) throw new Error('Rol no encontrado');

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(contraseña, salt);

    const nuevoUsuario = this.usuarioRepo.create({
      nombre_completo,
      correo,
      contraseña: hash,
      rol,
    });

    return this.usuarioRepo.save(nuevoUsuario);
  }

  async buscarPorCorreo(correo: string) {
    return this.usuarioRepo.findOne({ where: { correo }, relations: ['rol'] });
  }
}
