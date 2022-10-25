const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the non-zero literal when given an object without partitionKey as input", () => {
    const deterministicKey = deterministicPartitionKey({ id: "123456" });
    expect(deterministicKey).not.toBe("0");
  });
  it("Returns the partitionKey when given an object with partitionKey as input", () => {
    const deterministicKey = deterministicPartitionKey({ id: "123456", partitionKey: "15f8f00abbc626b372570af8318c4ae61e617cf33f2d3fc471c9a32d788a1794bef4c97ac7d7f324b4234562a2f829ade6a07a69a340275d4df8e1e9c3cf5901" });
    expect(deterministicKey).toBe("15f8f00abbc626b372570af8318c4ae61e617cf33f2d3fc471c9a32d788a1794bef4c97ac7d7f324b4234562a2f829ade6a07a69a340275d4df8e1e9c3cf5901");
  });
});