import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from 'src/usuario/usuario.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validarUsuario(correo: string, contraseña: string) {
    const usuario = await this.usuarioService.buscarPorCorreo(correo);
    if (!usuario) throw new UnauthorizedException('Usuario no encontrado');

    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isMatch) throw new UnauthorizedException('Contraseña incorrecta');

    return usuario;
  }

  async login(usuario: any) {
    const payload = {
      sub: usuario.id_usuario,
      rol: usuario.rol.nombre,
      nombre: usuario.nombre_completo,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
