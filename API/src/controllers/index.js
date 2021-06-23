const { ObjectId } = require('mongodb');

exports.list = (req, res) => {

    var id = req.params.id

    if (id) 
        db.collection('manufacturer').find(ObjectId(id)).toArray((err, results) => {
            if (err) return res.send(err)
            res.status(200).send({data:results})
        })

    else 
	    db.collection('manufacturer').find().toArray((err, results) => {

            if (err) return console.log(err)
            res.status(200).send({ data: results })

        })
}

exports.add = (req, res) => {//cadastro de usuários
	db.collection('manufacturer').save(req.body, (err, result) => {

        if (err) return console.log(err)
        console.log('Salvo no Banco de Dados')
        res.status(200).send({message:"Ok"})

    })
}

exports.update = (req, res) => {//cadastro de usuários
	var id = req.params.id

	db.collection('manufacturer').updateOne({_id: ObjectId(id)}, {
		$set: {
			name: req.body.name,
			corporateName: req.body.corporateName,
			cnpj: req.body.cnpj,
			segment: req.body.segment,
			address: req.body.address,
			phone: req.body.phone,
			email: req.body.email
		}
	}, (err, result) => {
		if (err) return res.send(err)
		console.log("Atualizado o Banco de Dados!")
		res.status(200).send({message:'Ok'})
	});

}

exports.delete = (req, res) => {

    var id = req.params.id
	
	db.collection('manufacturer').deleteOne({_id: ObjectId(id)}, (err, results) => {
		if (err) return res.status(500).send(err)
		console.log("Removido do Banco de Dados!")
		res.status(200).send({message:'Ok'})
	});

}