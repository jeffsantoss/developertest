import { Entity } from "dynamodb-onetable";
import { injectable } from "inversify";
import { oneTableDbSchema, oneTableEntities } from "../Entities";
import { User, UserRole } from "@domain/User";
import { Builder } from "builder-pattern";
import { EnumHelper } from "@infra/helper/EnumHelper";
import { getDynamoDBConnection } from "../DynamoDBConnection";

export type UserEntity = Entity<typeof oneTableDbSchema.models.User>

@injectable()
export class UserRepository {

    public async getById(id: string): Promise<User> {
        const connection = await this.getConnection();
        const user = await connection.get({ id }, { index: 'gs1', follow: true })
        return this.toDomain(user)
    }

    public async getByEmail(email: string): Promise<User> {
        const connection = await this.getConnection();
        const user = await connection.get({ email }, { index: 'gs2', follow: true })
        return this.toDomain(user)
    }

    public async create(entity: UserEntity): Promise<User> {
        const connection = await this.getConnection();
        const user = await connection.create({ ...entity, createdAt: Date.now() })
        return this.toDomain(user)
    }

    public async findByAnyField(user: User): Promise<User[]> {
        const connection = await this.getConnection();

        const whereClause = Object.keys(user)
            .map(key => user[key] != null ? `(\${${key}} = {${user[key]}})` : '')
            .filter(condition => condition !== '')
            .join(' AND ');

        const filtered = await connection.find({}, { where: whereClause })

        return filtered.map(userEntity => this.toDomain(userEntity))
    }

    public async update(entity: UserEntity): Promise<User> {
        const connection = await this.getConnection();
        const user = await connection.update({ ...entity, updatedAt: Date.now() })
        return this.toDomain(user)
    }

    private async getConnection() {
        return (await getDynamoDBConnection()).getModelFor(oneTableEntities.User);
    }

    private toDomain(entity: UserEntity): User {
        if (!entity) return

        return Builder(User)
            .id(entity?.id)
            .name(entity?.name)
            .createdAt(entity?.createdAt)
            .updatedAt(entity?.updatedAt)
            .email(entity?.email)
            .role(EnumHelper.toEnumValue(UserRole, entity.role))
            .hashedPassword(entity?.hashedPassword)
            .build()
    }
}
