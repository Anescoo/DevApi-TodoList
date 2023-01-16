import mongoose from 'mongoose'

const { Schema } = mongoose

const exempleSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  colors: {
    type: [String],
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

const Exemple = mongoose.model('Exemple', exempleSchema)

// Exemple.create({
//   name: 'TOTO',
//   description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
//   colors: ['black', 'red', 'white'],
//   price: 1000
// })

const findAll = async () => {
  const exemples = await Exemple.find({})
  console.log('FIND ALL ===================', exemples);
}

const findById = async () => {
  const exemple = await Exemple.findById('637219adbc4a961c5d61bfbc')
  console.log('FIND BY ID ===================', exemple);
}

const updateById = async () => {
  // Méthode 1
  const exemple = await Exemple.findByIdAndUpdate(
    '637219adbc4a961c5d61bfbc',
    { name: "Nouvelle modification" },
    { runValidators: true })
  console.log('UPDATE BY ID ===================', exemple);
  // // Méthode 2
  // const exemple = await Exemple.findById('637219adbc4a961c5d61bfbc')
  // exemple.name = "Modification"
  // exemple.save()
  //
  // // Méthode 3
  // const exemple = await Exemple.findById('637219adbc4a961c5d61bfbc')
  // exemple.set({
  //   name: "Modifié avec le set"
  // })
  // exemple.save()
  findAll()
}

const deleteById = async () => {
  const exemple = await Exemple.findByIdAndDelete('637219adbc4a961c5d61bfbc')
}

// findAll()
// findById()
// updateById()
// deleteById()

export default Exemple
