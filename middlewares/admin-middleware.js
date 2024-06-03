import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

function authenticateAdmin(req,res,next){
    const token =req.cookies.token;
    console.log(token)

    jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        console.log(err);

        if(err) return res.sendStatus(403)

            req.user=user;
            console.log(req.user.role);
            if(req.user.role !=="admin"){
                return res.send("Not authenticated")
            }
            next()
    })
}

export default authenticateAdmin