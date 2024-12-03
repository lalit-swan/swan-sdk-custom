import Swan from '@swan-admin/swan-ai-measurements';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { readFile } from 'fs/promises';
import { File } from 'buffer';

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

const scanId = crypto.randomUUID();
const arrayMetaData = [
  { gender: 'male' },
  { focal_length: '23.57' },
  { height: '180' },
  { customer_store_url: testStoreUrl },
  { clothes_fit: '0' },
  { scan_type: 'clothing_custom_scan' },
  { callback_url: process.env.WEBHOOK_URL },
];
console.log(`Uploading video file with scanId: ${scanId}`, arrayMetaData);

const video = await readFile('./videos/video.webm');
const videoFile = new File([video], `${scanId}.webm`, {
  type: 'video/webm',
});
const fileData = {
  file: videoFile,
  arrayMetaData,
  scanId: scanId,
  email: 'user@example.com',
};

const uploaded = await swan.fileUpload.uploadFile(fileData);
console.log(uploaded.message);

