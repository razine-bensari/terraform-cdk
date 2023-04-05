// Copyright (c) HashiCorp, Inc
// SPDX-License-Identifier: MPL-2.0
import * as execa from "execa";
import * as hasAnsi from "has-ansi";
import { onPosix, TestDriver } from "../../test-helper";

describe("no-color option for cdktf deploy, diff, destroy", () => {
  let driver: TestDriver;
  beforeAll(async () => {
    driver = new TestDriver(__dirname, {
      JSII_SILENCE_WARNING_DEPRECATED_NODE_VERSION: "true",
    }); // this warning triggers our hasAnsi check
    await driver.setupJavaProject();
  }, 500_000);

  onPosix("contains no color formatting in cdktf deploy", async () => {
    const result = await execa(
      "cdktf",
      ["deploy", "--auto-approve", "--no-color"],
      {
        env: driver.env,
        cwd: driver.workingDirectory,
      }
    );
    expect(hasAnsi(result.stdout)).toBe(false);
  });
  onPosix("contains no color formatting in cdktf diff", async () => {
    const result = await execa("cdktf", ["diff", "--no-color"], {
      env: driver.env,
      cwd: driver.workingDirectory,
    });
    expect(hasAnsi(result.stdout)).toBe(false);
  });
  onPosix("contains no color formatting in cdktf destroy", async () => {
    const result = await execa(
      "cdktf",
      ["destroy", "--auto-approve", "--no-color"],
      {
        env: driver.env,
        cwd: driver.workingDirectory,
      }
    );
    expect(hasAnsi(result.stdout)).toBe(false);
  });
});
