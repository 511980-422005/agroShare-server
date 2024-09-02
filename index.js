const express = require("express");
const server = express();
const cors = require("cors");

server.use(cors()); 
server.use(express.json());


let investerShare={  
    Qty:0,
    cropName:"",
    sharePrice:"" 
};
let farmersID = [];
let investorsID = [];
let investors = [];
let shares;
 
let investercount=0;

//share handling
let investerQuantity=[];
let investerWallet=[];
let shareQuantity=0;
//

server.get('/',(req,res)=>{
    res.send("Server is running...");
})

server.post('/farmerLoginInfo', (req, res) => {
    const { email, password, phoneNumber, otp } = req.body;
    
        res.status(200).json('Success');
     
});

server.post('/investorLoginInfo', (req, res) => {
    const { email, password, phoneNumber, otp } = req.body;

    if (email === 'investor456@example.com' && password === 'investorPass456' && otp === '654321') {
        investors[phoneNumber] = { email, password, otp };
        res.status(200).json('Yess');
    } else {
        res.status(401).json('Invalid credentials');
    }
});
//use less
server.post('/farmerID', (req, res) => {
    const { phoneNumber  } = req.body;

    farmersID[0]=phoneNumber;
        res.status(200).send( `id saved` );
    
    
});

server.post('/investorID', (req, res) => {
    const { phoneNumber  } = req.body;
  

 for (var x of investerWallet) { 
    //
    if(x.ID==phoneNumber){ 
        res.status(200).send( 'User already exist'  );
        return;
    }
}

 investerWallet.push({ID : phoneNumber,Wallet:10000})
        investorsID.push({investercount,phoneNumber});
       
    // console.log(phoneNumber)
    res.status(200).send( 'User added'  );
});
server.post('/farmerAppliedShare', (req, res) => {
    shareQuantity=0;
    shareQuantity+=10;

    //  //(shareQuantity);
    const { 
        totalAmount, 
        percentage_of_former,
        cropName,
        durationStart,
        durationEnd 
    } = req.body; 

let sharePrice=100;
     
    
    investerShare={  
        Qty:shareQuantity,
        cropName,
        sharePrice 
    };
    shares={ 
        totalAmount, 
        percentage_of_former,
        cropName,
        durationStart,
        durationEnd 
    } ; 
    res.status(200).json(`Farmer applied share details received added ${shareQuantity} shares`);
    
});

server.get('/investorHomepageShares', (req, res) => {
    //  formate
    // let data = {  
    //     Qty:shareQuantity,
    //     cropName,
    //     sharePrice 
    // };
    res.status(200).json(investerShare);
});


server.post('/investorBuyingShares', (req, res) => {
    const    {
        invester_Id,
        quantity
    } = req.body; 
 for (var x of investerWallet) { 
    // console.log( investerWallet);
if(x.ID==invester_Id){
    
    // console.log(shareQuantity+" "+quantity+" "+x.ID);
    
    // console.log(shareQuantity);
 if(quantity<=shareQuantity){
    shareQuantity-=quantity;
        res.status(200).send( `${quantity} Shares purchased successfully`  );
        investerQuantity.push({ID:invester_Id,Qty:quantity})
        investerShare.Qty-=quantity;
    // console.log(investerQuantity);
        return ;
 }
}
  
}
    res.status(200).send( `this user cant buy`  );
});

server.post('/farmerPayingShareAmount', (req, res) => {
    const { totalAmount, breakdown } = req.body;

    walletAmount += breakdown.investorShare;
    res.status(200).json({ message: 'Payment processed successfully' });
});


 
server.post('/farmerProfitShare', (req, res) => {
    const { investorShare } = req.body;
//  console.log(investerQuantity,investerWallet)

// let investerQuantity=[];
// let investerWallet=[];

for(var x in investerWallet){
    for(var y in investerQuantity){
    if(investerWallet[x].ID==investerQuantity[y].ID){
        investerWallet[x].Wallet=10000;
        investerWallet[x].Wallet+=investorShare*investerQuantity[y].Qty/10;
    //     console.log(investerWallet[x].Wallet+" "+investerWallet[x].ID)
    }
    // investerQuantity[x].Qty
    }

}

    res.status(200).json({ message: 'Profit shared successfully' });
});


server.post('/investorWalletAmount', (req, res) => {
    const {InvesterId } =req.body;
    // console.log(investerWallet)
    for (var x of investerWallet) { 
        if(x.ID==InvesterId){
            // //(x.Wallet);
    res.status(200).json({ message:`${x.Wallet}`  });
    investerWallet[0].Wallet=10000;
    return;
        }
    }
    res.status(200).json({ message:`404`  });
});
 
server.get('/admin/clear',()=>{
    console.log("server restart");
    investerShare = {  
        Qty: 0,
        cropName: "",
        sharePrice: "" 
    };
    farmersID = [];
    investorsID = [];
    investors = [];
    shares;
    
    investercount = 0;
    
    // share handling
    investerQuantity = [];
    investerWallet = [];
    shareQuantity = 0;
    
})
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
