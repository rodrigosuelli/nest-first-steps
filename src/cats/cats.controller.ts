import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action creates a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params);
    return `This action returns a #${params.id} cat`;
  }
}
