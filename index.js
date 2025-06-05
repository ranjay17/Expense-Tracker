const expenseAmount = document.getElementById("expense-amount");
const expenseDescription = document.getElementById("description");
const expenseCategory = document.getElementById("expense-category");
const addButton = document.getElementById("add-btn");
const expenseTracker = document.getElementById("expense-container");

addButton.addEventListener('click', show);

window.onload = function(){
    const expense = JSON.parse(localStorage.getItem("expenses")) || [];
    expense.forEach(element => {
        renderExpense(element)
    });
}

function renderExpense(expense){
    const {amount, description, category} = expense;
    const li = document.createElement('li');
    const delButton = document.createElement('button');
    delButton.id = 'removeBtn'
    const editButton = document.createElement('button');
    delButton.textContent = 'Delete Expense';
    editButton.id = 'changeBtn'
    editButton.textContent = 'Edit Expense';
    li.textContent = `${amount} - ${description} - ${category}`;
    li.append(editButton, delButton);
    expenseTracker.append(li)

    delButton.addEventListener('click', function(){
        li.remove()
        deleteStorage(expense)
    })

    editButton.addEventListener('click', function(){
        expenseAmount.value = amount
        expenseDescription.value = description
        expenseAmount.category = category
        li.remove()
    })
    expenseAmount.value = ""
    expenseDescription.value = ""
    expenseCategory.value = ""
}

function show(event){
    event.preventDefault();
    const newExpense = {
        amount : expenseAmount.value,
        description : expenseDescription.value,
        category : expenseCategory.value,
    }
    let expense = JSON.parse(localStorage.getItem('expenses')) || [];
    expense.push(newExpense);
    localStorage.setItem('expenses', JSON.stringify(expense));
    renderExpense(newExpense)
}

function deleteStorage(item){
    let expense = JSON.parse(localStorage.getItem("expenses")) || [];
    expense = expense.filter(ex =>{
        return !(ex.amount === item.amount && ex.description === item.description && ex.category === item.category);
    })
    localStorage.setItem('expenses', JSON.stringify(expense));
}