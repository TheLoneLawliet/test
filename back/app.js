const express = require('express');
const mongoose = require('mongoose');

const mdbServe = '****'


const Product = require('./models/product');

const app = express();
app.use(express.json());
//////////////


mongoose.connect(mdbServe).then(
	()=>{
		console.log('Connected to MDB Atlas');
	}).catch((error)=>{
		console.log('Failed to connect to MDB Atlas')
		console.error(error);
	});



app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
  });


//////////

app.get('/api/products', (req, res, next)=>{
	Product.find().then(
		(products)=>{
			res.status(200).json({products});
			//console.log('got successfully')
		}
	).catch(
		(error)=>{
			res.status(400).json({
				error:error
			})
		}
	);
});

app.get('/api/products/:id', (req, res, next)=>{
	Product.findOne({_id: req.params.id})
	.then(
		(product)=>{
			res.status(200).json({product});
		}
	).catch(
		(error)=>{
			console.log("failed to get id ")
			res.status(400).json({
				error: error
			});
		}
	);
});



app.post('/api/products', (req, res, next)=>{
	const product = new Product({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		inStock: req.body.inStock

	});
	product.save().then(
		res.status(201).json({product})
	).catch((error)=>{
		res.status(400).json({
			error: error
		})
	})		
});



app.put('/api/products/:id', (req, res, next)=>{
	const product = new Product({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		inStock: req.body.inStock
	})

	Product.updateOne({_id: req.params.id}, product).then(
		res.status(200).json({message: 'Modified!'})
	).catch((error)=>{
		res.status(400).json({error: error})
	})
});




/*
app.put('/api/products/:id', (req, res, next)=>{
	const product = new Product({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		inStock: req.body.inStock

	});
	
	Product.updateOne({_id: req.params.id}, product)
	.then(res.status(201).json({ message: 'Modified!' }))
	.catch((error)=>{
		res.status(400).json({
			error: error
		})
	})
});

*/

app.delete('/api/products/:id', (req, res, next)=>{
	Product.deleteOne({_id: req.params.id}).then(
		()=>{
			res.status(200).json({message: 'Deleted!'})
		}
	).catch((error)=>{
		res.status(400).json({error:error})
	});
	
});

module.exports = app;
