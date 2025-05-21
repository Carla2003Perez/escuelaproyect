import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuarioService } from 'src/usuario/usuario.service';
import { EstudianteService } from 'src/estudiante/estudiante.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
    private readonly estudianteService: EstudianteService,
  ) {}

  @Post('registro')
  async registrar(@Body() body: any) {
    const { nombre_completo, correo, contraseña, rol } = body;

    const usuario = await this.usuarioService.crearUsuario(
      nombre_completo,
      correo,
      contraseña,
      rol,
    );

    if (rol === 'Estudiante') {
      await this.estudianteService.crear({
        id_usuario: usuario.id_usuario,
        codigo_estudiante: body.codigo_estudiante,
        grado: body.grado,
        seccion: body.seccion,
        fecha_nacimiento: body.fecha_nacimiento,
        responsable: body.responsable,
      });
    }

    return { mensaje: 'Usuario registrado exitosamente', usuario };
  }

  @Post('login')
  async login(
    @Body('correo') correo: string,
    @Body('contraseña') contraseña: string,
  ) {
    const usuario = await this.authService.validarUsuario(correo, contraseña);
    return this.authService.login(usuario);
  }
}
