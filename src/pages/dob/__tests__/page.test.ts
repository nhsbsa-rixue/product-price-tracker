import { get, post } from "../page";

let req;
let res;

beforeEach(() => {
  req = {};
  res = {
    render: jest.fn(),
    redirectPageTo: jest.fn(),
  };
});

describe("DOB page controllers", () => {
  describe("Get", () => {
    test("should render the dob page the correct template name", async () => {

      // given /when
      await get(req, res);

      // then
      expect(res.render).toHaveBeenCalledTimes(1);
      expect(res.render).toHaveBeenCalledWith("dob");
    });
  });
  
  describe("Post", () => {
    test("should redirect the page to the correct path", async () => {

      // given /when
      await post(req, res);

      // then
      expect(res.redirectPageTo).toHaveBeenCalledTimes(1);
      expect(res.redirectPageTo).toHaveBeenCalledWith("dob");
    });
  });




});