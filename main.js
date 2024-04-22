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
let balance = 0
let totalOutgress = 0
let progress = document.getElementById('progress')
let totalIngress = 0
let progressPorcent = 0
function formatNmb(nNmb){
    var sRes = "";
    for (var j, i = nNmb.length - 1, j = 0; i >= 0; i--, j++) 
        sRes = nNmb.charAt(i) + ((j > 0) && (j % 3 == 0)? ".": "") + sRes;
        return sRes;
    
    }

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
        let mountNum = array[array.length - 1].mount
        let createItem = document.createElement('div')
        createItem.classList.add('item-block')
        createItem.innerHTML = `
            <div class="item-self">
                <div class="circle ${array[array.length - 1].category}"></div>
                <h2 class="item-text" id="${array[array.length - 1].id}">${array[array.length - 1].item}</h2>
            </div>
            <span>${array[array.length - 1].sign}$${formatNmb(mountNum.toString())}</span>
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
            // Total outgress
            totalOutgress = totalOutgress + parseInt(array[array.length - 1].mount)

            // Porcent progress
            progressPorcent = totalOutgress / totalIngress * 100
            
            // Balance
            balance = totalIngress - totalOutgress
            
            // Print in the app
            document.getElementById('balance').innerHTML = formatNmb(balance.toString())
            progress.style.strokeDasharray = `${progressPorcent} 100`
            document.getElementById('totalOutgress').innerHTML = formatNmb(totalOutgress.toString())
            
            // Local storage
            localStorage.setItem('balance', JSON.stringify(balance))
            localStorage.setItem('totalOutgress', JSON.stringify(totalOutgress))
            localStorage.setItem('totalIngress', JSON.stringify(totalIngress))
        } else {
            // total ingress
            totalIngress = totalIngress + parseInt(array[array.length - 1].mount)

            // Porcent progress
            progressPorcent = totalOutgress / totalIngress * 100
            progress.style.strokeDasharray = `${progressPorcent} 100`

            // Balance
            balance = totalIngress - totalOutgress
            console.log(formatNmb('25000'))

            // Print in the app
            document.getElementById('balance').innerHTML = formatNmb(balance.toString())

            // Local storage
            localStorage.setItem('balance', JSON.stringify(balance))
            localStorage.setItem('totalIngress', JSON.stringify(totalIngress))
        }
    }
})

// Delete a item with click

items.addEventListener('click', (e) => {
    let event = e.target
    if(event.classList.contains('item-text')) {
        // Remove from the app
        event.parentNode.parentNode.remove()

        // Remove from local storage
        const deleteId = parseInt(event.getAttribute('id'))
        const deleteArray = array.filter(i => i.id == deleteId)
        const newArray = array.filter(i => i.id != deleteId)
        array = newArray
        localStorage.setItem('items', JSON.stringify(array))

        // Change values
        if(deleteArray[0].sign === '-') {
            // Total outgress
            totalOutgress = totalOutgress - parseInt(deleteArray[0].mount)

            // Progress porcent
            progressPorcent = totalOutgress / totalIngress * 100
            progress.style.strokeDasharray = `${progressPorcent} 100`

            // Balance
            balance = totalIngress - totalOutgress

            // Print in the app
            document.getElementById('balance').innerHTML = formatNmb(balance.toString())
            document.getElementById('totalOutgress').innerHTML = formatNmb(totalOutgress.toString())

            // Local storage
            localStorage.setItem('balance', JSON.stringify(balance))
            localStorage.setItem('totalOutgress', JSON.stringify(totalOutgress))
            localStorage.setItem('totalIngress', JSON.stringify(totalIngress))
        } else {
            // total ingress
            totalIngress = totalIngress - parseInt(deleteArray[0].mount)

            // Porcent progress
            progressPorcent = totalOutgress / totalIngress * 100
            progress.style.strokeDasharray = `${progressPorcent} 100`

            // Balance
            balance = totalIngress - totalOutgress

            // Print in the app
            document.getElementById('balance').innerHTML = formatNmb(balance.toString())

            // Local storage
            localStorage.setItem('balance', JSON.stringify(balance))
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
        let mountNum = i.mount
        let createItem = document.createElement('div')
        createItem.classList.add('item-block')
        createItem.innerHTML = `
            <div class="item-self">
                <div class="circle ${i.category}"></div>
                <h2 class="item-text" id="${array[array.length - 1].id}">${i.item}</h2>
            </div>
            <span>${i.sign}$${formatNmb(mountNum.toString())}</span>
        `
        items.appendChild(createItem)
    }
    // Get balance
    let getBalance = JSON.parse(localStorage.getItem('balance'))
    balance = getBalance
    document.getElementById('balance').innerHTML = formatNmb(balance.toString())

    // Get total outgress
    let getTotalOutgress = JSON.parse(localStorage.getItem('totalOutgress'))
    totalOutgress = getTotalOutgress
    document.getElementById('totalOutgress').innerHTML = formatNmb(totalOutgress.toString())

    // Get total ingress
    let getTotalIngress = JSON.parse(localStorage.getItem('totalIngress'))
    totalIngress = getTotalIngress
    
    // Progress porcent
    progressPorcent = parseInt(totalOutgress) / parseInt(totalIngress) * 100
    progress.style.strokeDasharray = `${progressPorcent} 100`
})