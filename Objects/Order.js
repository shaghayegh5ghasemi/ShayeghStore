class Order{
    constructor(p_name,count,c_name,address,id,price){
        this.product_name = p_name;
        this.count = count;
        this.customer_name = c_name;
        this.recv_address = address;
        this.date = new Date();
        this.price = price;
        this.sell_id = id;
    }
}

module.exports = Order;