
import prisma from "../../lib/prisma";

export default async function handle(req, res) {
    const userId = req.query.userId;
    console.log("user", userId) 
    try{

        const tenants = await prisma.tenant.findMany({});
        
        
        const userBookings = tenants.filter((tenant) => tenant.userId === userId);
        
        return res.status(200).json({ userBookings })
    }
    catch(err){
        return res.status(500).json({ error: err.message })
    }
            
}
