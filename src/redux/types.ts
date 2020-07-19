export interface Card {
  name: string;
  srcUri: string;
  id: number;
}

export enum Status {
  unFetched = "unfetched",
  isPending = "pending",
  hasSucceeded = "succeded",
  hasFailed = "failed",
}

export interface Async {
  status: Status;
  error?: string;
}

export interface AsyncValue<T> extends Async {
  value?: T;
}
