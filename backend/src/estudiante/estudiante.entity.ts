import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn
} from 'typeorm';
import { Usuario } from 'src/usuario/usuario.entity';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn('uuid')
  id_estudiante: string;

  @OneToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ unique: true })
  codigo_estudiante: string;

  @Column({ nullable: true })
  grado: string;

  @Column({ nullable: true })
  seccion: string;

  @Column({ type: 'date', nullable: true })
  fecha_nacimiento: Date;

  @Column({ nullable: true })
  responsable: string;
}
