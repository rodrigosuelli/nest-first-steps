import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return 'This action creates a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get(':id')
  findOne(@Param() params: { id: string }): string {
    return `This action returns a #${params.id} cat`;
  }
}
