/* Amplify Params - DO NOT EDIT
	API_FROMWEAR_BOARDTABLE_ARN
	API_FROMWEAR_BOARDTABLE_NAME
	API_FROMWEAR_GRAPHQLAPIENDPOINTOUTPUT
	API_FROMWEAR_GRAPHQLAPIIDOUTPUT
	API_FROMWEAR_GRAPHQLAPIKEYOUTPUT
	API_FROMWEAR_POSTTABLE_ARN
	API_FROMWEAR_POSTTABLE_NAME
	API_FROMWEAR_STYLETAGTABLE_ARN
	API_FROMWEAR_STYLETAGTABLE_NAME
	API_FROMWEAR_USERTABLE_ARN
	API_FROMWEAR_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const doc = require('dynamodb-doc'); 
const dynamo = new doc.DynamoDB();

exports.handler =(event)=> {
    // TODO implement
    console.log(event);
   /* var item = {
           "username":username,
           "email":  email,     
     };

     var params = {
         TableName:tableName, 
         Item: item
     };

     console.log(params);
     db.putItem(params, function(err,data){
         if (err) console.log(err);
         else console.log(data);
     });*/
    const response = {
		//오늘의 태그 넘버 0으로 초기화 + post_list length가 0 이면 그냥 삭제
		//오늘 작성된 post들 sorting해서 5개뽑기 -> 해당 작성자의 award_today +=1
        statusCode: 200,
    //  Uncomment below to enable CORS requeysts
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify(event),
    };
    return response;
};
