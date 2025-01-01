import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  UseFilters,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from 'src/forbidden.exception';
import { HttpExceptionFilter } from './http-exception.filter';

@Controller('cats')
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
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
