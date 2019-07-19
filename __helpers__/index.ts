import * as assert from "assert";
import { fold } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import * as t from "io-ts";
import { PathReporter } from "io-ts/lib/PathReporter";

export function assertSuccess<T>(result: t.Validation<T>, expected?: T): void {
  pipe(
    result,
    fold(
      () => {
        throw new Error(`${result} is not a right`);
      },
      (a) => {
        if (expected !== undefined) {
          assert.deepStrictEqual(a, expected);
        }
      },
    ),
  );
}

export function assertFailure(
  codec: t.Any,
  value: unknown,
  errors: string[],
): void {
  const result = codec.decode(value);
  pipe(
    result,
    fold(
      () => {
        assert.deepStrictEqual(PathReporter.report(result), errors);
      },
      () => {
        throw new Error(`${result} is not a left`);
      },
    ),
  );
}
