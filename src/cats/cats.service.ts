import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findOne(id: number): Cat {
    return this.cats[id];
  }

  findAll({ activeOnly, page }: { activeOnly: boolean; page: number }): Cat[] {
    console.log(activeOnly);
    console.log(page);
    return this.cats;
  }
}
