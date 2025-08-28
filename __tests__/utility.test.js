import { getProductStock, findProductInCart } from "../app/_utility/product";

describe("getProductStock tests", () => {
  let product;
  let cart;

  beforeEach(() => {
    product = {
      id: "1",
      stock_quantity: 5,
    };

    cart = [
      {
        product: {
          id: "1",
        },
        quantity: 5,
      },
      {
        product: {
          id: "2",
        },
        quantity: 1,
      },
    ];
  });

  test("stock is 0", () => {
    expect(getProductStock(product, cart)).toBe(0);
  });

  test("stock is 5", () => {
    cart = [];
    expect(getProductStock(product, cart)).toBe(5);
  });
});

describe("findProductInCart tests", () => {
  let product;
  let cart;

  beforeAll(() => {
    product = {
      id: "1",
    };

    cart = [
      {
        product: {
          id: "1",
        },
      },
      {
        product: {
          id: "2",
        },
        option: "red"
      },
    ];
  });

  test("product is in cart", () => {
    const productFound = findProductInCart(product, cart);
    expect(productFound.product.id).toBe(product.id);
  });

  test("product is in cart with matching option", () => {
    // add option to the second product
    product = { id: "2" };

    const productFound = findProductInCart(product, cart, "red");
    expect(productFound.product.id).toBe("2");
  });
});
