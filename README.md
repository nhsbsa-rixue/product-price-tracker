# Price-tracker

## About the product price tracker

A personal assignment to create a RESTful web service that allows users to enter a product URL and set a price drop alert

## Quick start

### Building the application

1. Install the dependencies:

  ```
  npm install
  ```

2. Build the app

  ```
  npm run build
  ```

### Running the application

There are two ways to run this applications locally

1. Run as a native express application

```
npm run dev
```

Then the application can be invoked though those RESTful endpoints: product, users, watching for alerts  

* `http://localhost:8000/products`
* `http://localhost:8000/users`
* `http://localhost:8000/watching`

2. Though [LocalStack](https://www.localstack.cloud/)

   2.1 Install tflocal

   ```
   pip install terraform-local
   ```
  
   2.2 tflocal init  

   ```
   npm run tflocal-init
   ```

   2.3 Deploy the application to the localstack

   ```
   npm run tflocal-apply
   ```

   2.4 Invoke the endpoint provided by the localstack. e.g.

   ```
   http://kvxzjjcr8pzxw79m2fkbhcuai3godrju.lambda-url.eu-west-2.localhost.localstack.cloud:4566/products
   ```

  Instead of `http://localhost:8000/skills`

## Libraries

This project use the library `@codegenie/serverless-express` as the
**Lambda handler wrapper**, to run an express web application in the AWS Lambda environment.

## Contributions

We operate a [code of conduct](CODE_OF_CONDUCT.md) for all contributors.

See our [contributing guide](CONTRIBUTING.md) for guidance on how to contribute.

## License

Released under the [Apache 2 license](LICENCE.txt).
