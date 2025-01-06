import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UseFilters,
  Param,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from 'src/forbidden.exception';
import { HttpExceptionFilter } from './http-exception.filter';
import { BaseExceptionFilter } from '@nestjs/core';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body(ValidationPipe) createCatDto: CreateCatDto) {
    try {
      this.catsService.create(createCatDto);
      // throw new Error('Test error');
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
  async findAll(
    @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe)
    activeOnly: boolean,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  ): Promise<Cat[]> {
    try {
      return this.catsService.findAll({ activeOnly, page });
      // throw new BadRequestException();
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
