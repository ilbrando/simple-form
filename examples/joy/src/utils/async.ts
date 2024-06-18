type AsyncStateNotStarted = "not-started";
type AsyncStateIsRunning = "is-running";
type AsyncStateFailed = "failed";
type AsyncStateHasFinished = "has-finished";
export type AsyncState = AsyncStateNotStarted | AsyncIsRunning | AsyncStateHasFinished;

type AsyncNotStarted = { state: AsyncStateNotStarted };
type AsyncIsRunning = { state: AsyncStateIsRunning };
type AsyncFailed<T = undefined> = { state: AsyncStateFailed; error: T };
type AsyncHasFinished<T> = { state: AsyncStateHasFinished; data: T };
export type Async<TSuccess, TError = undefined> = AsyncNotStarted | AsyncIsRunning | AsyncFailed<TError> | AsyncHasFinished<TSuccess>;

export const asyncNotStarted: AsyncNotStarted = { state: "not-started" };
export const asyncIsRunning: AsyncIsRunning = { state: "is-running" };

export const asyncFailed = <T>(error: T): AsyncFailed<T> => ({ state: "failed", error });

export const asyncHasFinished = <T>(data: T): AsyncHasFinished<T> => ({ state: "has-finished", data });

export const ensureAsyncHasFinished = <TSuccess, TError = undefined>(loading: Async<TSuccess, TError>, message?: string): TSuccess => {
  if (loading.state !== "has-finished") throw Error(`ensureAsyncHasFinished (loadingState is ${loading.state}): ${message ?? "did not expect this"}.`);
  return loading.data;
};
