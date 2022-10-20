const { expect } = require("chai");

describe("初めてのテストを実行します", function () {
  it("必ず失敗するテスト", async function () {
    expect(false).to.equal(true);
  });
});
