// *** Initialization Variables***
document.getElementById("creditDebitReconciliation").style.display = "none";
document.getElementById("open_cashReconciliation").style.display = "none";
document.getElementById("close_cashReconciliation").style.display = "none";
document.getElementById("creditCash_summary").style.display = "none";

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

// *** Toggle Credit & Debit Reconciliation Summary ***
document.getElementById("toggle_creditDebitSummary").addEventListener("click", () =>{
    if(document.getElementById("creditCash_summary").style.display === "none"){
        document.getElementById("creditCash_summary").style.display = "block";
    }
    else if(document.getElementById("creditCash_summary").style.display === "block"){
        document.getElementById("creditCash_summary").style.display = "none";
    }
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
        var total_amount = parseFloat(document.getElementById("total_amount_open").innerHTML.toString());
        var cashJournalAmount = parseFloat(document.getElementById("cashJournalAmount_open").innerHTML);
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
        difference = Math.abs(total_amount - cashJournalAmount);
        document.getElementById("difference_cashOpen").innerHTML = difference;
    }
    else if(shift == "close"){
        console.log(shift);
        var total_amount = parseFloat(document.getElementById("total_amount_close").innerHTML.toString());
        var cashJournalAmount = parseFloat(document.getElementById("cashJournalAmount_close").value);
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
        difference = Math.abs(total_amount - cashJournalAmount);
        document.getElementById("difference_cashClose").innerHTML = difference.toString();
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

var salesDesk_list = ["A","B","D","G","F","E","H"];

var tbody_creditDebit = document.getElementById("tbody_creditDebit");
var trElements_creditDebit = tbody_creditDebit.getElementsByTagName("tr");
var numberOfTR_creditDebit = trElements_creditDebit.length;
console.log("Number of <tr> elements in <tbody>: " + numberOfTR_creditDebit);

// *** Outcome for a specific sales desk ***
function calculateCreditDebitValue(salesDesk){
    
    var terminal_amount = parseFloat(document.getElementById("terminal_"+salesDesk).value);
    if(isNaN(terminal_amount)){
        terminal_amount = 0;
    }
    
    var pos_amount = parseFloat(document.getElementById("pos_"+salesDesk).value);
    if(isNaN(pos_amount)){
        pos_amount = 0;
    }
    
    var register_amount = parseFloat(document.getElementById("register_"+salesDesk).value);
    if(isNaN(register_amount)){
        register_amount = 0;
    }

    var cashJournal_amount = parseFloat(pos_amount) + parseFloat(register_amount);
    var difference = Math.abs(parseFloat(terminal_amount) - parseFloat(cashJournal_amount));
    var outcome = "";
    if(terminal_amount > cashJournal_amount){
        outcome = "Over";
    }
    else if(terminal_amount < cashJournal_amount){
        outcome = "Short";
    }
    else if(terminal_amount == cashJournal_amount){
        outcome = "Balanced";
    }

    document.getElementById("difference_"+salesDesk).innerHTML = difference;
    document.getElementById("outcome_"+salesDesk).innerHTML = outcome;
}

// *** Find overall outcome ***
function finalizeCreditDebitOutcome(){
    var total_terminalAmount = 0;
    var total_posAmount = 0;
    var total_registerAmount = 0;

    for(i=0; i < numberOfTR_creditDebit; i++){
        salesDesk = salesDesk_list[i];
        console.log(salesDesk);
        
        var terminal_amount = parseFloat(document.getElementById("terminal_"+salesDesk).value);
        console.log(terminal_amount);
        if(!isNaN(terminal_amount)){
            total_terminalAmount += parseFloat(terminal_amount)
        };
        
        var pos_amount = parseFloat(document.getElementById("pos_"+salesDesk).value);
        console.log(pos_amount);
        if(!isNaN(pos_amount)){
            total_posAmount += parseFloat(pos_amount);
        }
        
        var register_amount = parseFloat(document.getElementById("register_"+salesDesk).value);
        console.log(register_amount);
        if(!isNaN(register_amount)){
            total_registerAmount += parseFloat(register_amount);
        }
    }
    console.log(total_terminalAmount);

    var totalCashJournal_amount = parseFloat(total_posAmount) + parseFloat(total_registerAmount);
    console.log(totalCashJournal_amount);
    
    var overall_difference = Math.abs(parseFloat(total_terminalAmount) - parseFloat(totalCashJournal_amount));
    console.log(overall_difference);
    
    var final_outcome = "";
    if(total_terminalAmount > totalCashJournal_amount){
        final_outcome = "Over";
    }
    else if(total_terminalAmount < totalCashJournal_amount){
        final_outcome = "Short";
    }
    else if(total_terminalAmount == totalCashJournal_amount){
        final_outcome = "Balanced";
    }
    console.log(final_outcome);

    document.getElementById("total_terminalAmount").innerHTML = total_terminalAmount.toString();
    document.getElementById("total_cashJournalAmount").innerHTML = totalCashJournal_amount.toString();
    document.getElementById("overall_difference").innerHTML = overall_difference.toString();
    document.getElementById("final_outcome").innerHTML = final_outcome.toString();
}

document.getElementById("creditDebit_table").addEventListener("change", () => {
    finalizeCreditDebitOutcome();
    // for(i=0; i < numberOfTR_creditDebit; i++){
    //     salesDesk = salesDesk_list[i];
    //     document.getElementById("terminal_"+salesDesk).addEventListener("change", finalizeCreditDebitOutcome());
    //     document.getElementById("pos_"+salesDesk).addEventListener("change", finalizeCreditDebitOutcome());
    //     document.getElementById("register_"+salesDesk).addEventListener("change", finalizeCreditDebitOutcome());
    // }
});