import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { OneSchema, Table } from 'dynamodb-onetable'
import Dynamo from 'dynamodb-onetable/Dynamo'
import { env } from 'process'
import { v4 } from 'uuid'
import { oneTableDbSchema } from './Entities'

export default class DbConnection {
    table: Table
    client: Dynamo
    region = 'us-east-1'

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    logger = (level: string, message: string, context: any) => {
        if (level == 'trace' || level == 'data') return
        console.log(`${new Date().toLocaleString()}: ${level}: ${message}`)
    }

    constructor(tableName: string, schema: OneSchema) {
        const isLocal = process.env.ENV.toUpperCase() == 'LOCAL'
        const config = {
            convertEmptyValues: true,
            ...(isLocal && {
                endpoint: 'http://0.0.0.0:8000',
                sslEnabled: false,
                region: 'local-env',
                credentials: {
                    accessKeyId: 'mockAccessKey',
                    secretAccessKey: 'mockSecretKey',
                },
            }),
        }
        this.client = new Dynamo({
            client: new DynamoDBClient({
                region: env.AWS_REGION ?? this.region,

                ...config,
            }),
        })

        this.table = new Table({
            nulls: true,
            client: this.client,
            generate: () => v4(),
            name: tableName,
            logger: true,
            timestamps: false,
            schema: schema,
            partial: true,
            // logger: this.logger
        })
    }

    createTableHandler = async () => {
        try {
            const isTableExists = await this.checkTableExists()
            if (!isTableExists) {
                return await this.createTable()
            }
        } catch (err: any) {
            console.error('DBClient init err\n' + err)
            throw new Error(err)
        }
    }

    // eslint-disable-next-line @typescript-eslint/ban-types
    checkTableExists = (): Promise<Boolean> => {
        return this.table.exists()
    }

    createTable = (): Promise<any> => {
        return this.table.createTable()
    }

    getModelFor = (entity: string) => this.table.getModel(entity)

    static init = async (tableName: string, schema: OneSchema): Promise<DbConnection> => {
        const client = new DbConnection(tableName, schema)
        // Descomentar para criar a tablea de acordo com o schema..
        await client.createTableHandler()
        return client
    }
}

export const getDbConnection = async (): Promise<DbConnection> => {
    const dbName = process.env.DYNAMODB_TABLE

    return await DbConnection.init(dbName, oneTableDbSchema)
}

export const transactOnDb = async (transaction: any) => (await getDbConnection()).table.transact('write', transaction)


