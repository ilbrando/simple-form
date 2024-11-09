import { describe, expectTypeOf, test } from "vitest";

import { Arbitrary, InferArrayItem, MakeNullable, MakeOptional, Maybe, OmitSafe, PropKeysOf, RemoveOptional } from "./type-utils";

type TestType = { a: number; b: string; c: string; d?: string };

describe("type-utils", () => {
  test("Maybe<T>", () => {
    expectTypeOf("a string").toMatchTypeOf<Maybe<string>>();
    expectTypeOf(null).toMatchTypeOf<Maybe<string>>();
    expectTypeOf(undefined).toMatchTypeOf<Maybe<string>>();
    expectTypeOf(42).toMatchTypeOf<Maybe<number>>();
  });

  test("OmitSafe<T, K>", () => {
    expectTypeOf({ a: 42 }).toEqualTypeOf<OmitSafe<TestType, "b" | "c" | "d">>();
  });

  test("PropKeysOf<T, TPropValue>", () => {
    expectTypeOf("a" as const).toMatchTypeOf<PropKeysOf<TestType, number>>();
    expectTypeOf("b" as const).toMatchTypeOf<PropKeysOf<TestType, string>>();
    expectTypeOf("c" as const).toMatchTypeOf<PropKeysOf<TestType, string>>();
  });

  test("RemoveOptional<T>", () => {
    expectTypeOf({ a: 42, b: "foo", c: "bar" }).toMatchTypeOf<TestType>();
    expectTypeOf({ a: 42, b: "foo", c: "bar", d: "baz" }).toMatchTypeOf<RemoveOptional<TestType>>();
  });

  test("MakeOptional<T>", () => {
    expectTypeOf({}).toMatchTypeOf<MakeOptional<TestType>>();
    expectTypeOf({ a: 42 }).toMatchTypeOf<MakeOptional<TestType>>();
  });

  test("MakeNullable<T>", () => {
    expectTypeOf({ a: null, b: null, c: null }).toMatchTypeOf<MakeNullable<TestType>>();
  });

  test("InferArrayItem", () => {
    expectTypeOf("foo").toMatchTypeOf<InferArrayItem<string[]>>();
  });

  test("Arbitrary<T>", () => {
    type X = Arbitrary<"foo" | "bar">;
    expectTypeOf("foo").toMatchTypeOf<X>();
    expectTypeOf("bar").toMatchTypeOf<X>();
    expectTypeOf("baz").toMatchTypeOf<X>();
  });
});
