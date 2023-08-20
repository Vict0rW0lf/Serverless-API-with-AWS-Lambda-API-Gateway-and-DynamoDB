import { getProduct, getProducts, saveProduct, modifyProduct, deleteProduct } from './service.mjs';
import { buildResponse } from './util.mjs';

const healthPath = '/health';
const productPath = '/product';
const productsPath = '/products';



export const handler = async (event, context) => {
  console.log('Request event: ', event);
  console.log('Context:', context);
  let response, result;
  switch(true) {
    case event.httpMethod === 'GET' && event.path === healthPath:
      response = buildResponse(200);
      break;
    case event.httpMethod === 'GET' && event.resource === '/product/{productId}':
      result = await getProduct(event.pathParameters.productId);
      
      if (result) {
        buildResponse(200, result);
        break;
      } 
      
      response = buildResponse(404, result);
      break;
    case event.httpMethod === 'GET' && event.path === productsPath:
      result = await getProducts();
      
      response = buildResponse(200, result);
      break;
    case event.httpMethod === 'POST' && event.path === productPath:
      result = await saveProduct(JSON.parse(event.body));
      
      response = buildResponse(201, result);
      break;
    case event.httpMethod === 'PATCH' && event.path === productPath:
      result = await modifyProduct(JSON.parse(event.body));
      
      response = buildResponse(200, result);
      break;
    case event.httpMethod === 'DELETE' && event.path === productPath:
      result = await deleteProduct(JSON.parse(event.body).productId);
      
      response = buildResponse(200, result);
      break;
    default:
      response = buildResponse(404, '404 Not Found');
  }
  return response;
};