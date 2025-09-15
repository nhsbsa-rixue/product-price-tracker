import Schema from "./schema";

const DOB_PAGE = "dob";
const DOB_PAGE_HEADING = "DOB form validation";

export const Get = async (req, res) => {
  return res.render(DOB_PAGE);
};

export const Post = async (req, res) => {
  return res.redirectPageTo(DOB_PAGE);
};

export const postSchema = Schema;

const dob: Page = {
  path: `/${DOB_PAGE}`,
  heading: DOB_PAGE_HEADING,
  Get,
  Post,
  schema: Schema,
};

export default dob;
