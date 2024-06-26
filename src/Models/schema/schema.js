const graphql = require('graphql');
const Branches = require('../orderModule/Branches');
const Tables = require('../orderModule/Tables')
const Kitchens = require('../orderModule/Kitchens')
const Orders = require('../orderModule/Orders')
const Products = require ('../orderModule/Products')
const Inventory = require('../inventoryModule/Inventory')
const Supplier = require ('../inventoryModule/Supplier')
const Warehouse = require ('../inventoryModule/Warehouse')

const { 
    GraphQLObjectType, GraphQLString, 
    GraphQLID, GraphQLInt,GraphQLSchema, GraphQLFloat,
    GraphQLList,GraphQLNonNull 
} = graphql;

//Schema defines data on the Graph like object types(book type), relation between 
//these object types and describes how it can reach into the graph to interact with 
//the data to retrieve or mutate the data   


//---------------------Order Module ------------------------\\

const BranchesType = new GraphQLObjectType({
    name: 'Branches',
    fields: () => ({
        id: { type: GraphQLID },
        location: { type: GraphQLString }
    })
})
const TablesType = new GraphQLObjectType({
    name: 'Tables',
    fields: () => ({
        id: { type: GraphQLID },
        number: { type: GraphQLInt },
        branchId : {type : GraphQLString},
        status : {type : GraphQLString},
        currentOrder : {type : GraphQLString}
    })
})
const OrdersType = new GraphQLObjectType({
    name: 'Orders',
    fields: () => ({
        id: { type: GraphQLID },
        tableId: { type: GraphQLString },
        branchId : {type : GraphQLString},
        status : {type : GraphQLString},
        products : {type : GraphQLString}
    })
})
const KitchensType = new GraphQLObjectType({
    name: 'Kitchens',
    fields: () => ({
        id: { type: GraphQLID },
        ktype : {type : GraphQLString},
        branchId : {type : GraphQLString},
        products : {type : GraphQLString}
    })
})
const ProductsType = new GraphQLObjectType({
    name: 'products',
    fields: () => ({
        id: { type: GraphQLID },
        name : {type : GraphQLString},
        kitchenId : {type : GraphQLString},
        price : {type : GraphQLInt}
    })
})

//-----------------------Inventory Module---------------------//


const InventoryType = new GraphQLObjectType({
    name: 'inventory',
    fields: () => ({
        id: { type: GraphQLID },
        productId : {type : GraphQLString},
        branchId : {type : GraphQLString},
        warehouseId : {type : GraphQLString},
        quantiry : {type : GraphQLInt},
        loss : {type : graphql.GraphQLFloat}
    })
})

const SupplierType = new GraphQLObjectType({
    name: 'supplier',
    fields: () => ({
        id: { type: GraphQLID },
        name : {type : GraphQLString},
        contact : {type : GraphQLString}
    })
})
const WarehouseType = new GraphQLObjectType({
    name: 'warehouse',
    fields: () => ({
        id: { type: GraphQLID },
        name : {type : GraphQLString},
        branchId : {type : GraphQLString}
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Branches:{
            type: BranchesType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Branches.findById(args.id);
            }
        },
        AllBranches:{
            type: new GraphQLList(BranchesType),
            resolve(parent, args) {
                return Branches.find({});
            }
        },
        Tables:{
            type: TablesType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Tables.findById(args.id);
            }
        },
        AllTables:{
            type: new GraphQLList(TablesType),
            resolve(parent, args) {
                return Tables.find({});
            }
        },
        Kitchens:{
            type: KitchensType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Kitchens.findById(args.id);
            }
        },
        AllKitchens:{
            type: new GraphQLList(KitchensType),
            resolve(parent, args) {
                return Kitchens.find({});
            }
        },
        Orders:{
            type: OrdersType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Orders.findById(args.id);
            }
        },
        AllOrders:{
            type: new GraphQLList(OrdersType),
            resolve(parent, args) {
                return Orders.find({});
            }
        },
        Products:{
            type: ProductsType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return ProductsType.findById(args.id);
            }
        },
        AllProducts:{
            type: new GraphQLList(ProductsType),
            resolve(parent, args) {
                return ProductsType.find({});
            }
        },


        Inventory:{
            type: InventoryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Inventory.findById(args.id);
            }
        },
        AllInventory:{
            type: new GraphQLList(InventoryType),
            resolve(parent, args) {
                return Inventory.find({});
            }
        },
        Supplier:{
            type: SupplierType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Supplier.findById(args.id);
            }
        },
        AllSupplier:{
            type: new GraphQLList(SupplierType),
            resolve(parent, args) {
                return Supplier.find({});
            }
        },
        Warehouse:{
            type: SupplierType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Warehouse.findById(args.id);
            }
        },
        AllWarehouse:{
            type: new GraphQLList(SupplierType),
            resolve(parent, args) {
                return Warehouse.find({});
            }
        },

    }
});
 
//Very similar to RootQuery helps user to add/update to the database.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      
        addBranches: {
            type: BranchesType,
            args: {
                //GraphQLNonNull make these field required
                location: { type: new GraphQLNonNull(GraphQLString) },
                
            },
            resolve(parent, args) {
                let branches = new Branches({
                    location: args.location,
                });
                return branches.save();
            }
        },
        updateBranches: {
            type: BranchesType,
            args: {
                //GraphQLNonNull make these field required
                location: { type: new GraphQLNonNull(GraphQLString) },
                id : {type : new GraphQLNonNull(GraphQLID)}
                
            },
            resolve: (parent, args) => {
                if (!args.id) return;
                return Branches.findByIdAndUpdate(
                    {
                        _id: args.id
                    },
                    {
                        $set: {
                        location: args.location
                        }
                    }
                );
            }
        },
        deleteBranches: {
            type: BranchesType,
            args: {
                //GraphQLNonNull make these field required
                id : {type : new GraphQLNonNull(GraphQLID)} 
            },
            resolve: (parent, args) => {
                if (!args.id) return;
                return Branches.findByIdAndDelete(
                    {
                        _id: args.id
                    }
                );
            }
        },
        
        addTables: {
            type: TablesType,
            args: {
                //GraphQLNonNull make these field required
                number : { type: new GraphQLNonNull(GraphQLInt) },
                branchId : { type: new GraphQLNonNull(GraphQLString) },
                status : { type: new GraphQLNonNull(GraphQLString) },
                currentOrder : { type: new GraphQLNonNull(GraphQLString) },
                
            },
            resolve(parent, args) {
                let tables = new Tables({
                    number: args.number,
                    branchId : args.branchId,
                    status : args.status,
                    currentOrder : args.currentOrder
                });
                return tables.save();
            }
        },
        updateTables: {
            type: TablesType,
            args: {
                //GraphQLNonNull make these field required
                branchId: { type: new GraphQLNonNull(GraphQLString) },
                status: { type: new GraphQLNonNull(GraphQLString) },
                currentOrder: { type: new GraphQLNonNull(GraphQLString) },
                number : {type : new GraphQLNonNull(GraphQLInt)},
                id : {type : new GraphQLNonNull(GraphQLID)}
                
            },
            resolve: (parent, args) => {
                if (!args.id) return;
                return Tables.findByIdAndUpdate(
                    {
                        _id: args.id
                    },
                    {
                        $set: {
                        number: args.number,
                        branchId : args.branchId,
                        status : args.status,
                        currentOrder : args.currentOrder
                        }
                    }
                );
            }
        },
        deleteTables: {
            type: TablesType,
            args: {
                //GraphQLNonNull make these field required
                id : {type : new GraphQLNonNull(GraphQLID)} 
            },
            resolve: (parent, args) => {
                if (!args.id) return;
                return Tables.findByIdAndDelete(
                    {
                        _id: args.id
                    }
                );
            }
        },

        
        addKitchens: {
            type: KitchensType,
            args: {
                //GraphQLNonNull make these field required
                ktype : { type: new GraphQLNonNull(GraphQLString) },
                branchId : { type: new GraphQLNonNull(GraphQLString) },
                products : { type: new GraphQLNonNull(GraphQLString) },
                
            },
            resolve(parent, args) {
                let kitchens = new Kitchens({
                    ktype: args.ktype,
                    branchId : args.branchId,
                    products : args.products
                });
                return kitchens.save();
            }
        },
        updateKitchens: {
            type: KitchensType,
            args: {
                //GraphQLNonNull make these field required
                ktype: { type: new GraphQLNonNull(GraphQLString) },
                branchId: { type: new GraphQLNonNull(GraphQLString) },
                products: { type: new GraphQLNonNull(GraphQLString) },
                id : {type : new GraphQLNonNull(GraphQLID)}
                
            },
            resolve: (parent, args) => {
                if (!args.id) return;
                return Kitchens.findByIdAndUpdate(
                    {
                        _id: args.id
                    },
                    {
                        $set: {
                        ktype: args.ktype,
                        branchId : args.branchId,
                        products : args.products
                        }
                    }
                );
            }
        },
        deleteKitchens: {
            type: KitchensType,
            args: {
                //GraphQLNonNull make these field required
                id : {type : new GraphQLNonNull(GraphQLID)} 
            },
            resolve: (parent, args) => {
                if (!args.id) return;
                return Kitchens.findByIdAndDelete(
                    {
                        _id: args.id
                    }
                );
            }
        },
        

        addOrders: {
            type: OrdersType,
            args: {
                //GraphQLNonNull make these field required
                tableId : { type: new GraphQLNonNull(GraphQLString) },
                branchId : { type: new GraphQLNonNull(GraphQLString) },
                products : { type: new GraphQLNonNull(GraphQLString) },
                status : { type: new GraphQLNonNull(GraphQLString) },
                
            },
            resolve(parent, args) {
                let orders = new Orders({
                    tableId: args.tableId,
                    branchId : args.branchId,
                    products : args.products,
                    status : args.status
                });
                return orders.save();
            }
        },
        updateOrders: {
            type: OrdersType,
            args: {
                //GraphQLNonNull make these field required
                tableId: { type: new GraphQLNonNull(GraphQLString) },
                branchId: { type: new GraphQLNonNull(GraphQLString) },
                status: { type: new GraphQLNonNull(GraphQLString) },
                products: { type: new GraphQLNonNull(GraphQLString) },
                id : {type : new GraphQLNonNull(GraphQLID)}
                
            },
            resolve: (parent, args) => {
                if (!args.id) return;
                return Orders.findByIdAndUpdate(
                    {
                        _id: args.id
                    },
                    {
                        $set: {
                        tableId: args.tableId,
                        branchId : args.branchId,
                        products : args.products,
                        status : args.status
                        }
                    }
                );
            }
        },
        deleteOrders: {
            type: OrdersType,
            args: {
                //GraphQLNonNull make these field required
                id : {type : new GraphQLNonNull(GraphQLID)} 
            },
            resolve: (parent, args) => {
                if (!args.id) return;
                return Orders.findByIdAndDelete(
                    {
                        _id: args.id
                    }
                );
            }
        },
        


        addProducts: {
            type: ProductsType,
            args: {
                //GraphQLNonNull make these field required
                name : { type: new GraphQLNonNull(GraphQLString) },
                kitchenId : { type: new GraphQLNonNull(GraphQLString) },
                price : { type: new GraphQLNonNull(GraphQLInt) }
                
            },
            resolve(parent, args) {
                let products = new Products({
                    name: args.name,
                    kitchenId : args.kitchenId,
                    price : args.price
                });
                return products.save();
            }
        },
        updateProducts: {
            type: ProductsType,
            args: {
                //GraphQLNonNull make these field required
                name: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLInt) },
                kitchenId: { type: new GraphQLNonNull(GraphQLString) },
                id : {type : new GraphQLNonNull(GraphQLID)}
                
            },
            resolve: (parent, args) => {
                if (!args.id) return;
                return Products.findByIdAndUpdate(
                    {
                        _id: args.id
                    },
                    {
                        $set: {
                        name: args.name,
                        price : args.price,
                        kitchenId : args.kitchenId
                        }
                    }
                );
            }
        },
        deleteProducts: {
            type: ProductsType,
            args: {
                //GraphQLNonNull make these field required
                id : {type : new GraphQLNonNull(GraphQLID)} 
            },
            resolve: (parent, args) => {
                if (!args.id) return;
                return Products.findByIdAndDelete(
                    {
                        _id: args.id
                    }
                );
            }
        },


        addInventory: {
            type: InventoryType,
            args: {
                //GraphQLNonNull make these field required                
                productId: { type: new GraphQLNonNull(GraphQLString) },
                branchId: { type: new GraphQLNonNull(GraphQLString) },
                warehouseId: { type: new GraphQLNonNull(GraphQLString) },
                quantity: { type: new GraphQLNonNull(GraphQLInt) },
                loss: { type: new GraphQLNonNull(GraphQLFloat) },
                
            },
            resolve(parent, args) {
                let inventory = new Inventory({
                    productId: args.productId,
                    branchId : args.branchId,
                    warehouseId : args.wardhouseId,
                    quantity : args.quantity,
                    loss : args.loss
                });
                return inventory.save();
            }
        },
        updateInventory: {
            type: InventoryType,
            args: {
                //GraphQLNonNull make these field required
                id : {type : new GraphQLNonNull(GraphQLID)},
                productId: { type: new GraphQLNonNull(GraphQLString) },
                branchId: { type: new GraphQLNonNull(GraphQLString) },
                warehouseId: { type: new GraphQLNonNull(GraphQLString) },
                quantity: { type: new GraphQLNonNull(GraphQLInt) },
                loss: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve: (parent, args) => {
                if (!args.id) return;
                return Inventory.findByIdAndUpdate(
                    {
                        _id: args.id
                    },
                    {
                        $set: {
                            productId: args.productId,
                            branchId : args.branchId,
                            warehouseId : args.wardhouseId,
                            quantity : args.quantity,
                            loss : args.loss
                        }
                    }
                );
            }
        },
        deleteInventory: {
            type: InventoryType,
            args: {
                //GraphQLNonNull make these field required
                id : {type : new GraphQLNonNull(GraphQLID)} 
            },
            resolve: (parent, args) => {
                if (!args.id) return;
                return Inventory.findByIdAndDelete(
                    {
                        _id: args.id
                    }
                );
            }
        },

        addSupplier: {
            type: SupplierType,
            args: {
                //GraphQLNonNull make these field required                
                productId: { type: new GraphQLNonNull(GraphQLString) },
                branchId: { type: new GraphQLNonNull(GraphQLString) },
                warehouseId: { type: new GraphQLNonNull(GraphQLString) },
                quantity: { type: new GraphQLNonNull(GraphQLInt) },
                loss: { type: new GraphQLNonNull(GraphQLFloat) },
                
            },
            resolve(parent, args) {
                let supplier = new Supplier({
                    productId: args.productId,
                    branchId : args.branchId,
                    warehouseId : args.wardhouseId,
                    quantity : args.quantity,
                    loss : args.loss
                });
                return supplier.save();
            }
        },
        updateSupplier: {
            type: SupplierType,
            args: {
                //GraphQLNonNull make these field required
                id : {type : new GraphQLNonNull(GraphQLID)},
                name: { type: new GraphQLNonNull(GraphQLString) },
                contact: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                if (!args.id) return;
                return Supplier.findByIdAndUpdate(
                    {
                        _id: args.id
                    },
                    {
                        $set: {
                            name: args.name,
                            contact : args.contact
                        }
                    }
                );
            }
        },
        deleteSupplier: {
            type: SupplierType,
            args: {
                //GraphQLNonNull make these field required
                id : {type : new GraphQLNonNull(GraphQLID)} 
            },
            resolve: (parent, args) => {
                if (!args.id) return;
                return Supplier.findByIdAndDelete(
                    {
                        _id: args.id
                    }
                );
            }
        },

        addWarehouse: {
            type: WarehouseType,
            args: {
                //GraphQLNonNull make these field required                
                name: { type: new GraphQLNonNull(GraphQLString) },
                branchId: { type: new GraphQLNonNull(GraphQLString) },
               
            },
            resolve(parent, args) {
                let warehouse = new Warehouse({
                    name: args.name,
                    branchId : args.branchId,
                    
                });
                return warehouse.save();
            }
        },
        updateWarehouse: {
            type: WarehouseType,
            args: {
                //GraphQLNonNull make these field required
                id : {type : new GraphQLNonNull(GraphQLID)},
                name: { type: new GraphQLNonNull(GraphQLString) },
                branchId: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                if (!args.id) return;
                return Warehouse.findByIdAndUpdate(
                    {
                        _id: args.id
                    },
                    {
                        $set: {
                            name: args.name,
                            branchId : args.branchId
                        }
                    }
                );
            }
        },
        deleteWarehouse: {
            type: WarehouseType,
            args: {
                //GraphQLNonNull make these field required
                id : {type : new GraphQLNonNull(GraphQLID)} 
            },
            resolve: (parent, args) => {
                if (!args.id) return;
                return Warehouse.findByIdAndDelete(
                    {
                        _id: args.id
                    }
                );
            }
        },
    }
});

//Creating a new GraphQL Schema, with options query which defines query 
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation:Mutation
});
