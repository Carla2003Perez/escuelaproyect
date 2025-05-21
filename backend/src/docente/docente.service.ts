import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Docente } from './docente.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuario/usuario.entity';

@Injectable()
export class DocenteService {
  constructor(
    @InjectRepository(Docente)
    private docenteRepo: Repository<Docente>,
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async crear(data: any) {
    const usuario = await this.usuarioRepo.findOne({ where: { id_usuario: data.id_usuario } });
    if (!usuario) throw new Error('Usuario no encontrado');

    const nuevo = this.docenteRepo.create({
      usuario,
      especialidad: data.especialidad,
      telefono: data.telefono,
      fecha_ingreso: data.fecha_ingreso,
    });
    return this.docenteRepo.save(nuevo);
  }

  async obtenerTodos() {
    return this.docenteRepo.find({ relations: ['usuario'] });
  }

  async obtenerUno(id: string) {
    return this.docenteRepo.findOne({ where: { id_docente: id }, relations: ['usuario'] });
  }

  async actualizar(id: string, data: any) {
    await this.docenteRepo.update(id, data);
    return this.obtenerUno(id);
  }

  async eliminar(id: string) {
    return this.docenteRepo.delete(id);
  }
}
