const fs = require('fs')
const path = require('path')

const Driver = require('./driver')

class Drivers {
    constructor(){
        this._list = {}
    }

    get listDrivers(){
        const list = []

        Object.keys(this._list).forEach(key => {
            const driver = this._list[key]
            list.push(driver)
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
        const driver = new Driver(newName)

        // Store in memory
        this._list[driver.id] = driver
    }

    // Delete a driver from memory
    delete(id){
        if(this._list[id]){
            delete this._list[id]
        }
    }

    // Show all drivers in memory
    showAll(){
        this.listDrivers.forEach((driver, index) => {
            const { name, street, hasShipmentDestination, suitabilityScore  } = driver
            const number = `${index + 1}`.yellow
            const shipment = (hasShipmentDestination) ? `${street}`.green : 'Pending'.red
            const ss = suitabilityScore ? ` -> SS: ${suitabilityScore}`.bgMagenta : ''
            console.log(`${number}. ${name}`)
            console.log(`-> Shipment: ${shipment} ${ss} \n`)
        })
    }
}

module.exports = Drivers
