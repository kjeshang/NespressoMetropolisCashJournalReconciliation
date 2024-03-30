document.getElementById("creditDebitReconciliation").style.display = "none";

document.getElementById("toggle_cashReconciliation").addEventListener("click", () => {
    document.getElementById("creditDebitReconciliation").style.display = "none";
    document.getElementById("cashReconciliation").style.display = "block";
});

document.getElementById("toggle_creditDebitReconciliation").addEventListener("click", () => {
    document.getElementById("cashReconciliation").style.display = "none";
    document.getElementById("creditDebitReconciliation").style.display = "block";
});

var denomination_list = [
    "hundred","fifty","twenty","ten","five",
    "two","one","quarter","dime","nickel"
];

var tbody = document.getElementById("tbody");
var trElements = tbody.getElementsByTagName("tr");
var numberOfTR = trElements.length;
console.log("Number of <tr> elements in <tbody>: " + numberOfTR);

// *** Calculate Cash Value per Denomination ***
function calculateCashValue(base_amount){
    var denomination_id = base_amount + "_denomination";
    var count_id = base_amount + "_count";
    var value_id = base_amount + "_value";

    // console.log(denomination_id);
    // console.log(count_id);
    // console.log(value_id);

    var denomination = parseFloat(document.getElementById(denomination_id).innerHTML);
    // console.log(denomination);
    var count = parseFloat(document.getElementById(count_id).value);
    // console.log(count);
    
    var product_value = denomination * count;

    console.log(value_id);
    console.log(product_value);

    if(isNaN(product_value)){
        document.getElementById(value_id).innerHTML = 0;
    }
    else{
        document.getElementById(value_id).innerHTML = product_value.toString();
    }

    console.log(value_id);
    console.log(product_value);
}

// *** Calculate Total Cash Value ***
document.getElementById("cash_table").addEventListener("change", () => {
    sumTotal = 0;
    for(i=0; i < numberOfTR; i++){
        var value_id = denomination_list[i] + "_value";
        product_value = parseFloat(document.getElementById(value_id).innerHTML);
        if(!isNaN(product_value)){
            console.log(value_id);
            sumTotal += parseFloat(product_value);
        }
    }
    console.log(sumTotal);
    document.getElementById("total_amount").innerHTML = sumTotal.toString();
});