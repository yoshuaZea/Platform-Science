const { v4: uuidv4 } = require('uuid')

class Driver {
    constructor(name){
        this.id = uuidv4()
        this.name = name
        this.street = null
        this.hasShipmentDestination = false
        this.suitabilityScore = null
    }

}

module.exports = Driver