function get_element_li(name, price) {
  return `<li class="added-item">name: ${name} price: ${price}  <button class="remove-item">remove</button></li>`
}

let remove_item = () => {
  const removeArray = document.getElementsByClassName("remove-item");
  const newRemove = removeArray[removeArray.length - 1];
  const d2 = document.getElementById('total');
  newRemove.addEventListener("click", function (e) {
    const padre = e.target.parentNode;
    padre.parentNode.removeChild(padre)
    d2.innerHTML = parseInt(d2.innerHTML) - 1;
  })
}

let addItem = (item_name, item_value) => {
  const d1 = document.getElementsByClassName('items')[0];
  d1.insertAdjacentHTML('beforeend', get_element_li(item_name, item_value));
  const d2 = document.getElementById('total');
  d2.innerHTML = 1 + parseInt(d2.innerHTML);
}

function validate(item_name, item_value) {
  if (isNaN(item_value)) {
    document.querySelector("#item-value").style.borderColor = "red";
    return false;
  }
  if (item_name.trim() == "") {
    document.querySelector("#item-name").style.borderColor = "red";
    return false;
  } else {
    document.querySelector("#item-name").style.borderColor = "initial";
  }
  if (item_value.trim() == "") {
    document.querySelector("#item-value").style.borderColor = "red";
    return false;
  } else {
    document.querySelector("#item-value").style.borderColor = "initial";
  }
  return true;
}