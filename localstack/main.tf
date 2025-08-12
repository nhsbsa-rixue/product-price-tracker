# resource "aws_iam_role" "lambda_execution_role" {
#   name               = "lambda-execution-role"
#   assume_role_policy = jsonencode({
#     Version   = "2012-10-17",
#     Statement = [
#       {
#         Effect    = "Allow",
#         Principal = {
#           Service = "lambda.amazonaws.com"
#         },
#         Action    = "sts:AssumeRole"
#       }
#     ]
#   })
# }

# resource "aws_iam_role_policy_attachment" "lambda_logs" {
#   role       = aws_iam_role.lambda_execution_role.name
#   policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
# }
data "archive_file" "lambda" {
  type        = "zip"
  source_dir  = "../dist"
  output_path = "employee-skills-tracker-lambda.zip"
}

resource "aws_lambda_function" "lambda_function" {
  filename         = "employee-skills-tracker-lambda.zip"
  function_name    = "employee-skills-tracker-lambda"
  handler          = "./src/index.handler"
  runtime          = "nodejs20.x"
  role             = "arn:aws:iam::000000000000:role/irrelevant"
  source_code_hash = data.archive_file.lambda.output_base64sha256

  environment {
    variables = {
      "PORT" : 8000,
      "APP_NAME" : "employee-skills-tracker-lambda"
    }
  }

}

resource "aws_lambda_function_url" "lambda_function_url" {
  function_name      = aws_lambda_function.lambda_function.function_name
  authorization_type = "NONE"
}

output "lambda_function_url" {
  value = aws_lambda_function_url.lambda_function_url
}

output "function_arn" {
  value = aws_lambda_function.lambda_function.arn
}
