// import AWS from "aws-sdk";

// // Configure AWS SDK
// AWS.config.update({
//   region: "us-east-1", // Change to your DynamoDB region
//   accessKeyId: "YOUR_ACCESS_KEY", // Replace with your actual Access Key
//   secretAccessKey: "YOUR_SECRET_KEY", // Replace with your actual Secret Key
// });

// // Create DynamoDB document client
// const dynamoDB = new AWS.DynamoDB.DocumentClient();

// export default dynamoDB;

import AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1", // Change to your AWS region
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:7ceedd98-63c3-4863-a06d-62882a0e5ad0", // Replace with your Identity Pool ID
  }),
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export default dynamoDB;
