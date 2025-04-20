import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1", 
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:7ceedd98-63c3-4863-a06d-62882a0e5ad0",
  }),
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export default dynamoDB;
