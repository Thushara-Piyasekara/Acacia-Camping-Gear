function ArrayMaker(formIn) {
    let nameIn = formIn.name.value;
    let emailIn = formIn.email.value;
    let contactIn = formIn.contact.value;
    let subjectInOption = formIn.querySubject; //had to use this to get values from dropdown menu
    let subjectIn = subjectInOption.options[subjectInOption.selectedIndex].value;
    let detailsIn = formIn.details.value;

    const validateArr = [nameIn, emailIn, contactIn, subjectIn, detailsIn];
    return validateArr;
}


function ValidateInputs(formIn) {
    const validateArr = ArrayMaker(formIn);
    const validateArrString = [" Name", " Email", " Contact No", " Query Subject", " Query Details"];

    EmptyChecker(validateArr, validateArrString);
}

function EmptyChecker(ArrIn, ArrString) {
    let ArrAlert = new Array;
    let notEmpty = true;

    for (let i = 0; i < ArrIn.length; i++) {
        if (ArrIn[i] == "") {
            ArrAlert.push(ArrString[i]);
            notEmpty = false;
        }
    }
    if (notEmpty) {
        ViewSummary(ArrIn, ArrString);
    }
    else {
        alert("Please fill the following fields : \n\n" + ArrAlert.toString());
    }
}

function ViewSummary(ArrIn, ArrString) {
    document.getElementById("queryForm").style.display = "none";
    document.getElementById("summaryView").style.display = "block";

    for (let i = 0; i < ArrIn.length; i++) {
        document.getElementById("SumQuery_" + i).innerHTML = ArrString[i] + " : ";
        document.getElementById("SumVal_" + i).innerHTML = ArrIn[i];
    }
}

function EditQuery() {
    document.getElementById("queryForm").style.display = "block";
    document.getElementById("summaryView").style.display = "none";
}

function SendQuery(formIn) {
    const validateArr = ArrayMaker(formIn);
    var subject = "Query subject - " + validateArr[3];
    var body = 'Name :' + validateArr[0] +
        '%0D%0AE-mail Address :' + validateArr[1] +
        '%0D%0AContact Number : ' + validateArr[2] +
        '%0D%0AQuery Details :' + validateArr[4]

    window.location.href = "mailto:btgp2001@gmail.com?subject=" + subject + "&body=" + body;
}