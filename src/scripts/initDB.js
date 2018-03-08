const DATABASE = {
    IP: "127.0.0.1",
    PORT: "27017",
    NAME: "collab_app",
    COLLECTION: "users",
    DOCUMENTS: [
        {
            firstName: 'bob',
            lastName: 'smith',
            email: 'bob@provider.com',
            password: 'pass1',
            privileges: 'admin',
        },
        {
            firstName: 'ahn',
            lastName: 'fitzgerald',
            email: 'ahn@provider.com',
            password: 'pass2',
            privileges: 'user',
        },
        {
            firstName: 'xi',
            lastName: 'chin',
            email: 'xi@provider.com',
            password: 'pass3',
            privileges: 'hr',
        },
    ],
}


const connection = new Mongo(
    DATABASE.IP,
    DATABASE.PORT
);

const db = connection.getDB(DATABASE.NAME)

if (db) {
    db.createCollection(DATABASE.COLLECTION)
    db[DATABASE.COLLECTION].insertMany(DATABASE.DOCUMENTS)
} else {
    print('false')
}
