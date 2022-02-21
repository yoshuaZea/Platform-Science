const inquirer = require('inquirer')
require('colors')

// Options for the main menu
const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Add street names`
            },
            {
                value: '2',
                name: `${'2.'.green} Add driver names`
            },
            {
                value: '3',
                name: `${'3.'.green} Show street names`
            },
            {
                value: '4',
                name: `${'4.'.green} Show driver names`
            },
            {
                value: '5',
                name: `${'5.'.green} Delete a street name`
            },
            {
                value: '6',
                name: `${'6.'.green} Delete a driver name`
            },
            {
                value: '7',
                name: `${'7.'.green} Calculate SS`
            },
            {
                value: '0',
                name: `${'0.'.red} Exit \n`
            }
        ]
    }
]

// Menu options
const inquirerMenu = async () => {
    console.clear()

    console.log('====================='.green)
    console.log('  Select an option'.white)
    console.log('====================='.green)

    // Create a console interface with the options array
    const { option } = await inquirer.prompt(menuOptions)

    return option
}

// Interface to make a pause
const inquirerPause = async () => {
    console.log('\n')

    // Create a console interface for the pause
    await inquirer.prompt({
        type: 'input',
        name: 'enter',
        message: `\nPress ${'ENTER'.green} to continue \n`
    })
}

// Interface to read an input 
const readInput = async message => {

    const question = {
        type: 'input',
        name: 'name',
        message,
        validate(value){
            if(value.length === 0){
                return 'Please write a value'
            }
            return true
        }
    }

    // Create a console interface for the input
    const { name } = await inquirer.prompt(question)

    return name
}

// Interface to the question before delete a record
const inquirerDeleteMenu = async (data = []) => {
    const choices = data.map((item, i) => {
        const idx = `${i + 1}.`.yellow
        return {
            value: item.id,
            name: `${idx} ${item.name}`
        }
    })

    // Add at the first the cancel option
    choices.unshift({
        value: '0',
        name: `${'0.'.red} Cancel`
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]

    // Create a console interface for delete option
    const { id } = await inquirer.prompt(questions)
    return id
}

const confirm = async message => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question)
    return ok
}

module.exports = {
    inquirerMenu, 
    inquirerPause,
    readInput,
    inquirerDeleteMenu,
    confirm
}