// baraye inke masalan dokmeye safe ghablo kamrang por rang koni 
// for (i = 0; i < dots.length; i++) {
//     dots[i].className = dots[i].className.replace(" active", "");
// }

var desired_product = {
    "page": 1,
    "price_range": "",
    "sorting": "",
    "categories": []
}

function fetch_product(){}

function change_page(element_id) {
    let number_of_pages = document.getElementsByClassName("pagination").length - 2
    // check if the previous button should be active or not
    if (desired_product.page == 1){
        element_id.style.visibility = "hidden"
    } else {
        element_id.style.visibility = "visible"
    }
    //check if the nexr button should be active or not
    if (desired_product.page == number_of_pages){
        
    }
    if (element_id == "previous_page"){
        if (desired_product.page > 1) {
            desired_product.page -= 1
        }
        else desired_product.page = 1
    }

}

function price(){}

function sort(){}

function category(){}