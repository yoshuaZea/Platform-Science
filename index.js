const { 
    inquirerMenu, 
    inquirerPause, 
    readInput,
    inquirerDeleteMenu,
    confirm
} = require('./controllers/inquirer')
const Processes = require('./controllers/processes')
const Drivers = require('./models/drivers')
const Streets = require('./models/streets')

// Main method to run app
const main = async () => {

    let opt = ''

    // Create an instance of each model
    const drivers = new Drivers()
    const streets = new Streets()
    const processes = new Processes()

    // Run at least one time
    do {

        // Print menu and get an option input
        opt = await inquirerMenu()
        
        switch(opt){ 
            case '1': // Create streets
                const streetName = await readInput('Drop the comma delimited csv file or type a street name: ')
                streets.create(streetName)
                break
            case '2': // Create drivers
                const driverName = await readInput('Drop the comma delimited csv file or type a driver name: ')
                drivers.create(driverName)
                break
            case '3': // List streets
                streets.showAll()
                break
            case '4': // List drivers
                drivers.showAll()
                break
            case '5': // Delete street
                const streetId = await inquirerDeleteMenu(streets.listStreets)

                if(streetId !== '0'){
                    const confirmDelete = await confirm('Are you sure?')
                    if(confirmDelete){
                        streets.delete(streetId)
                        console.log('Street deleted!')
                    }
                }
                break
            case '6': // Delete driver
                const driverId = await inquirerDeleteMenu(drivers.listDrivers)

                if(driverId !== '0'){
                    const confirmDelete = await confirm('Are you sure?')
                    if(confirmDelete){
                        drivers.delete(driverId)
                        console.log('Driver deleted!')
                    }
                }
                break
            case '7': // Calculate suitability score (SS)
                processes.calculateSS(streets.listStreets, drivers.listDrivers)
                break
            default:
                break
        }

        if(opt !== '0') await inquirerPause()

    } while (opt !== '0')
}

main()