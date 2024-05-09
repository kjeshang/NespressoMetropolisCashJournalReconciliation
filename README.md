# NespressoMetropolisCashJournalReconciliation

> Kunal Jeshang - Team Leader (Project Timeline: April 2024 -- May 2024)

[Click Here](https://nespressometropoliscashjournalreconcilia.onrender.com/) to view live version 

## Premise

This project is a simple web application designed to assist managers-on-duty to perform cash journal reconciliation for cash transactions and credit/debit card transactions. In actuality, cash journal reconciliation is performed with the help of pre-built Excel workbooks, basic calculator, and mental math. However, this project was created with the intention to synthesize what I have learnt as a team leader, and create a self-explanatory platform whereby even a coffee specialist would be able to perform cash journal reconciliation with minimal to no instruction.

This project was constructed using HTML, CSS, Bootstrap, and Javascript.

## Project Features

The cash transaction reconciliation feature is able to calculate the cash value based on the count of bill/coin for each denomination. In addition, the total cash value is summed up and compared against the a given cash journal amount. The given cash journal amount can vary; whether the reconciliation is for an opening or closing shift. If it is an opening shift cash reconciliation, the given cash journal amount is 300.00. This is because it is standard procedure to start a workday to have 300.00 CAD of floatable cash to use for change. If it is a closing shift cash reconciliation, the given cash journal amount is determined by the Nespresso Software, which sums all of cash order values. It is important for the total value of actual physical cash to match the amount determined by the Nespresso Software. In regards to closing shift cash reconciliation, an End-of-Day deposit feature is also created such that count of bill/coin per denomination is generated such that the remaining physical cash is 300.00 in preparation for a future prospective opening shift.

Similar to the cash reconciliation feature, the credit/debit card reconciliation feature is able to calculate whether the actual amount earned matches with the expected order value, per sales desk as well as overall.  Below is a tabular breakdown to provide more context.

|Column|Description|
|--|--|
|Sales Desk|Alphabetical label for a sales desk|
|Till|Numerical label for a sales desk which is reflected on Nespresso software|
|POS|Purchase order amounts as per Nespresso software (transaction number and amount automatically set on terminal)|
|Register|Purchase order amounts and Return order amounts as per Nespresso software (transaction number and amount automatically set on terminal)|
|Terminal|Actual amount paid by customer|
|Difference|Absolute value of the following: Terminal - (POS + Register)|
|Outcome|Whether the amount actual amount paid matches with the amount reflected on the Nespresso software|




