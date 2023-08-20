import { DynamoDBClient} from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand, DynamoDBDocumentClient, DeleteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const TABLE = 'product-inventory';


const dynamodb = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(dynamodb);

export async function getProduct(productId) {
  const command = new GetCommand({
    TableName: TABLE,
    Key: {
      productId: productId
    }
  });

  const response = await docClient.send(command);
  
  return response.Item;
}

export async function getProducts() {
  const command = new ScanCommand({
    TableName: TABLE
  });

  const response = await docClient.send(command);
  
  return response.Items;
}

export async function saveProduct(requestBody) {
  return await save(requestBody);
}

export async function save(requestBody) {
  const command = new PutCommand({
    TableName: TABLE,
      Item: requestBody,
  });

  return await docClient.send(command);
}

export async function modifyProduct(requestBody) {
    return await save(requestBody);
}

export async function deleteProduct(productId) {
  const command = new DeleteCommand({
    TableName: TABLE,
    Key: {
      productId: productId,
    },
  });

  const response = await docClient.send(command);
  
  return response;
}