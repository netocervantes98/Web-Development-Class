let get_element_li = (name, weight, image) => {
    return `<li class="added-pokemon">name: ${name} <div class="weight">weight: ${weight} </div> <img src=${image} ><button class="remove-pokemon">remove</button></li>`
}

let add_item_to_list_with_template = (template_function) => {
    return (event) => {
        document.getElementById("error").innerText = "";
        const name = document.getElementById("pokemon-name").value;

        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(({ data: { id, weight } }) => {
            const items = document.getElementsByClassName('items')[0];
            const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id.toString().padStart(3, '0')}.png`;
            items.insertAdjacentHTML('beforeend', template_function(name, weight, image));

            const total = document.getElementById('total');
            total.innerHTML = parseInt(total.innerHTML) + weight;

            const removeArray = document.getElementsByClassName("remove-pokemon");
            const newRemove = removeArray[removeArray.length - 1];
            newRemove.addEventListener("click", remove_element_event)
        }).catch(catchable_handle_for_the_error)
    }
}


let remove_element_event = (event) => {
    const total = document.getElementById('total');
    const padre = event.target.parentNode;

    padre.parentNode.removeChild(padre);
    total.innerHTML = parseInt(total.innerHTML) - padre.getElementsByClassName("weight")[0].innerText.replace(/\D/g, '');
}


let catchable_handle_for_the_error = (err) => {
    document.getElementById("error").innerText = "\nEse pokemon no existe."
}