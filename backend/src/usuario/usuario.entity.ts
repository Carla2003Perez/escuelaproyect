import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Rol } from 'src/rol/rol.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id_usuario: string;

  @Column()
  nombre_completo: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  contraseña: string;

  @ManyToOne(() => Rol, rol => rol.usuarios, { eager: true })
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;

  @CreateDateColumn()
  creado_en: Date;
}
