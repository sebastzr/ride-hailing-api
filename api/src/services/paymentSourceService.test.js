const { createPaymentSource } = require("./paymentSourceService");
const axios = require("axios");
const PaymentSource = require("../models/PaymentSource");

jest.mock("axios");
jest.mock("../models/PaymentSource.js", () => {
  return {
    create: jest.fn(),
  };
});

describe("createPaymentSource", () => {
  it("should create a payment source", async () => {
    const data = {
      userID: "123",
      token: "tok_123",
      userEmail: "test@example.com",
      type: "card",
      acceptanceToken: "accept_123",
    };

    const response = {
      data: {
        data: {
          id: "payment_source_id",
        },
      },
    };

    axios.post.mockResolvedValue(response);

    const expectedPaymentSource = {
      user: data.userID,
      type: data.type,
      paymentSourceId: response.data.data.id,
    };
    PaymentSource.create.mockReturnValue(expectedPaymentSource);

    const paymentSource = await createPaymentSource(data);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(PaymentSource.create).toHaveBeenCalledTimes(1);
    expect(paymentSource).toEqual(expectedPaymentSource);
  });
});
