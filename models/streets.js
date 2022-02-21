const fs = require('fs')
const path = require('path')

const Street = require('./street')

class Streets {
    constructor(){
        this._list = {}
    }

    get listStreets(){
        const list = []

        Object.keys(this._list).forEach(key => {
            const street = this._list[key]
            list.push(street)
        })

        return list
    }

    // Create a new driver according to the model
    create(name = ''){
        // Evaluate if it is a file by the slashes
        if(name.includes('/') || name.includes('\\')){
            this.createFromAFile(name)
        } else { // Create a single driver
            this.createSingle(name)
        }
    }

    // Create many record from one file
    createFromAFile(string){
        // Create a route
        let route = path.resolve(string.trim().slice(2))

        // Read input file
        let file = fs.readFileSync(route, { encoding: 'utf-8'})

        // Replace new line with '' and convert to array
        let arrayFile = file.replace(/\r\n/g, '').split(',')

        if(arrayFile.length > 0){
            arrayFile.forEach(name => {
                // Validate if length grater than 0 to avoid add empty values
                if(name.length > 0){
                    this.createSingle(name)
                }
            })
        }

        console.log(arrayFile)
        

        console.log('The file was read, and the data was stored in memory')
    }

    // Create a single record
    createSingle(name){

        // First capital letter
        const newName = name.charAt(0).toLocaleUpperCase() + name.slice(1).toLocaleLowerCase()

        // Instance of a driver
        const driver = new Street(newName)

        // Store in memory
        this._list[driver.id] = driver
    }

    // Delete a street from memory
    delete(id){
        if(this._list[id]){
            delete this._list[id]
        }
    }

    // Show all streets in memory
    showAll(){
        this.listStreets.forEach((street, index) => {
            const { name, driver, hasDriver, suitabilityScore  } = street
            const number = `${index + 1}`.yellow
            const driverName = (hasDriver) ? `${driver}`.green : 'Pending'.red
            const ss = suitabilityScore ? ` -> SS: ${suitabilityScore}`.bgMagenta : ''
            console.log(`${number}. ${name}`)
            console.log(`-> Driver: ${driverName} ${ss} \n`)
        })
    }
}

module.exports = Streets
