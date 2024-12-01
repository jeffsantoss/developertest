import { APIGatewayProxyEventV2 } from 'aws-lambda'

export interface MiddyApiGatewayEvent<BodyType = any, PathVarType = any, QueryType = any>
    extends Omit<APIGatewayProxyEventV2, 'body' | 'queryStringParameters' | 'pathParameters'> {
    body: BodyType
    queryStringParameters: QueryType
    pathParameters: PathVarType
}
