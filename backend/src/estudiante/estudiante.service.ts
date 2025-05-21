import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudiante } from './estudiante.entity';
import { Usuario } from 'src/usuario/usuario.entity';

@Injectable()
export class EstudianteService {
  constructor(
    @InjectRepository(Estudiante)
    private estudianteRepo: Repository<Estudiante>,
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async crear(data: any) {
    const usuario = await this.usuarioRepo.findOne({ where: { id_usuario: data.id_usuario } });
    if (!usuario) throw new Error('Usuario no encontrado');

    const nuevo = this.estudianteRepo.create({
      usuario,
      codigo_estudiante: data.codigo_estudiante,
      grado: data.grado,
      seccion: data.seccion,
      fecha_nacimiento: data.fecha_nacimiento,
      responsable: data.responsable,
    });
    return this.estudianteRepo.save(nuevo);
  }

  async obtenerTodos() {
    return this.estudianteRepo.find({ relations: ['usuario'] });
  }

  async obtenerUno(id: string) {
    return this.estudianteRepo.findOne({ where: { id_estudiante: id }, relations: ['usuario'] });
  }

  async actualizar(id: string, data: any) {
    await this.estudianteRepo.update(id, data);
    return this.obtenerUno(id);
  }

  async eliminar(id: string) {
    return this.estudianteRepo.delete(id);
  }
}
