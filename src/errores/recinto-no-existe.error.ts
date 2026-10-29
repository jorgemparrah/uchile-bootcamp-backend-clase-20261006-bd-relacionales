import { AppError } from "./app.error";

export class RecintoNoExisteError extends AppError {

  constructor(id: number) {
    super(`Recinto con ID ${id} no existe`, 'RECINTO_NO_EXISTE');
  }

}