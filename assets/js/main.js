const addForm = document.getElementById('addForm')
const addFormContent = document.getElementById('addFormContent')
const addForm_Form = document.getElementById('addForm_Form')

const editForm = document.getElementById('editForm')
const editFormContent = document.getElementById('editFormContent')
const editForm_form = document.getElementById('editForm_form')

const deleteCard = document.getElementById('deleteCard')
const deleteCardContent = document.getElementById('deleteCardContent')

const items = document.getElementById('items')
const circle = document.getElementById('circle')
const circleProgress = document.getElementById('circleProgress')
const header_balance = document.getElementById("header_balance")
const porcent_outgress = document.getElementById("porcent_outgress")

const dateText = document.getElementById("dateText")

class Registros {
    constructor() {
        this.registros = []
    }
    renderRegistros() {
        items.innerHTML = ""
        this.registros.forEach(registro => {
            if (registro.date == dateText.innerHTML) {
                const html = `
                    <div class="item_block" id="${registro.id}" onclick="toggleEditForm(event)">
                        <p class="item_text">
                            ${registro.registro}
                        </p>
                        <span class="item_amount">
                            ${registro.type == "ingreso" ? "+" : "-"}$${registro.monto}
                        </span>
                `
                items.insertAdjacentHTML('beforeend', html)
            }
        })
    }
    addRegistro(id, registro, monto, type) {
        const item = {
            'id': id,
            'registro': registro,
            'monto': monto,
            'type': type,
            'date': `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
        }
        this.registros = [...this.registros, item]
        this.renderRegistros()
        localStorage.setItem("registros", this.registros)
    }
    editRegistro(id, registro, monto, type) {
        this.registros[id].registro = registro
        this.registros[id].type = type
        this.registros[id].monto = monto
        this.renderRegistros()
        localStorage.setItem("registros", this.registros)
    }
    deleteRegistro(id) {
        this.registros = this.registros.filter(registro => registro.id != id)
        this.renderRegistros()
    }
}
const registros = new Registros()

class Updates {
    constructor() {
        this.calc = {
            totalIngresos: 0,
            totalEgresos: 0,
            progressPorcent: 0,
            balance: 0
        }
    }
    loadUpdates() {
        header_balance.innerHTML = this.calc.balance.toLocaleString()
        porcent_outgress.innerHTML = `$${this.calc.totalEgresos.toLocaleString()}`
        circleProgress.style.strokeDasharray = `${this.calc.totalEgresos / this.calc.totalIngresos * 100} 100`
    }
    addIngreso(monto) {
        this.calc.totalIngresos += monto
        this.calc.balance = this.calc.totalIngresos - this.calc.totalEgresos
        this.loadUpdates()
    }
    addEgreso(monto) {
        this.calc.totalEgresos += monto
        this.calc.balance = this.calc.totalIngresos - this.calc.totalEgresos
        this.loadUpdates()
    }
    editIngreso(monto, newMonto) {
        this.calc.totalIngresos = this.calc.totalIngresos - monto + newMonto
        this.calc.balance = this.calc.totalIngresos - this.calc.totalEgresos
        this.loadUpdates()
    }
    editEgreso(monto, newMonto) {
        this.calc.totalEgresos = this.calc.totalEgresos - monto + newMonto
        this.calc.balance = this.calc.totalIngresos - this.calc.totalEgresos
        this.loadUpdates()
    }
    deleteIngreso(monto) {
        this.calc.totalIngresos = this.calc.totalIngresos - monto
        this.calc.balance = this.calc.totalIngresos - this.calc.totalEgresos
        this.loadUpdates()
    }
    deleteEgreso(monto) {
        this.calc.totalEgresos = this.calc.totalEgresos - monto
        this.calc.balance = this.calc.totalIngresos - this.calc.totalEgresos
        this.loadUpdates()
    }
}
const updates = new Updates()

class GetDate {
    constructor() {
        this.day = new Date().getDate()
        this.month = new Date().getMonth() + 1
        this.year = new Date().getFullYear()
    }
    getDate() {
        return `${this.day}/${this.month}/${this.year}`
    }
    incrementDate() {
        if (this.year % 4 == 0) {
            switch (this.month) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                    if (this.day == 31) {
                        this.day = 1
                        this.month++
                    } else {
                        this.day++
                    }
                    break
                case 12:
                    if (this.day == 31) {
                        this.day == 1
                        this.month = 1
                        this.year++
                    } else {
                        this.day++
                    }
                    break
                case 4:
                case 6:
                case 9:
                case 11:
                    if (this.day == 30) {
                        this.day = 1
                        this.month++
                    } else {
                        this.day++
                    }
                    break
                case 2:
                    if (this.day == 29) {
                        this.day = 1
                        this.month++
                    } else {
                        this.day++
                    }
                    break
            }
        } else {
            switch (this.month) {
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                    if (this.day == 31) {
                        this.day = 1
                        this.month++
                    } else {
                        this.day++
                    }
                    break
                case 12:
                    if (this.day == 31) {
                        this.day == 1
                        this.month = 1
                        this.year++
                    } else {
                        this.day++
                    }
                    break
                case 4:
                case 6:
                case 9:
                case 11:
                    if (this.day == 30) {
                        this.day = 1
                        this.month++
                    } else {
                        this.day++
                    }
                    break
                case 2:
                    if (this.day == 28) {
                        this.day = 1
                        this.month++
                    } else {
                        this.day++
                    }
            }
        }
        dateText.innerHTML = date.getDate()
        registros.renderRegistros()
    }
    decrementDate() {
        if (this.year % 4 == 0) {
            switch (this.month) {
                case 1:
                    if (this.day == 1) {
                        this.day = 31
                        this.month = 12
                        this.year--
                    } else {
                        this.day--
                    }
                    break
                case 12:
                case 10:
                case 8:
                case 7:
                case 5:
                    if (this.day == 1) {
                        this.day = 30
                        this.month--
                    } else {
                        this.month--
                    }
                    break
                case 11:
                case 9:
                case 6:
                case 4:
                case 2:
                    if (this.day == 1) {
                        this.day = 31
                        this.month--
                    } else {
                        this.day--
                    }
                    break
                case 3:
                    if (this.day == 1) {
                        this.day = 29
                        this.month--
                    } else {
                        this.day--
                    }
            }
        } else {
            switch (this.month) {
                case 1:
                    if (this.day == 1) {
                        this.day = 31
                        this.month = 12
                        this.year--
                    } else {
                        this.day--
                    }
                    break
                case 12:
                case 10:
                case 8:
                case 7:
                case 5:
                    if (this.day == 1) {
                        this.day = 30
                        this.month--
                    } else {
                        this.month--
                    }
                    break
                case 11:
                case 9:
                case 6:
                case 4:
                case 2:
                    if (this.day == 1) {
                        this.day = 31
                        this.month--
                    } else {
                        this.day--
                    }
                    break
                case 3:
                    if (this.day == 1) {
                        this.day = 28
                        this.month--
                    } else {
                        this.day--
                    }
            }
        }
        dateText.innerHTML = date.getDate()
        registros.renderRegistros()
    }
}
const date = new GetDate()
dateText.innerHTML = date.getDate()

// Open & close add form
const toggleAddForm = () => {
    addForm.classList.toggle('handle_form'),
        addFormContent.classList.toggle('handle_form')
    addForm_Form.reset()
    addForm_Form[0].nextElementSibling.classList.remove("active")
    addForm_Form[0].classList.remove("error_form")
    addForm_Form[1].nextElementSibling.classList.remove("active")
    addForm_Form[1].classList.remove("error_form")
    addForm_Form[2].nextElementSibling.classList.remove("active")
    addForm_Form[2].classList.remove("error_form")
}

// Add registro event
const SubmitAddForm = (event) => {
    event.preventDefault()
    if (event.target[0].value == "") {
        event.target[0].nextElementSibling.classList.add("active")
        event.target[0].classList.add("error_form")
    } else {
        event.target[0].nextElementSibling.classList.remove("active")
        event.target[0].classList.remove("error_form")
    }
    if (event.target[1].value == "") {
        event.target[1].nextElementSibling.classList.add("active")
        event.target[1].classList.add("error_form")
    } else {
        event.target[1].nextElementSibling.classList.remove("active")
        event.target[1].classList.remove("error_form")
    }
    if (event.target[2].value == "") {
        event.target[2].nextElementSibling.classList.add("active")
        event.target[2].classList.add("error_form")
    } else {
        event.target[2].nextElementSibling.classList.remove("active")
        event.target[2].classList.remove("error_form")
    }
    if (event.target[0].value != "" && event.target[1].value != "" && event.target[2].value != "") {
        registros.addRegistro(Date.now(), event.target[0].value, Number(event.target[1].value), event.target[2].value)
        event.target[2].value == "ingreso" ? updates.addIngreso(Number(event.target[1].value)) : updates.addEgreso(Number(event.target[1].value))
        addForm_Form.reset()
        addForm.classList.toggle('handle_form')
        addFormContent.classList.toggle('handle_form')
        localStorage.setItem("registros", JSON.stringify(registros.registros))
        localStorage.setItem("calc", JSON.stringify(updates.calc))
    }
}

// Open & close edit form
const toggleEditForm = (event) => {
    if (editForm.classList.contains('handle_form')) {
        editForm.classList.toggle('handle_form')
        editFormContent.classList.toggle('handle_form')
        editForm_form[1].nextElementSibling.classList.remove("active")
        editForm_form[1].classList.remove("error_form")
        editForm_form[2].nextElementSibling.classList.remove("active")
        editForm_form[2].classList.remove("error_form")
        editForm_form[3].nextElementSibling.classList.remove("active")
        editForm_form[3].classList.remove("error_form")
        editForm_form.reset()
    } else {
        editForm.classList.toggle('handle_form')
        editFormContent.classList.toggle('handle_form')
        const index = registros.registros.findIndex(registro => registro.id == event.target.id)
        editForm_form[0].value = registros.registros[index].id
        editForm_form[1].value = registros.registros[index].registro
        editForm_form[2].value = registros.registros[index].monto
        editForm_form[3].value = registros.registros[index].type
    }
}

// Edit registro event
const submitEditForm = (event) => {
    event.preventDefault()
    if (event.target[1].value == "") {
        event.target[1].nextElementSibling.classList.add("active")
        event.target[1].classList.add("error_form")
    } else {
        event.target[1].nextElementSibling.classList.remove("active")
        event.target[1].classList.remove("error_form")
    }
    if (event.target[2].value == "") {
        event.target[2].nextElementSibling.classList.add("active")
        event.target[2].classList.add("error_form")
    } else {
        event.target[2].nextElementSibling.classList.remove("active")
        event.target[2].classList.remove("error_form")
    }
    if (event.target[3].value == "") {
        event.target[3].nextElementSibling.classList.add("active")
        event.target[3].classList.add("error_form")
    } else {
        event.target[3].nextElementSibling.classList.remove("active")
        event.target[3].classList.remove("error_form")
    }
    if (event.target[1].value != "" && event.target[2].value != "" && event.target[3].value != "") {
        const index = registros.registros.findIndex(registro => registro.id == event.target[0].value)
        event.target[3].value == "ingreso" ? updates.editIngreso(registros.registros[index].monto, Number(event.target[2].value)) : updates.editEgreso(registros.registros[index].monto, Number(event.target[2].value))
        registros.editRegistro(index, event.target[1].value, Number(event.target[2].value), event.target[3].value)
        editForm_form.reset()
        editForm.classList.toggle('handle_form')
        editFormContent.classList.toggle('handle_form')
        localStorage.setItem("registros", JSON.stringify(registros.registros))
        localStorage.setItem("calc", JSON.stringify(updates.calc))
    }
}

// Toggle delete card
const toggleDeleteCard = (event) => {
    deleteCard.classList.toggle('handle_form')
    deleteCardContent.classList.toggle('handle_form')
}

// Delete registro event
const deleteRegistro = (event) => {
    registros.deleteRegistro(editForm_form[0].value)
    editForm_form[3].value == "ingreso" ? updates.deleteIngreso(Number(editForm_form[2].value)) : updates.deleteEgreso(Number(editForm_form[2].value))
    editForm_form.reset()
    deleteCard.classList.toggle('handle_form')
    deleteCardContent.classList.toggle('handle_form')
    editForm.classList.toggle('handle_form')
    editFormContent.classList.toggle('handle_form')
    localStorage.setItem("registros", JSON.stringify(registros.registros))
    localStorage.setItem("calc", JSON.stringify(updates.calc))
}

// Load registros
window.addEventListener("load", () => {
    const loadRegistros = localStorage.getItem("registros")
    const registrosLoaded = JSON.parse(loadRegistros)
    const loadCalc = localStorage.getItem("calc")
    const calcLoaded = JSON.parse(loadCalc)
    if (registrosLoaded != null) {
        registros.registros = registrosLoaded
        registros.renderRegistros()
        updates.calc = calcLoaded
        updates.loadUpdates()
    }
})