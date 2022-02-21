class Processes {

    constructor(){
        this.suitabilityScore = 0
    }

    // Method to calculate suitability score
    calculateSS(streets, drivers){

        // Restore every calculate
        this.suitabilityScore = 0

        // Check the length of each parameter and both have the same length
        if(streets.length < 0 || drivers.length < 0 || streets.length !== drivers.length){
            console.log('You need to add another street or driver to matchmaking the assigment')
            return   
        }

        // Sort by length of each value inside array (to maximizing the total suitability)
        streets = this.sortValues(streets, 'desc')
        drivers = this.sortValues(drivers, 'desc')

        // Assigment
        streets.forEach((street, index) => {
            // Driver to street
            street.driver = drivers[index].name
            street.hasDriver = true

            // Street to driver
            drivers[index].street = street.name
            drivers[index].hasShipmentDestination = true

            this.algorithm(street, drivers[index])
        })
        
        // Print the assigment between drivers and streets
        drivers.forEach((driver, index) => {

            let name = `${driver.name}`.cyan
            let street = `${streets[index].name}`.green
            let ss = `${driver.suitabilityScore}`.yellow

            console.log(`Driver ${name} to ${street} street, SS: ${ss}`)
        })

        console.log(`\nTotal SS: ${this.suitabilityScore}`.bgYellow.black)
    }

    algorithm(street, driver){

        if(street.name.length % 2 === 0){ // If the length of the shipment's destination street name is even

            // Remove all consonants to get only vowels
            let extract = driver.name.replace(/[^aeiou]+/gi, '').length
            
            // The base suitability score (SS) is the number of vowels in the driver’s name multiplied by 1.5.
            let ss = extract ? (extract * 1.5) : 0

            // If the length of the shipment's destination street name shares any common factors (besides 1) with the length of the driver’s name
            if(street.name.length === driver.name.length){
                // The SS is increased by 50% above the base SS
                ss *= 1.5
            }

            // Assign ss to driver and street
            driver.suitabilityScore = ss
            street.suitabilityScore = ss

            // Total SS
            this.suitabilityScore += driver.suitabilityScore

        } else if(street.name.length % 2 !== 0){ // If the length of the shipment's destination street name is odd, 

            // Remove all vowels to get only consonants
            let extract = driver.name.replace(/[aeiou]+/gi, '').length

            // The base SS is the number of consonants in the driver’s name multiplied by 1.
            let ss = extract ? (extract * 1) : 0

            // If the length of the shipment's destination street name shares any common factors (besides 1) with the length of the driver’s name
            if(street.name.length === driver.name.length){
                // The SS is increased by 50% above the base SS
                ss *= 1.5
            }

            // Assign ss to driver and street
            driver.suitabilityScore = ss
            street.suitabilityScore = ss

            // Total SS
            this.suitabilityScore += driver.suitabilityScore
        }

        
    }

    sortValues(array = [], order = 'asc'){
        let newArray

        if(order == 'desc'){
            newArray = array.sort((a, b) => {
                if(a.name.length > b.name.length){
                    return -1
                }
                
                if(a.name.length < b.name.length){
                    return 1
                }
                
                return 0
            })

        } else {
            newArray = array.sort((a, b) => {
                if(a.name.length < b.name.length){
                    return -1
                }
                
                if(a.name.length > b.name.length){
                    return 1
                }
                
                return 0
            })
        }

        return newArray

    }
}

module.exports = Processes