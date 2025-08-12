import { validator } from '../index';
import * as expressValidator from "express-validator";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

jest.mock("express-validator");

const mockedValidationResult = expressValidator.validationResult as unknown as jest.Mock;

let mockRequest;
let mockResponse;
let nextFunction;

describe('validator middleware', () => {

  beforeEach(() => {
    mockRequest = jest.fn();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  test('should call next() when there are no validation errors', () => {
    // given
    mockedValidationResult.mockReturnValue({
      array: () => [],
    });

    // when
    validator(mockRequest, mockResponse, nextFunction);

    // then
    expect(nextFunction).toHaveBeenCalled();
  });

  test('should return a BAD_REQUEST response when there are validation errors', () => {
    // given
    const errors = [{ path: 'email', msg: 'Invalid email' }];
    mockedValidationResult.mockReturnValue({
      array: () => errors,
    });

    // when
    validator(mockRequest, mockResponse, nextFunction);

    // then
    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: StatusCodes.BAD_REQUEST,
      message: ReasonPhrases.BAD_REQUEST,
      timestamp: expect.any(String),
      fieldErrors: errors.map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  });
});