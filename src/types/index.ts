export * from "./components";

export type Nullable<T> = null | T;
export type Maybe<T> = Nullable<T> | undefined;
export type Fn<T = void> = () => T;
export type Numerishi = string | number;
