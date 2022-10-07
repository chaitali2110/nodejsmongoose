const UserModel = require("./../models/user.models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

exports.findAll = async (req,res)=>{
    try{
        var userData = await UserModel.getAllData();
        return res.status(200).send({ message: "Success", data: userData });
  
    } catch (err) {
        return res.status(400).send({ error: "Failed", error: err });
    }
}
exports.create = async (req,res)=>{
    try{
        if(!req.body)
        {
            return res.status(400).send({ error: "Failed"});
        }
        else
        {
            const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
            let usersdetail = {       
                "name": req.body.name,
                "username":req.body.username,       
                "email": req.body.email,       
                "password": encryptedPassword
            }  
            const userData = await UserModel.addData(usersdetail);
            return res.status(200).send({ message: "Success", data: userData });
        }
  
    } catch (err) {
        return res.status(400).send({ error: "Failed", error: err });
    }
}

exports.findOne = async (req,res)=>{
    try{
        var userData = await UserModel.getDataById(req.params.id);
        return res.status(200).send({ message: "Success", data: userData });
  
    } catch (err) {
        return res.status(400).send({ error: "Failed", error: err });
    }
}

exports.delete = async (req,res)=>{
    try{
        var userData = await UserModel.deleteData(req.params.id);
        return res.status(200).send({ message: "Success", data: userData });
  
    } catch (err) {
        return res.status(400).send({ error: "Failed", error: err });
    }
}

exports.update = async(req,res)=>{
    try{
        
        const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            time: Date(),
            userId: 12,
        }
        const token =  jwt.sign(data, jwtSecretKey);
        let usersdetail = {       
            "name": req.body.name,
            "username":req.body.username,       
            "email": req.body.email,       
            "password": encryptedPassword,
            "verfied_token":token
        }  
        var users = await UserModel.updateData(req.params.id,usersdetail);
        return res.status(200).send({ message: "User updated successfully", data: users });
    }
    catch(err){
        console.log(err);
       return res.status(400).send({ message: "Could not update user" });
    }
 }

 exports.login = async (req,res)=>{
    try{
       
       const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
 
       const user = await UserModel.loginData(req.body.email,encryptedPassword);
       const isPasswordMatched = await bcrypt.compare(req.body.password,user.password);
        
       if(isPasswordMatched)
       {
          const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
             expiresIn: process.env.JWT_EXPIRE,
         });
       
         const users = {
          "name" : user.name,
          "username" : user.username,
          "email" : user.email,
          "verfied_token" : token,
        }
        const update = await UserModel.updateData(user.id,users);
        console.log(token);
        console.log(update.id);
        
        return res.status(200).send({ message: "User Login successfully",data :update });
       }
       else
       {
          return res.status(400).json({ error: 'Invalid Email and Password' });
       }
 
      
    } catch(err){
        console.log(err);
       return res.status(400).send({ message: "Login Invalid" });
    }
 }
exports.userDataa = async (req,res)=>{
    try{
       var users = await UserModel.getData(req.headers['auth-token']);
       const userss = {
          "name":users.name,
          "username":users.username,
          "email":users.email
       }
       return res.status(200).send({ message: "Success", data: userss});
 
    } catch (err) {
       return res.status(400).send({ error: "Failed", error: err });
    }
    
 }