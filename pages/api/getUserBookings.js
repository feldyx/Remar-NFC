
import prisma from "../../lib/prisma";

export default async function handle(req, res) {
    const userId = req.query.userId;
    console.log("user", userId) 
    try{

        const tenants = await prisma.tenant.findMany({select:{booking:true, userId:true}});
        console.log("TENANTS",tenants)
        
        let userBookings = tenants.filter((tenant) => tenant.userId === userId);
        userBookings=userBookings.map(({booking, userId})=>{
            return {...booking,userId}
        })
        console.log("USERBOOKING", userBookings)
        return res.status(200).json({ userBookings })
    }
    catch(err){
        return res.status(500).json({ error: err.message })
    }
            
}
