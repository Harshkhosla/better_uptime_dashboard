import { Prismaclient } from "prisma/client";
import {Router} from "express"




const router:Router = Router();

router.post('/website',async(req,res)=>{
    
    Prismaclient.user.create({
    data:{
        email:"harsh",
        name:'ksdvjnkdvsj'
    }
    })

})

export const WebsiteRouter = router


