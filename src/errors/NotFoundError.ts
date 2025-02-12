export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
    };
  }
}
