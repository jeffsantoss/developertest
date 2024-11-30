import { APIGatewayProxyEventV2 } from 'aws-lambda'

export interface MiddyApiGatewayEvent<BodyType = any, PathVarType = any, QueryType = any>
    extends Omit<APIGatewayProxyEventV2, 'body' | 'queryStringParameteres' | 'pathParameters'> {
    body: BodyType
    queryStringParameteres: QueryType
    pathParameters: PathVarType
}
