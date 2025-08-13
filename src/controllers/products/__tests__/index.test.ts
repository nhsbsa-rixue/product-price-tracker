import { StatusCodes } from 'http-status-codes';
import { productController } from '../index';

let mockRequest;
let mockResponse;
const mockUuid = "123e4567-e89b-12d3-a456-426614174000";
const getMockProducts = () => [{ id: mockUuid, name: 'productName', price: 100 }];

jest.mock("uuid", () => ({
  v4: () => mockUuid,
}));

beforeEach(() => {
  mockRequest = {
    products: getMockProducts(),
    params: {},
    body: {},
  };
  mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
});

describe('product controllers', () => {
  test('should return a list of products', async () => {
    // given /when
    await productController.List!(mockRequest, mockResponse);

    // then
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith(getMockProducts());
  });

  test('should return a single product', async () => {
    // given
    mockRequest.params.id = mockUuid;

    // when
    await productController.Get!(mockRequest, mockResponse);

    // then
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith(getMockProducts()[0]);
  });


  test('should create a new product', async () => {
    // given
    mockRequest.body = {
      name: 'productName',
      price: 100,
    };

    // when
    await productController.Post!(mockRequest, mockResponse);

    // then
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(mockResponse.json).toHaveBeenCalledWith({
      id: mockUuid,
      name: 'productName',
      price: 100,
    });
  });


  test('should update an existing product', async () => {
    // given
    mockRequest.params.id = mockUuid;
    mockRequest.body = {
      name: 'productName',
      price: 101,
    };

    // when
    await productController.Put!(mockRequest, mockResponse);

    // then
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.json).toHaveBeenCalledWith({
      id: mockUuid,
      name: 'productName',
      price: 101,
    });
  });

  test('should delete a single product', async () => {
    // given
    mockRequest.params.id = mockUuid;

    // when
    await productController.Delete!(mockRequest, mockResponse);

    // then
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
    expect(mockResponse.json).toHaveBeenCalledWith({});
  });
});