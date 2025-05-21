import { Controller, Post, Body, Get } from '@nestjs/common';
import { RolService } from './rol.service';

@Controller('roles')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  crear(@Body('nombre') nombre: string) {
    return this.rolService.crear(nombre);
  }

  @Get()
  obtenerTodos() {
    return this.rolService.obtenerTodos();
  }
}
