import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { RecintoNoExisteError } from '../errores/recinto-no-existe.error';

@Catch(RecintoNoExisteError)
export class RecintoNoExiste404Filter implements ExceptionFilter<RecintoNoExisteError> {
  catch(exception: RecintoNoExisteError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    response.status(404).json({
      statusCode: 404,
      message: exception.message,
      error: exception.codigo
    });
  }
}
