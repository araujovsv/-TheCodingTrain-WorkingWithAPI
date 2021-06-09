// eu vou apenas solicitar o pacote
const express = require("express"); 
const Datastore = require("nedb");
const app = express();

app.listen(3000, () => console.log('listening at 3000'))

//eu quero usar criar uma pasta com isso 
app.use(express.static('public')); 
//configuro o meu server para receber arquivos .json
app.use(express.json({limit:'1mb'}));

//crio uma database
const database = new Datastore('database.db');
//crio o arquivo para a database na minha máquina
database.loadDatabase();

//agora vou criar o meu get
app.get('/api', (request, response) => {
    //vou mandar a minha data base pegar todas as informações, e caso não dê, vai retornar um erro
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});


//estou especificando onde eu quero receber essa informação(post), e uma função que vai pegar a informação e mandar de volta
//isso vai retornar várias linhas, mas o que eu quero ver mesmo é o body
app.post('/api', (request, response) => {
    //como os dados que eu estou recebendo estão na função request, eu crio essa variável data
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    //cada vez que eu receber os dados, eu vou armazená-los na minha database
    database.insert(data);
    //estou enviando de volta ao cliente essas informações em json
    response.json(data);
})