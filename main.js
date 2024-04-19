// Open form to add items
let addBtn = document.getElementById('addBtn')
let grid = document.getElementById('grid')

addBtn.addEventListener('click', () => {
    grid.classList.add('show')
    closeForm.style.display = 'block'
})

// Close form
let closeForm = document.getElementById('closeForm')


closeForm.addEventListener('click', () => {
    grid.classList.remove('show')
    closeForm.style.display = 'none'
})

// Add event to ingress & outgress inputs
let ingress = document.getElementById('ingress')
let outgress = document.getElementById('outgress')
let category = ''
let sign = ''

ingress.addEventListener('click', () => {
    ingress.style.backgroundColor = '#8297AE'
    outgress.style.backgroundColor = '#D4DBE3'
    category = 'ingress-circle'
    sign = '+'
})

outgress.addEventListener('click', () => {
    ingress.style.backgroundColor = '#D4DBE3'
    outgress.style.backgroundColor = '#8297AE'
    category = 'outgress-circle'
    sign = '-'
})

// Add item to dashboard
let form = document.getElementById('form')
let array = []
let items = document.getElementById('items')
let balance = document.getElementById('balance')
let totalOutgress = document.getElementById('totalOutgress')
let progress = document.getElementById('progress')
let totalIngress = 0
let progressPorcent = 0

form.addEventListener('submit', (e) => {
    e.preventDefault()
    // Validate the data
    if (document.getElementById('item').value === '' || document.getElementById('mount') === '') {
        alert('Please, fill the inputs!')
    } else {
        // Set item to array
        let setItem = {
            'category': category,
            'sign': sign,
            'item': document.getElementById('item').value,
            'mount': document.getElementById('mount').value,
            'id': Date.now()
        }
        array = [...array, setItem]
        // Save the array in local storage
        localStorage.setItem('items', JSON.stringify(array))

        // Create the item in a dashboard
        let createItem = document.createElement('div')
        createItem.classList.add('item-block')
        createItem.innerHTML = `
            <div class="item-self">
                <div class="circle ${array[array.length - 1].category}"></div>
                <h2>${array[array.length - 1].item}</h2>
            </div>
            <span>${array[array.length - 1].sign}$${array[array.length - 1].mount}</span>
        `
        items.appendChild(createItem)

        // Clear the form
        document.getElementById('item').value = ''
        document.getElementById('mount').value = ''
        ingress.style.backgroundColor = '#D4DBE3'
        outgress.style.backgroundColor = '#D4DBE3'
        grid.classList.remove('show')
        closeForm.style.display = 'none'

        // Modifications
        if(array[array.length - 1].sign === '-') {
            // Rest the balance
            balance.innerHTML = parseInt(balance.innerHTML) - parseInt(array[array.length - 1].mount)
            localStorage.setItem('balance', JSON.stringify(balance.innerHTML))

            // Modify the outgress resume
            totalOutgress.innerHTML = parseInt(totalOutgress.innerHTML) + parseInt(array[array.length - 1].mount)
            localStorage.setItem('totalOutgress', JSON.stringify(totalOutgress.innerHTML))

            progressPorcent = parseInt(totalOutgress.innerHTML) / parseInt(totalIngress) * 100
            progress.style.strokeDasharray = `${progressPorcent} 100`
            localStorage.setItem('totalIngress', JSON.stringify(totalIngress))
        } else {
            // Sum the balance
            balance.innerHTML = parseInt(balance.innerHTML) + parseInt(array[array.length - 1].mount)
            localStorage.setItem('balance', JSON.stringify(balance.innerHTML))
            
            totalIngress = totalIngress + parseInt(balance.innerHTML)
            progressPorcent = parseInt(totalOutgress.innerHTML) / parseInt(totalIngress) * 100
            progress.style.strokeDasharray = `${progressPorcent} 100`
            localStorage.setItem('totalIngress', JSON.stringify(totalIngress))
        }
    }

})

// Local storage saves
window.addEventListener('load', () => {
    // Get the items
    let getItems = JSON.parse(localStorage.getItem('items'))
    for(let i of getItems) {
        array = [...array, i]
        let createItem = document.createElement('div')
        createItem.classList.add('item-block')
        createItem.innerHTML = `
            <div class="item-self">
                <div class="circle ${i.category}"></div>
                <h2>${i.item}</h2>
            </div>
            <span>${i.sign}$${i.mount}</span>
        `
        items.appendChild(createItem)
    }

    // Get balance
    let getBalance = JSON.parse(localStorage.getItem('balance'))
    balance.innerHTML = parseInt(getBalance)

    // Get total outgress
    let getTotalOutgress = JSON.parse(localStorage.getItem('totalOutgress'))
    totalOutgress.innerHTML = parseInt(getTotalOutgress)

    let getTotalIngress = JSON.parse(localStorage.getItem('totalIngress'))
    totalIngress = getTotalIngress
    progressPorcent = parseInt(totalOutgress.innerHTML) / parseInt(totalIngress) * 100
    progress.style.strokeDasharray = `${progressPorcent} 100`
})