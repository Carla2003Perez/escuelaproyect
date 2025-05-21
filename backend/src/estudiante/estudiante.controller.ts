import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards} from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('estudiantes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Roles('Administrador', 'Directora')
  @Post()
  crear(@Body() data: any) {
    return this.estudianteService.crear(data);
  }

  @Roles('Administrador', 'Directora', 'Docente')
  @Get()
  obtenerTodos() {
    return this.estudianteService.obtenerTodos();
  }

  @Roles('Administrador', 'Directora', 'Docente')
  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.estudianteService.obtenerUno(id);
  }

  @Roles('Administrador', 'Directora')
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() data: any) {
    return this.estudianteService.actualizar(id, data);
  }

  @Roles('Administrador')
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.estudianteService.eliminar(id);
  }
}
