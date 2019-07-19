import * as t from "io-ts";
import excess from "..";
import { assertFailure } from "../__helpers__";

describe("identical", () => {
  it("should fail on additional properties (type)", () => {
    const T = excess(t.type({ foo: t.string }));
    assertFailure(T, { foo: "1", bar: "2" }, [
      "Invalid value {\"foo\":\"1\",\"bar\":\"2\"} supplied to : { foo: string }, excess properties: [\"bar\"]",
    ]);
  });
});
