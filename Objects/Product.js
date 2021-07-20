class Product{
    constructor(name,category,price,count,image){
        this.name = name;
        this.category = category;
        this.price = price;
        this.count = count;
        this.sold = 0;
        this.image= image;
    }
}

module.exports = Product;