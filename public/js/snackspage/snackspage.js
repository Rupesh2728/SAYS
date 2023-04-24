
var myDiv = document.getElementById('myDiv');
var foodItem = JSON.parse(myDiv.getAttribute('data-my-array'));

console.log(foodItem);

for (let i = 0; i < foodItem.length; i++) {
    delete foodItem[i]._id;
    foodItem[i].quantity = 1;
}


let clickcount = 0;

function submitForms() {

    clickcount++;
    if (clickcount == 1) {
        return;
    }
    console.log("came here rey");
    const formTicket = document.getElementById('ticketidform');
    formTicket.submit();
}


TicketCheck();

function TicketCheck() {

    let x = document.getElementById("hidden_ejs_TicketNumber").textContent;
    let y = document.getElementsByClassName("dropdownForTickets");

    for (let i = 0; i < y.length; i++) {

        if (x.includes(y[i].value)) {

            document.querySelector('select[name="Ticketid"]').value = y[i].value;
            break;

        }

    }

}


let cartData = [];

document.querySelectorAll('.add-to-cart').forEach(item => {
    item.addEventListener('click', addToCart);
})


function addToCart() {
    var itemObj;
    var item = this.parentNode.parentNode;
    var itemtoadd = item.children[1].children[0].innerHTML;
    

    for (let i = 0; i < foodItem.length; i++) {

        if ( itemtoadd.includes(foodItem[i]['SnackName']) ) {
            itemObj = foodItem[i];
            break;
        }
    }

    
    var index = cartData.indexOf(itemObj);
    if (index == -1) {
        cartData.push(itemObj);
        item.querySelector('.card-top .add-to-cart').style.backgroundColor = "red";
        item.querySelector('.card-top .add-to-cart').style.color = "white";
    }

    else if (index > -1) {
        alert("Added to cart!");
    }

    
    var numitems = cartData;
    


    document.querySelector('.numitems').innerText = ' ' + cartData.length + ' Items';
    document.getElementById('totalitemnum').innerText = cartData.length;

    totalAmount();
    cartItems();
}


function cartItems() {
    var tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    for (let i = 0; i < cartData.length; i++) {
        var tableRow = document.createElement('tr');
        var rowData1 = document.createElement('td');
        var img = document.createElement('img');
        img.src = cartData[i].imgurl;
        rowData1.appendChild(img);

        var rowData2 = document.createElement('td');
        rowData2.innerText = cartData[i].SnackName;

        var rowData3 = document.createElement('td');
        var btn1 = document.createElement('button');
        btn1.setAttribute('class', 'decrease-item');
        btn1.innerText = '-';
        var span = document.createElement('span');
        span.innerText = cartData[i].quantity;
        var btn2 = document.createElement('button');
        btn2.setAttribute('class', 'increase-item');
        btn2.innerText = '+';

        rowData3.appendChild(btn1);
        rowData3.appendChild(span);
        rowData3.appendChild(btn2);

        var rowData4 = document.createElement('td');
        rowData4.innerText = cartData[i].price;

        tableRow.appendChild(rowData1);
        tableRow.appendChild(rowData2);
        tableRow.appendChild(rowData3);
        tableRow.appendChild(rowData4);

        tableBody.appendChild(tableRow);

    }

    document.querySelectorAll('.increase-item').forEach(item => {
        item.addEventListener('click', incrementItem)
    })

    document.querySelectorAll('.decrease-item').forEach(item => {
        item.addEventListener('click', decrementItem)
    })
}


function incrementItem() {
    let itemToInc = this.parentNode.previousSibling.innerText;
    console.log(itemToInc)
    var incObj = cartData.find(element => element.SnackName == itemToInc);
    incObj.quantity += 1;

    currPrice = (incObj.price * incObj.quantity - incObj.price * (incObj.quantity - 1)) / (incObj.quantity - 1);
    incObj.price = currPrice * incObj.quantity;
    totalAmount();
    cartItems();
}


var currPrice = 0;
function decrementItem() {
    let itemToInc = this.parentNode.previousSibling.innerText;
    let decObj = cartData.find(element => element.SnackName == itemToInc);
    let ind = cartData.indexOf(decObj);
    if (decObj.quantity > 1) {
        currPrice = (decObj.price * decObj.quantity - decObj.price * (decObj.quantity - 1)) / (decObj.quantity);
        decObj.quantity -= 1;
        decObj.price = currPrice * decObj.quantity;
    }

    else {
        cartData.splice(ind, 1);
        document.getElementById('numitems').innerText = ' ' + cartData.length + ' Items';
        document.getElementById('totalitemnum').innerText = cartData.length;

        if (cartData.length < 1 && flag) {
            document.getElementById('food-items').classList.toggle('food-items');
            document.getElementById('category-list').classList.toggle('food-items');
            document.getElementById('m-cart-plus').classList.toggle('m-cart-toggle')
            document.getElementById('cart-page').classList.toggle('cart-toggle');
            document.getElementById('category-header').classList.toggle('toggle-category');
            document.getElementById('checkout').classList.toggle('cart-toggle');
            flag = false;
            alert("Currently no item in cart!");
            console.log(flag)
        }
    }
    totalAmount()
    cartItems()
}

function totalAmount() {
    var sum = 0;
    for (let i = 0; i < cartData.length; i++) {
        sum += cartData[i].price;
    }

    document.getElementById('totalitemnum').innerText = cartData.length;
    document.getElementById('totalpricenum').innerText = sum;
}
