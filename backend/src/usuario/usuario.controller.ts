import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('usuario')
export class UsuarioController {
  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  getPerfil(@Request() req) {
    return {
      mensaje: 'Perfil del usuario autenticado',
      usuario: req.user, // contiene id_usuario, rol y nombre
    };
  }
}
