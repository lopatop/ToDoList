export enum TaskStatus {
  New,
  InProgress,
  Completed,
  Draft,
}

export enum TaskPriority {
  Low,
  Middle,
  Hi,
  Urgently,
  Later,
}

export enum ResultCode {
  Success = 0,
  Error = 1,
  CaptchaError = 10,
}
