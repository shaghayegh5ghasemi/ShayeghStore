class Order{
    constructor(p_name,count,c_name,c_id,address,id,price){
        this.product_name = p_name;
        this.count = count;
        this.customer_name = c_name;
        this.customer_id = c_id;
        this.recv_address = address;
        this.date = new Date();
        this.price = price;
        this.sell_id = id;
    }
}

module.exports = Order;