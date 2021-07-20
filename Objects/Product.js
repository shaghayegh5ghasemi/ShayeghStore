class Product{
    constructor(name,price,count,image){
        this.name = name;
        this.category = "دسته بندی نشده";
        this.price = price;
        this.count = count;
        this.sold = 0;
        this.image= image;
    }
}

module.exports = Product;