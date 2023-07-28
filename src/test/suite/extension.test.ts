import { expect } from "chai";
import { describe, it } from "mocha";
import * as vscode from "vscode";

import { activate, deactivate } from "../../amo/extension";

describe("extension.ts", () => {
  const context = {
    subscriptions: [] as vscode.Disposable[],
  } as vscode.ExtensionContext;

  it("should activate and register commands and have 3 subscriptions", async () => {
    await activate(context);
    const commands = await vscode.commands.getCommands(true);
    expect(commands).to.include.members(["assay.get"]);
    expect(commands).to.include.members(["assay.welcome"]);
    expect(commands).to.include.members(["assay.review"]);
    expect(context.subscriptions.length).to.equal(2);
  });

  it("should deactivate and return undefined", async () => {
    // placeholder due to blank deactivate function
    const result = deactivate();
    expect(result).to.be.undefined;
  });
});