import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new Error('Validation failed');
    }
    return val;
  }
}
