export class ConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
    };
  }
}
