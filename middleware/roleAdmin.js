const roleAdmin=(requiredRole) =>(req,res,next) =>{
    if(req.user.userType !== requiredRole){
        return res.status(403).json({message:"Access Denied"})
    }
    next();
}
module.exports=roleAdmin;