const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/emp", function (req, res) {
    res.render("emp");
});

app.post("/", function (req, res) {

    var descision;
    const eval = req.body.last_eval;
    const num_pro = req.body.num_projects;
    const hours = req.body.monthly_hrs;
    const time = req.body.time_spent;
    var accident = req.body.work_acc;
    var promo = req.body.promotion;
    var sal = req.body.salary;

    if(accident === "Yes")  accident = 1;
    else accident = 0;

    if(promo === "Yes")  promo = 1;
    else promo = 0;

    if(sal === "low") sal = 1;
    else if(sal === "medium") sal = 2;
    else sal = 0; 

    console.log(eval);
    console.log(num_pro);
    console.log(hours);
    console.log(time);
    console.log(accident);
    console.log(promo);
    console.log(sal);
    
    const s_score = ((((((((0.6295218237420073) + (eval * (0.035208517463742615))) + (num_pro * (-0.03631403650494394))) + ((hours) * (0.004942809459116664))) + ((time) * (-0.03383524698886705))) + ((accident) * (0.008638397333966699))) + ((promo) * (0.006580510274496388))) + ((sal) * (0.0019402286082917304)))/1000;
    const churn = (((((((((-2.0338005263272314) + ((s_score) * (-0.9544529862193241))) + ((eval) * (0.11930393469640652))) + ((num_pro) * (-0.3147633828687966))) + ((hours) * (0.17923854518520146))) + ((time) * (0.3569746357897162))) + ((accident) * (-0.49353029118200714))) + ((promo) * (-0.21796527916379996))) + ((sal) * (0.0317269961911817)))/100;
    
    console.log(s_score);
    console.log(churn);

    if(churn > 0.5){
        descision = "STAY";
    }
    else{
        descision = "RESIGN";
    }

    res.render("emp",{
        satisfaction : s_score,
        churn : descision
    });
});

app.listen(3000, function () {
    console.log("server started");
});