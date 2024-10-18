import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PaginationDto } from '../../base/shared/dtos/pagination.dto';


export class ResponseFormat<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseFormat<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseFormat<T>> {
    const request = context.switchToHttp().getRequest();
    const query = request.query;
    const paginationDto = new PaginationDto();
    paginationDto.page = Number(query.page) || 1;
    paginationDto.limit = Number(query.limit) || 10;

    request.pagination = paginationDto;

    return next.handle();
  }
}
