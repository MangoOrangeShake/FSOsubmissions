const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('To view collection: node mongo.js <password>');
    console.log('To add to the collection: node mongo.js <password> <Name> <Number>')
    process.exit(1)
}

if (process.argv.length > 3 && process.argv.length !== 5) {
    console.log('To add to the collection, provide exactly 2 extra parameters: <name> and <number>')
    process.exit(1)
}

const password = process.argv[2]
const nameInput = process.argv[3]
const numberInput = process.argv[4]

const url =
    `mongodb+srv://fso-mang0:${password}@fsocluster.hdblm.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: nameInput,
    number: numberInput,
})

if (nameInput && numberInput) {
    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
} else {
    Person.find({}).then(result => {
        console.log('phonebook: ');
        result.forEach(note => {
            console.log(note.name, note.number)
        })
        mongoose.connection.close()
    })
}