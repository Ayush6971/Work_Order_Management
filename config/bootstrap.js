const User = require('../models/user')
const Item = require('../models/item')
const Role = require('../models/role')


Role.findOne({authority: "ROLE_ADMIN"}).exec(async function (err, foundRole) {
    if (!foundRole){
      await Role.insertMany([
        {authority: "ROLE_CUSTOMER"},
        {authority: "ROLE_ADMIN"},
      ]);
    }
});

User.findOne({phoneNo: '9406561244'}).exec(async function (err, findFirstUser) {
    const findAdminRole = await Role.findOne({authority: "ROLE_ADMIN"});
    console.log("🚀 ~ file: bootstrap.js ~ line 8 ~ createDocument ~ findFirstUser", findAdminRole.id)
    if(!findFirstUser){
    await User.insertMany([
        {
        firstName: 'Ayush',
        lastName: 'Sahu',
        phoneNo: 9406561244,
        password: '12345',
        email: 'ayushsahu76@gmail.com',
        role:findAdminRole.id
        }]
        );        
    }
});

Item.findOne({itemName: 'Borewell Digging'}).exec(async function (err, findFirstItem) {
    if(!findFirstItem){
    await Item.insertMany([
        {itemName: 'Borewell Digging'},
        {itemName: 'Casing Pipe'},
        {itemName: 'Submersible Pump'}

    ]);
}
});
