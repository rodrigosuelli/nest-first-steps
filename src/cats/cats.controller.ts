import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UseFilters,
  Param,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
// import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from 'src/forbidden.exception';
import { HttpExceptionFilter } from './http-exception.filter';
import { BaseExceptionFilter } from '@nestjs/core';
import { CreateCatDto, createCatSchema } from './schemas/create-cat.schema';
import { ZodValidationPipe } from 'src/common/pipe/zod-validation.pipe';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCatSchema))
  async create(@Body() createCatDto: CreateCatDto) {
    try {
      this.catsService.create(createCatDto);
      throw new Error('Test error');
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: error,
        description: error.message,
      });
    }
  }

  @Get(':id')
  @UseFilters(BaseExceptionFilter)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    try {
      this.catsService.findAll();
      throw new BadRequestException();
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
