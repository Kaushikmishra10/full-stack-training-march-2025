class Product{
    constructor(id, name, price, quantity){
        this.id = id
        this.name = name
        this.price = price
        this.quantity = quantity
    }

    getTotalPrice(){
        return this.price * this.quantity
    }

    updateQuantity(qty){
        return this.quantity = qty
    }

    getProductDetails(){
        return `ID: ${this.id}, Name: ${this.name}, Price: ${this.price}, Quantity: ${this.quantity}`
    }
}

const p1 = new Product(101, "Kaushik", 12, 2)

console.log(p1.updateQuantity(20))
console.log(p1.getTotalPrice())
console.log(p1.getProductDetails())