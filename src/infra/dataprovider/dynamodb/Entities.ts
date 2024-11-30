
export const oneTableDbSchema = {
    version: '0.1',
    indexes: {
        primary: { hash: 'pk', sort: 'sk' },
        gs1: { hash: 'gs1pk', sort: 'gs1sk', project: 'keys', follow: false },
    },
    models: {
        User: {
            pk: { type: String, value: '${_type}:' },
            sk: { type: String, value: '${_type}:${createdAt}' },
            id: { type: String, generate: 'ulid' },
            name: { type: String, require: true },
            email: { type: String, require: true },
            hashedPassword: { type: String, require: true },
            role: { type: String, require: true },
            createdAt: { type: Number, require: true },
            updatedAt: { type: Number, require: false },            
            gs1pk: { type: String, value: '${_type}:${id}' },
            gs1sk: { type: String, value: '${_type}:${createdAt}' },
        }
    },
}

export const oneTableEntities = {
    User: 'User'
}
