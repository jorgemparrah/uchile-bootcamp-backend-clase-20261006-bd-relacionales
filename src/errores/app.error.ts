export class AppError extends Error {

  codigo: string;

  constructor(message: string, codigo: string) {
    super(message);
    this.codigo = codigo;
  }

}