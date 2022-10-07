
const { default: mongoose } = require("mongoose");
const { userSchema } = require("../schema/User");

const userData = mongoose.model('users',userSchema);

var User = function(user)
{
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.verify_token = user.verify_token;
}

User.getAllData = async() =>{
    const us = await userData.find();
    return us;
}

User.getDataById = async(id) =>{
    const us = await userData.findById(id);
    return us;
}
User.addData = async(data) =>{
    const us = await userData.create(data);
    return us;
}
User.deleteData = async(id)=>{
    const us = await userData.findByIdAndDelete(id);
    return us;
}

User.updateData = async(id,data)=>{
    try {
        const us = await userData.findByIdAndUpdate(id,data,{ new: true });
        return us;
    } catch (error) {
        return error;
    } 
}

User.loginData = async(email,password)=>{
    const user = await userData.findOne({email});
    return user;
}
User.getData = async(verfied_token)=>{
    const user = await userData.findOne({verfied_token});
    return user;
}
module.exports = User;