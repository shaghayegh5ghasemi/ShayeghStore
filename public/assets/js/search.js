function search_product(){
    search_str = document.getElementById("search_str").value
    fetch('/search', {
        method: "POST",
        body: JSON.stringify({"query": search_str}),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(data => {
        document.getElementsByClassName('products')[0].innerHTML = ""
        for(let i = 0;i<data.products.length;i++){
            box = document.createElement("div")
            box.className = "product_box"
            product_img = document.createElement("img")
            product_img.className = "product_img"
            product_img.src = data.products[i].image
            product_name = document.createElement("h3")
            product_name.innerHTML = data.products[i].name
            product_cat = document.createElement("h4")
            product_cat.innerHTML = data.products[i].category
            sep_line = document.createElement("hr")
            sep_line.className = "separate_line"
            bot_info = document.createElement("div")
            bot_info.className = "bottom_part"
            product_price = document.createElement("p")
            product_price.className = "product_price"
            product_price.innerHTML = data.products[i].price
            price_unit = document.createElement("P")
            price_unit.className = "unit"
            price_unit.innerHTML = "تومان"
            shop_btn = document.createElement("a")
            shop_btn.href = "/buy?id="+data.products[i]._id
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
    }
    );
}
