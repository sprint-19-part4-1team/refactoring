export class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public status: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }

  static unauthorized(message = '인증이 필요합니다') {
    return new AppError('UNAUTHORIZED', message, 401);
  }

  static badRequest(message = '잘못된 요청입니다') {
    return new AppError('BAD_REQUEST', message, 400);
  }

  static serverError(message = '서버 오류가 발생했습니다') {
    return new AppError('SERVER_ERROR', message, 500);
  }
}
