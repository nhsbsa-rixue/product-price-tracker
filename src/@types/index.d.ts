import { RequestHandler, Express, Request } from "express";
import { ValidationChain } from "express-validator";

declare global {

  interface App extends Express { }

  interface Req extends Request {
    users: any;
    products: any;
    watching: any;
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

  interface RestControllers {
    Path: string;
    Get?: Controller;
    List?: Controller;
    Post?: Controller;
    Put?: Controller;
    Delete?: Controller;
    Schema?: ValidationChain[];
    GetSchema?: ValidationChain[];
    DeleteSchema?: ValidationChain[];
    PutSchema?: ValidationChain[];
    PostSchema?: ValidationChain[];
  }
} 