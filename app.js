dispalyList();

const textInput = document.getElementById('textInput');
const priceInput = document.getElementById('priceInput');
const addBtn = document.getElementById('addBtn');
class DataObj {
    constructor(product, price) {
        this.product = product;
        this.price = price;
    }
}
let dataArr;

priceInput.addEventListener('keypress', function (e) {
    if (e.key == 'Enter') {
        addBtn.click();
    }
})

addBtn.addEventListener('click', function () {
    if (textInput.value != '' && priceInput.value != '') {
        let localItem = localStorage.getItem('shopping-list');
        let dataArr;
        if (localItem == null) {
            dataArr = [];
        } else {
            dataArr = JSON.parse(localItem);
        }
        dataObj = new DataObj(textInput.value, priceInput.value);
        dataArr.push(dataObj);
        const dataJSON = JSON.stringify(dataArr);
        localStorage.setItem('shopping-list', dataJSON);
        textInput.value = '';
        priceInput.value = '';
    }
    dispalyList();
    showTotal();
});


function dispalyList() {
    let localItem = localStorage.getItem('shopping-list');
    let dataArr;
    if (localItem == null) {
        dataArr = [];
    } else {
        dataArr = JSON.parse(localItem);
    }
    const container = document.getElementById('container');
    let html = '';

    dataArr.forEach((item, index) => {
        html += `
            <tr>
                <td scope="row" class="fw-bold">${index + 1}</td>
                <td class="text-primary">${item.product}</td>
                <td class="text-success">${item.price}</td>
                <td><button class="btn text-danger p-0 del-item" onclick="deleteItem(${index})">Delete</button></td>
            </tr>
    `
    });
    container.innerHTML = html;
}

function deleteItem(index) {
    let localItem = localStorage.getItem('shopping-list');
    let dataArr;
    if (localItem == null) {
        dataArr = [];
    } else {
        dataArr = JSON.parse(localItem);
    }
    dataArr.splice(index, 1);
    const dataJSON = JSON.stringify(dataArr);
    localStorage.setItem('shopping-list', dataJSON);
    dispalyList();
    showTotal();
}

showTotal();
function showTotal() {
    let localItem = localStorage.getItem('shopping-list');
    const totalPrice = document.getElementById('totalPrice');
    let dataArr;
    if (localItem == null) {
        dataArr = [];
    } else {
        dataArr = JSON.parse(localItem);
    }
    let total = 0;
    dataArr.forEach(item => {
        itemNum = parseFloat(item.price);
        total += itemNum;
    });
    totalPrice.innerText = total;
}

document.getElementById('clearBtn').addEventListener('click', function () {
    let localItem = localStorage.getItem('shopping-list');
    parseItem = JSON.parse(localItem);
    parseItem = [];
    parseJSON = JSON.stringify(parseItem);
    localStorage.setItem('shopping-list', parseJSON);
    dispalyList();
    showTotal();
});
