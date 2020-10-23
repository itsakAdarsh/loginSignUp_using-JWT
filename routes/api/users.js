const { json } = require("express");
const express = require("express");
const bcrypt=require("bcrypt");
const gravatar=require("gravatar");
const router = express.Router();
const {check,validationResult}=require("express-validator")


const User=require("../../models/Users");
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

router.post("/", [check("name","Name is required").not().isEmpty(),
                check("email","Enter a valid mail id").isEmail(),
                check("password","Please enter a password with 6 or more characters").isLength({min:6})
                    ],
    async (req, res) => {
    
        //console.log(req.body);
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        //destructuring the main required data
        const{name,email,password}=req.body;
        try{

            //see if user already exists
            let user=await User.findOne({email});
            if(user){
                res.status(400).json({errors:[{msg:"User already exists"}]});  
            }

            //get user gravatar
            const avatar=gravatar.url(email,{
                s:"200",
                r:"pg",
                d:"mm"
            })

            user=new User({
                name,
                email,
                avatar,
                password
            });

            //Encrypt password using bcrypt
            const salt= await bcrypt.genSalt(10);
            user.password= await bcrypt.hash(password,salt);

            //saving it to the database
            await user.save();
            //return jwt

            res.send("user registered");
        }catch(err){

            console.log(err.message);
            res.status(500).send("Server error");
        }
        
        
    }
);
module.exports = router;