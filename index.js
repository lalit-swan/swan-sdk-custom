import Swan from '@swan-admin/swan-ai-measurements';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.SWAN_API_KEY);
const swan = new Swan(process.env.SWAN_API_KEY, true);

const timestamp = Date.now();
const testStoreUrl = `https://swantest-store-${timestamp}.com`;
const customerEmail = `john.doe-${timestamp}@example.com`;
const email1 = `manager-${timestamp}@example.com`;
const email2 = `'support-${timestamp}@example.com`;

const customerCreated = await swan.custom.createCustomer({
  name: 'John Doe',
  storeUrl: testStoreUrl,
  email: customerEmail,
  location: 'IE',
  emailsTier_1: email1,
  emailsTier_2: email2,
});
console.log('Customer Created:', customerCreated.data);

const customerConfig = await swan.custom.getCustomCustomerConfig(testStoreUrl);
console.log('Customer Config:', customerConfig.data);
