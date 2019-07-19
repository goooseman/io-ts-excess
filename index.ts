import { either } from "fp-ts/lib/Either";
import * as t from "io-ts";

function getExcessProps(props: t.Props, r: Record<string, unknown>): string[] {
  const ex: string[] = [];
  for (const k of Object.keys(r)) {
    if (!props.hasOwnProperty(k)) {
      ex.push(k);
    }
  }
  return ex;
}

export function excess<C extends t.InterfaceType<t.Props>>(codec: C): C {
  const r = new t.InterfaceType(
    codec.name,
    codec.is,
    (i, c) =>
      either.chain(
        t.UnknownRecord.validate(i, c),
        (rec: Record<string, unknown>) => {
          const ex = getExcessProps(codec.props, rec);
          return ex.length > 0
            ? t.failure(
                i,
                c,
                `Invalid value ${JSON.stringify(i)} supplied to : ${
                  codec.name
                }, excess properties: ${JSON.stringify(ex)}`,
              )
            : codec.validate(i, c);
        },
      ),
    codec.encode,
    codec.props,
  );
  return r as C;
}

export default excess;
