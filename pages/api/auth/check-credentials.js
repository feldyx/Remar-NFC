import prisma from "../../../lib/prisma";
import { compare } from 'bcrypt'

export default async function checkCredentials(req, res) {
    const { email, password } = req.body
    // console.log("creating session",req.body)

    try {
        const pre_user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });


        if (!pre_user) {
            //user does not exist, display message email not registered
            return res.status(500).json({status: 500 ,message: "Email not registered" })
        }

        if(!pre_user.password){
            return res.status(500).json({status: 500, message: "Email Registered with Google Provider" })
        }
        //hash the input password, then check with database password
        const isSamePass = await compare(password, pre_user.password)

        if (!isSamePass || pre_user.email !== email) {
            return res.status(500).json({status: 500, message: "Password is incorrect" })
        }

        //CAN RETURN WTV U WANT ABOUT THE USER
        const user = {
            id : pre_user.id,
            name: pre_user.name,
            email:pre_user.email,
            role: pre_user.role,
            phoneNumber: pre_user.phoneNumber,
        }
        return res.status(200).json({ user, status: 200 })
    }
    catch (error) {
        //console.log(error)
        return res.status(500).json({ error, message: "Login Error" })
    }



}

// export default withCors(checkCredentials)