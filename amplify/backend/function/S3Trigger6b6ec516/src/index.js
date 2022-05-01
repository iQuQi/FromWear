const { ConsoleLogger } = require('@aws-amplify/core');
const aws=require('aws-sdk');
const sharp=require('sharp');
// eslint-disable-next-line
exports.handler = async function (event) {
  // console.log('Received S3 event:', JSON.stringify(event, null, 2));
  // Get the object from the event and show its content type
  const bucket = event.Records[0].s3.bucket.name; //eslint-disable-line
  const key = event.Records[0].s3.object.key; //eslint-disable-line
  // console.log(`Bucket: ${bucket}`, `Key: ${key}`);

  let s3= new aws.S3();
  try{
    let image = await s3.getObject({bucket,Key}).promise();
    image = await sharp(image.Body);
    const metadata = await image.metadata();

    if(metadata.width > 1024){
      image = await image.resize({width: 1024}).toBuffer();
      await s3.putObject({Bucket,Key,Body: image}).promise();
    }
  } catch(err){
    console.log("err:",err);
  }
};
