import {
  Controller, Get, Post, Put, Delete, Body, Param, UseGuards
} from '@nestjs/common';
import { DocenteService } from './docente.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('docentes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocenteController {
  constructor(private readonly docenteService: DocenteService) {}

  @Roles('Administrador', 'Directora')
  @Post()
  crear(@Body() data: any) {
    return this.docenteService.crear(data);
  }

  @Roles('Administrador', 'Directora')
  @Get()
  obtenerTodos() {
    return this.docenteService.obtenerTodos();
  }

  @Roles('Administrador', 'Directora')
  @Get(':id')
  obtenerUno(@Param('id') id: string) {
    return this.docenteService.obtenerUno(id);
  }

  @Roles('Administrador', 'Directora')
  @Put(':id')
  actualizar(@Param('id') id: string, @Body() data: any) {
    return this.docenteService.actualizar(id, data);
  }

  @Roles('Administrador')
  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.docenteService.eliminar(id);
  }
}
