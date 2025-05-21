import {
  Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn
} from 'typeorm';
import { Usuario } from 'src/usuario/usuario.entity';

@Entity()
export class Docente {
  @PrimaryGeneratedColumn('uuid')
  id_docente: string;

  @OneToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @Column({ nullable: true })
  especialidad: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ type: 'date', nullable: true })
  fecha_ingreso: Date;
}
