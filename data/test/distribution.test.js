import { test } from "uvu";
import * as assert from "uvu/assert";

import { distribution, sumDistance } from "../distribution.mjs";

test("sumDistance", () => {
  assert.is(sumDistance([0, 2, 4]), 4);
  assert.is(sumDistance([0, 4]), 4);
  assert.is(sumDistance([0, 5]), 5);
  assert.is(sumDistance([0, 4, 5]), 5);
});

test("distribution > calculates correctly", () => {
  assert.is(distribution([0], 5), 0);
  assert.is(distribution([0, 2, 4], 5), 0.48);
});

test("distribution > values relate", () => {
  const a = distribution([0], 5);
  const b = distribution([0, 1], 5);
  const c = distribution([0, 5], 6);
  const d = distribution([0, 4], 5);
  const e = distribution([0, 2, 4], 5);

  assert.is(a < b, true);
  assert.is(b < c, true);
  assert.is(c < d, true);
  assert.is(d < e, true);
});

test.run();
