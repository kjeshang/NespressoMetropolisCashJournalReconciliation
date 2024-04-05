// *** Initialization Variables***
document.getElementById("creditDebitReconciliation").style.display = "none";
document.getElementById("open_cashReconciliation").style.display = "none";
document.getElementById("close_cashReconciliation").style.display = "none";

// *** Reset Webpage ***
function reset(){
    location.reload();
}

// *** Toggle between Cash and Credit Reconciliation ***
document.getElementById("toggle_cashReconciliation").addEventListener("click", () => {
    document.getElementById("creditDebitReconciliation").style.display = "none";
    document.getElementById("cashReconciliation").style.display = "block";
});

document.getElementById("toggle_creditDebitReconciliation").addEventListener("click", () => {
    document.getElementById("cashReconciliation").style.display = "none";
    document.getElementById("creditDebitReconciliation").style.display = "block";
});

// *** Toggle Opening & Closing Summaries for Cash Reconciliation ***
document.getElementById("toggle_openCashReconciliation").addEventListener("click", () => {
    document.getElementById("open_cashReconciliation").style.display = "block";
    document.getElementById("close_cashReconciliation").style.display = "none";
});

document.getElementById("toggle_closeCashReconciliation").addEventListener("click", () => {
    document.getElementById("close_cashReconciliation").style.display = "block";
    document.getElementById("open_cashReconciliation").style.display = "none";
});

// CASH RECONCILIATION --------------------------------------------------------------------------------------------------

var denomination_list = [
    "hundred","fifty","twenty","ten","five",
    "two","one","quarter","dime","nickel"
];

var tbody = document.getElementById("tbody_cash");
var trElements = tbody.getElementsByTagName("tr");
var numberOfTR = trElements.length;
console.log("Number of <tr> elements in <tbody>: " + numberOfTR);

// *** Calculate Cash Value per Denomination ***
function calculateCashValue(base_amount){
    var denomination_id = base_amount + "_denomination";
    var count_id = base_amount + "_count";
    var value_id = base_amount + "_value";

    var denomination = parseFloat(document.getElementById(denomination_id).innerHTML);
    var count = parseFloat(document.getElementById(count_id).value);
    var product_value = denomination * count;

    if(isNaN(product_value)){
        document.getElementById(value_id).innerHTML = 0;
    }
    else{
        document.getElementById(value_id).innerHTML = product_value.toString();
    }
}

// *** Outcome of Cash Reconciliation ***
function finalizeCashOutcome(shift){
    // var total_amount = parseFloat(document.getElementById("total_amount").innerHTML.toString());
    if(shift == "open"){
        // console.log(shift);
        var total_amount = parseFloat(document.getElementById("total_amount_open").innerHTML.toString());
        // console.log(total_amount);
        var cashJournalAmount = parseFloat(document.getElementById("cashJournalAmount_open").innerHTML);
        // console.log(cashJournalAmount);
        var outcome = "";
        if(cashJournalAmount > total_amount){
            outcome = "Short";
        }
        else if(cashJournalAmount < total_amount){
            outcome = "Over";
        }
        else{
            outcome = "Balanced"
        }
        document.getElementById("outcome_cashOpen").innerHTML = outcome;
        // console.log(outcome);
        difference = Math.abs(total_amount - cashJournalAmount);
        document.getElementById("difference_cashOpen").innerHTML = difference;
        // console.log(difference);
    }
    else if(shift == "close"){
        console.log(shift);
        var total_amount = parseFloat(document.getElementById("total_amount_close").innerHTML.toString());
        console.log(total_amount);
        var cashJournalAmount = parseFloat(document.getElementById("cashJournalAmount_close").value);
        console.log(cashJournalAmount);
        var outcome = "";
        if(cashJournalAmount > total_amount){
            outcome = "Short";
        }
        else if(cashJournalAmount < total_amount){
            outcome = "Over";
        }
        else{
            outcome = "Balanced"
        }
        document.getElementById("outcome_cashClose").innerHTML = outcome;
        console.log(outcome);
        difference = Math.abs(total_amount - cashJournalAmount);
        document.getElementById("difference_cashClose").innerHTML = difference.toString();
        console.log(difference);
    }
}

// *** Calculate Total Cash Value ***
function calculateTotalCashValue(shift){
    sumTotal = 0;
    for(i=0; i < numberOfTR; i++){
        var value_id = denomination_list[i] + "_value";
        product_value = parseFloat(document.getElementById(value_id).innerHTML);
        if(!isNaN(product_value)){
            sumTotal += parseFloat(product_value);
        }
    }
    var id = "total_amount_" + shift;
    document.getElementById(id).innerHTML = sumTotal.toString();
}

document.getElementById("cash_table").addEventListener("change", () => {
    // sumTotal = 0;
    // for(i=0; i < numberOfTR; i++){
    //     var value_id = denomination_list[i] + "_value";
    //     product_value = parseFloat(document.getElementById(value_id).innerHTML);
    //     if(!isNaN(product_value)){
    //         sumTotal += parseFloat(product_value);
    //     }
    // }
    // document.getElementById("total_amount_open").innerHTML = sumTotal.toString();
    // document.getElementById("total_amount_close").innerHTML = sumTotal.toString();

    calculateTotalCashValue("open");
    calculateTotalCashValue("close");
    for(i=0; i < numberOfTR; i++){
        var count_id = denomination_list[i] + "_count";
        calculateTotalCashValue("open");
        calculateTotalCashValue("close");
        document.getElementById(count_id).addEventListener("change", finalizeCashOutcome("open"));
        document.getElementById(count_id).addEventListener("change", finalizeCashOutcome("close"));
    }

    // document.getElementById("toggle_openCashReconciliation").addEventListener("click", () => {
    //     for(i=0; i < numberOfTR; i++){
    //         var count_id = denomination_list[i] + "_count";
    //         calculateTotalCashValue("open");
    //         document.getElementById(count_id).addEventListener("change", finalizeCashOutcome("open"));
    //     }
    // });
    // document.getElementById("cash_table").addEventListener("change", finalizeCashOutcome("open"));

    // document.getElementById("toggle_closeCashReconciliation").addEventListener("click", () => {
    //     for(i=0; i < numberOfTR; i++){
    //         var count_id = denomination_list[i] + "_count";
    //         calculateTotalCashValue("close");
    //         document.getElementById(count_id).addEventListener("change", finalizeCashOutcome("close"));
    //     }
    // });
    // document.getElementById("cash_table").addEventListener("change", finalizeCashOutcome("close"));
});

document.getElementById("cashJournalAmount_close").addEventListener("change", () =>{
    calculateTotalCashValue("open");
    calculateTotalCashValue("close");
    finalizeCashOutcome("open");
    finalizeCashOutcome("close");
});

// CREDIT & DEBIT RECONCILIATION --------------------------------------------------------------------------------------------------