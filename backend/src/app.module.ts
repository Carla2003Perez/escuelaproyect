import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Usuario } from './usuario/usuario.entity';
import { AuthModule } from './auth/auth.module';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';
import { Rol } from './rol/rol.entity';
import { EstudianteModule } from './estudiante/estudiante.module';
import { DocenteModule } from './docente/docente.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASS'),
        database: config.get('DB_NAME'),
        entities: [Usuario, Rol, EstudianteModule, DocenteModule],  // después agregas más entidades
        synchronize: true,    // solo en desarrollo, para producción usa migraciones
      }),
    }),
    AuthModule,
    UsuarioModule,
    RolModule,
    EstudianteModule,
    DocenteModule,
  ],
  providers: [UsuarioService],
})
export class AppModule {}
