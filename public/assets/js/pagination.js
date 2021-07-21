var desired_product = {
    "page": 1,
    "price_range": "10-1000", 
    "sorting": "best_seller",
    "categories": []
}


document.getElementById('1').click()
//load the page at first without any filter

//fetch desired products based on the filters and show the result
function fetch_product(){
    fetch('/test', {
        method: "POST",
        body: JSON.stringify(desired_product),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(data => {
        //create elements
        box = document.createElement("div")
        box.className = "product_box"
        product_img = document.createElement("img")
        product_img.className = "product_img"
        product_img.src = "img/sample_product.jpg"
        product_name = document.createElement("h3")
        product_name.innerHTML = "موس ریزر"
        product_cat = document.createElement("h4")
        product_cat.innerHTML = "دسته بندی1"
        sep_line = document.createElement("hr")
        sep_line.className = "separate_line"
        bot_info = document.createElement("div")
        bot_info.className = "bottom_part"
        product_price = document.createElement("p")
        product_price.className = "product_price"
        product_price.innerHTML = "10000"
        price_unit = document.createElement("P")
        price_unit.className = "unit"
        price_unit.innerHTML = "تومان"
        shop_btn = document.createElement("a")
        shop_btn.className = "shop_btn"
        shop_btn.innerHTML = "خرید محصول"
        //add children to bottom part
        bot_info.appendChild(product_price)
        bot_info.appendChild(price_unit)
        bot_info.appendChild(shop_btn)
        //create final card
        box.appendChild(product_img)
        box.appendChild(product_name)
        box.appendChild(product_cat)
        box.appendChild(sep_line)
        box.appendChild(bot_info)
        //initialize the elements
        document.getElementsByClassName('products')[0].appendChild(box)
    }
    );
}


// <%- include('product_box.ejs',{data:{productname:'موس گیمینگ ریزر',productcat:'دسته بندی یک', productprice:'10.000', source:'img/sample_product.jpg',action:'خرید محصول'}}) -%>
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

// everytime the user change the range of the price new data will be sent to the server
function price(){
    range = ''
    range = document.getElementsByClassName("rubber-value-min")[0].innerHTML + "-" + document.getElementsByClassName("rubber-value-max")[0].innerHTML
    desired_product.price_range = range
    fetch_product()
}

// everytime user change the sorting mode data willbe send to the server
function sort(mode){
    if(mode == "highest_price"){
        desired_product.sorting = "highest_price"
        document.getElementsByClassName("price_btn")[0].style = "background-color: rgb(0, 149, 255); box-shadow: 0px 10px 20px rgba(0, 149, 255, 0.4);"
        document.getElementsByClassName("price")[0].style.color = "white"
        document.getElementsByClassName("best_btn")[0].style.boxShadow = "none"
        document.getElementsByClassName("best_btn")[0].style.backgroundColor = "white"
        document.getElementsByClassName("best_seller")[0].style.color = "black"
    }
    else if(mode == "best_seller") {
        desired_product.sorting = "best_seller"
        document.getElementsByClassName("best_btn")[0].style = "background-color: rgb(0, 149, 255); box-shadow: 0px 10px 20px rgba(0, 149, 255, 0.4);"
        document.getElementsByClassName("best_seller")[0].style.color = "white"
        document.getElementsByClassName("price_btn")[0].style.boxShadow = "none"
        document.getElementsByClassName("price_btn")[0].style.backgroundColor = "white"
        document.getElementsByClassName("price")[0].style.color = "black"
    }
    fetch_product()
}

// everytime a user check a category all the chosen categories will be send to the server 
function category(){
    let checked_cat = []
    let number_of_cat = document.getElementsByClassName("cat_checkbox").length
    cat = document.getElementsByClassName("checkbox_round")
    console.log(cat)
    for(let i = 0; i < number_of_cat; i++){
        if (cat[i].checked == true){
            checked_cat.push(cat[i].value)
        }
    }
    desired_product.categories = checked_cat
    fetch_product()
}