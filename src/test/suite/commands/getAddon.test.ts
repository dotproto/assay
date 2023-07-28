import { expect } from "chai";
import { describe, it, afterEach } from "mocha";
import * as sinon from "sinon";
import * as vscode from "vscode";

import { getInput, getWorkspaceFolder } from "../../../amo/commands/getAddon";

describe("getAddon.ts", async () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("getInput()", () => {
    it("should return the input if provided", async () => {
      const stub = sinon.stub(vscode.window, "showInputBox");
      stub.onFirstCall().resolves("test");
      const result = await getInput();
      expect(result).to.equal("test");
    });

    it("should raise an error if no input is provided", async () => {
      const stub = sinon.stub(vscode.window, "showInputBox");
      stub.onFirstCall().resolves(undefined);
      try {
        await getInput();
      } catch (error) {
        expect(error).to.be.an("error");
      }
    });
  });

  describe("getWorkspaceFolder()", () => {
    it("should return the workspace folder if found", async () => {
      sinon.stub(vscode.workspace, "workspaceFolders").get(() => [
        {
          uri: {
            fsPath: "test",
          },
        },
      ]);
      const result = getWorkspaceFolder();
      expect(result).to.equal("test");
    });

    it("should raise an error if no workspace folder is found", async () => {
      const stub = sinon.stub(vscode.workspace, "workspaceFolders");
      stub.onFirstCall().returns(undefined);
      try {
        getWorkspaceFolder();
      } catch (error) {
        expect(error).to.be.an("error");
      }
    });
  });
});