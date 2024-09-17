const formContainer = document.getElementById('formContainer')
const formContent = document.getElementById('formContent')

// Open form
function showForm() {
    formContainer.style.transform = 'scale(1)'
    formContent.style.transform = 'scale(1)'
}

// Close form
function closeForm() {
    formContainer.style.transform = 'scale(0)'
    formContent.style.transform = 'scale(0)'
}

let plusCircle = document.getElementById('plusCircle')
let minusCircle = document.getElementById('minusCircle')
let sign = ''

// Handle plus
function handlePlus() {
    plusCircle.style.display = 'none'
    minusCircle.style.display = 'block'
    sign = '-'
}

// Handle minus
function handleMinus() {
    plusCircle.style.display = 'block'
    minusCircle.style.display = 'none'
    sign = '+'
}

const item = document.getElementById('item')
const mount = document.getElementById('monto')
const desc = document.getElementById('desc')
const form = document.getElementById('form')

// Validate form
form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(item.value == '' || mount.value == '' || desc.value == '') {
        alert('¡Please, fill the inputs!')
    } else {
        addItem()
    }
})

// Add item on the array
let itemsArray = []
function addItem() {
	const setItem = {
		'id': Date.now(),
		'item': item.value,
		'mount': mount.value,
		'sign': sign,
		'desc': desc.value
	}
	itemsArray = [...itemsArray, setItem]
	localStorage.setItem('items', JSON.stringify(itemsArray))
	createItem()
	clearForm()
}

const items = document.getElementById('items')
let dates = {
    totalOutgress: 0,
    totalIngress: 0,
    progressPorcent: 0,
    balance: 0
}

let circleProgress = document.getElementById('circleProgress')
let circle = document.getElementById('circle')

// Add item on the app
function createItem() {
	const mountNum = parseFloat(itemsArray[itemsArray.length - 1].mount)
	const itemBlock = document.createElement('div')
	itemBlock.classList.add('item-block')
	itemBlock.innerHTML = `
		<p class="item-text" id="${itemsArray[itemsArray.length - 1].id}">${itemsArray[itemsArray.length - 1].item}</p>
		<span>${itemsArray[itemsArray.length - 1].sign}$${mountNum.toLocaleString()}</span>
	`
	items.appendChild(itemBlock)

	// Modifications
	if(itemsArray[itemsArray.length - 1].sign === '-') {
		// Total outgress
		dates.totalOutgress = dates.totalOutgress + parseFloat(itemsArray[itemsArray.length - 1].mount)

		// Porcent progress
		dates.progressPorcent = dates.totalOutgress / dates.totalIngress * 100
		
		// Balance
		dates.balance = dates.totalIngress - dates.totalOutgress
		
		// Print in the app
		document.getElementById('balance').innerHTML = dates.balance.toLocaleString()
		circleProgress.style.strokeDasharray = `${dates.progressPorcent} 100`
		document.getElementById('totalOutgress').innerHTML = dates.totalOutgress.toLocaleString()
		
		// Local storage
		localStorage.setItem('dates', JSON.stringify(dates))
	} else {
		// total ingress
		dates.totalIngress = dates.totalIngress + parseFloat(itemsArray[itemsArray.length - 1].mount)

		// Porcent progress
		dates.progressPorcent = dates.totalOutgress / dates.totalIngress * 100
		circleProgress.style.strokeDasharray = `${dates.progressPorcent} 100`

		// Balance
		dates.balance = dates.totalIngress - dates.totalOutgress

		// Print in the app
		document.getElementById('balance').innerHTML = dates.balance.toLocaleString()

		// Local storage
		localStorage.setItem('dates', JSON.stringify(dates))
	}
}

// Clear form
function clearForm() {
	item.value = ''
    mount.value = ''
    desc.value = ''
    if (screen.width < 768) {
        formContainer.style.transform = 'scale(0)'
        formContent.style.transform = 'scale(0)'
    }
}

// Delete a item
items.addEventListener('click', (e) => {
    let event = e.target
    if(event.classList.contains('item-text')) {
        // Remove from the app
        event.parentNode.remove()

        // Remove from local storage
        const deleteId = parseFloat(event.getAttribute('id'))
        const deleteArray = itemsArray.filter(i => i.id == deleteId)
        const newArray = itemsArray.filter(i => i.id != deleteId)
        itemsArray = newArray
        localStorage.setItem('items', JSON.stringify(itemsArray))

        // Change values
        if(deleteArray[0].sign === '-') {
            // Total outgress
            dates.totalOutgress = dates.totalOutgress - parseFloat(deleteArray[0].mount)

            // Progress porcent
            dates.progressPorcent = dates.totalOutgress / dates.totalIngress * 100
            circleProgress.style.strokeDasharray = `${dates.progressPorcent} 100`

            // Balance
            dates.balance = dates.totalIngress - dates.totalOutgress

            // Print in the app
            document.getElementById('balance').innerHTML = dates.balance.toLocaleString()
            document.getElementById('totalOutgress').innerHTML = dates.totalOutgress.toLocaleString()

            // Local storage
            localStorage.setItem('dates', JSON.stringify(dates))
        } else {
            // total ingress
            dates.totalIngress = dates.totalIngress - parseFloat(deleteArray[0].mount)

            // Porcent progress
            dates.progressPorcent = dates.totalOutgress / dates.totalIngress * 100
            circleProgress.style.strokeDasharray = `${dates.progressPorcent} 100`

            // Balance
            dates.balance = dates.totalIngress - dates.totalOutgress

            // Print in the app
            document.getElementById('balance').innerHTML = dates.balance.toLocaleString()

            // Local storage
            localStorage.setItem('dates', JSON.stringify(dates))
        }
    }

})

// Local storage saves
window.addEventListener('load', () => {
    // Get the items
    let getItems = JSON.parse(localStorage.getItem('items'))
    for(let i of getItems) {
        itemsArray = [...itemsArray, i]
        let mountNum = parseFloat(i.mount)
        let createItem = document.createElement('div')
        createItem.classList.add('item-block')
        createItem.innerHTML = `
            <p class="item-text" id="${i.id}">${i.item}</p>
            <span>${i.sign}$${mountNum.toLocaleString()}</span>
        `
        items.appendChild(createItem)
    }
    let getDates = JSON.parse(localStorage.getItem('dates'))

    // Get balance
    dates.balance = getDates.balance
    document.getElementById('balance').innerHTML = dates.balance.toLocaleString()

    // Get total outgress
    dates.totalOutgress = getDates.totalOutgress
    document.getElementById('totalOutgress').innerHTML = dates.totalOutgress.toLocaleString()

    // Get total ingress
    dates.totalIngress = getDates.totalIngress
    
    // Progress porcent
    dates.progressPorcent = parseFloat(dates.totalOutgress) / parseFloat(dates.totalIngress) * 100
    circleProgress.style.strokeDasharray = `${dates.progressPorcent} 100`
})