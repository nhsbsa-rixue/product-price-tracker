import { Get, Post } from "../page";

let req: Req;
let res: Res;

beforeEach(() => {
  req = {} as Req;
  res = {
    render: jest.fn(),
    redirectPageTo: jest.fn(),
  } as Res;
});

describe("DOB page controllers", () => {
  describe("Get", () => {
    test("should render the dob page the correct template name", async () => {

      // given /when
      await Get(req, res);

      // then
      expect(res.render).toHaveBeenCalledTimes(1);
      expect(res.render).toHaveBeenCalledWith("dob");
    });
  });

  describe("Post", () => {
    test("should redirect the page to the correct path", async () => {

      // given /when
      await Post(req, res);

      // then
      expect(res.redirectPageTo).toHaveBeenCalledTimes(1);
      expect(res.redirectPageTo).toHaveBeenCalledWith("dob");
    });
  });




});