export class KlRequestHttpResponseError extends Error {
  constructor(
    message: string,
    public readonly error?: any,
  ) {
    super(message);
  }
}
