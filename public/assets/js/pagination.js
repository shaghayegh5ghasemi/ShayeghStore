// baraye inke masalan dokmeye safe ghablo kamrang por rang koni 
// for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
// }

var desired_product = {
    "page": 1,
    "price_range": "", 
    "sorting": "best_seller",
    "categories": []
}

function fetch_product(){}

function change_page(element_id) {
    //define the page the user want to visit
    if (element_id == "previous_page"){
        desired_product.page -= 1
    }
    else if (element_id == "next_page"){
        desired_product.page += 1
    } else {desired_product.page = int(element_id)}

    let number_of_pages = document.getElementsByClassName("page_number").length
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
        document.getElementById("previous_page").style.visibility = "visible";
    }
}

function price(){}

function sort(){}

function category(){}