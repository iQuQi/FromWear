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

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
		//이번주 작성된 post들 sorting해서 4개뽑기 -> 해당 작성자의 award_weekly +=1
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, goa
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
