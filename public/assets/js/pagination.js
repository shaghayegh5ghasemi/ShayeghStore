var desired_product = {
    "page": 1,
    "price_range": "", 
    "sorting": "best_seller",
    "categories": []
}

function fetch_product(){
    fetch('/test', {
        method: "POST",
        body: JSON.stringify(desired_product),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(data => console.log(data));
}

//this function will be called when the user changes the page
function change_page(element_id) {
    //define the page the user want to visit
    if (element_id == "previous_page"){
        desired_product.page -= 1
    }
    else if (element_id == "next_page"){
        desired_product.page += 1
    } else {desired_product.page = Number(element_id)}

    let number_of_pages = document.getElementsByClassName("page_number").length
    var style_page = document.getElementsByClassName("page_number")
    //change the active style
    for(i = 1; i<=number_of_pages; i++){
        if(i == desired_product.page){
            style_page[i-1].className = "page_number active"
        }
        else{
            style_page[i-1].className = "page_number"
        }
    }

    // check if the previous button should be active or not
    if (desired_product.page == 1){
        document.getElementById("previous_page").style.visibility = "hidden";
    } else {
        document.getElementById("previous_page").style.visibility = "visible";
    }
    //check if the nexr button should be active or not
    if (desired_product.page == number_of_pages){
        document.getElementById("next_page").style.visibility = "hidden";
    } else {
        document.getElementById("next_page").style.visibility = "visible";
    }
    fetch_product()
}

function price(){}

function sort(){}

function category(category_value){
    let checked_cat = []
    let number_of_cat = document.getElementsByClassName("cat_checkbox").length
    cat = document.getElementsByClassName("cat_checkbox")
    for(i = 0; i < number_of_cat; i++){
        if (cat[i].checked == true){
        }
    }
}