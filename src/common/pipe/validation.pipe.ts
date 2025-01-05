import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    return value;
  }
}
