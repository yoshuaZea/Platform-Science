const { v4: uuidv4 } = require('uuid')

class Street {
    constructor(name){
        this.id = uuidv4()
        this.name = name
        this.driver = null
        this.hasDriver = false
        this.suitabilityScore = null
    }
}

module.exports = Street