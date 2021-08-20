import {MongoClient} from 'mongodb'
async function handler(req,res){
    if(req.method === 'POST'){
        const data = req.body;
        console.log(data);
        // const{title,img,address} = data
        const client = await MongoClient.connect('mongodb+srv://root:root123@cluster0.4wkwj.mongodb.net/meetps?retryWrites=true&w=majority')
        const db = client.db();
        const meeupCollection = db.collection("meetups");
        try{

            const result = await meeupCollection.insertOne(data)    
            console.log(result)
            res.status(201).json({message: 'meet up inserted!'})
        }catch(err){
            console.log(err)
        }
        client.close();
        
    }
}

export default handler;