import { RequestHandler, Express, Request } from "express";
import { ValidationChain } from "express-validator";

declare global {

  interface App extends Express { }

  interface Req extends Request {
    users: any;
    products: any;
    watching: any;
    contextPath: string;
    session: any;
    t: any;
  }

  interface Res extends Response {
    render: any;
    redirectPageTo: any;
  }

  interface EmailTemplate {
    to: string;
    subject: string;
    body: string;
  }

  type AlertType = "day" | "night";


  interface Controller extends RequestHandler {
    (req: Req, res: any): any;
    (req: Req, res: any, next: any): any;
  }

  interface Page {
    path: string;
    heading?: string;
    schema?: ValidationChain[];
    Get: Controller;
    Post: Controller;
  }

  interface RestControllers {
    path: string;
    Get?: Controller;
    List?: Controller;
    Post?: Controller;
    Put?: Controller;
    Delete?: Controller;
    schema?: ValidationChain[];
    getSchema?: ValidationChain[];
    deleteSchema?: ValidationChain[];
    putSchema?: ValidationChain[];
    postSchema?: ValidationChain[];
  }
} 