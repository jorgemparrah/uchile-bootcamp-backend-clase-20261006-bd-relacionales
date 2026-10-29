import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RecintoNoExisteError } from '../errores/recinto-no-existe.error';

@Catch(RecintoNoExisteError)
export class RecintoNoExiste409Filter implements ExceptionFilter<RecintoNoExisteError> {
  catch(exception: RecintoNoExisteError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(409).json({
      statusCode: 409,
      message: (exception as any).message,
      error: exception.codigo
    });
  }
}
