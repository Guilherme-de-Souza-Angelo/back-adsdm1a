const{ MongoClient, ObjectId} = require('mongodb')

const url = 'mongodb+srv://GuilhermedeSouzaAngelo:flavinhodopneugg@cluster0.fwbwuzr.mongodb.net/'
const client = new MongoClient(url);

async function conectar() {
    try{
        await client.connect();
    }catch (error){
        console.log("Deu ruim!", error);
    }
}

async function inserir(produto) {
    const db = client.db('loja');
    return await db.collection('produtos').insertOne(produto);
}

async function listar(){
    const db = client.db("loja");
    return await db.collection("produtos").find({}).toArray();
}

async function atualizar(id, produto){
    const db = client.db('loja');
    return await db.collection('produtos').updateOne({_id: new ObjectId(id)}, {$set: produto});
}

async function remover(id) {
    const db = client.db('loja');
    return await db.collection('produtos').deleteOne({_id: new ObjectId(id) });
}

async function main() {
    await conectar();
    let result = await inserir({nome: "banana", preco: 12.0});
    console.log('Produto inserido', result)

    result = await listar();
    console.log("Listar de produtos", result);

    result = await atualizar("662a56c2748485925ed46fe3", {nome: "maça", preco: 22.54});
    console.log("produto atualizado", result);

    result = await remover('662a598a2bd18c6059990ba9');
    console.log("Produto removido", result);

    await client.close();
}

main();