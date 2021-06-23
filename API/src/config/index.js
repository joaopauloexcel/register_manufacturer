const dataBaseMongo = "testeBD";
const userMongo = "user_teste_jp";
const passwordUserMongo = "321joao";

const uri = `mongodb+srv://${userMongo}:${passwordUserMongo}@student.n0zyb.mongodb.net/${dataBaseMongo}?retryWrites=true&w=majority`;

exports.uri = uri;