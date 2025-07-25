document.getElementById("date").addEventListener("change", displayDate);
document.getElementById("priceBGN").addEventListener("change", calculateMoney);
document.getElementById("priceEUR").addEventListener("change", calculateEUR);
// document.getElementById("priceEUR").addEventListener("change", bgnToEUR);
document.getElementById("priceBGN").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        calculateMoney();
    }
});

document.getElementById("guaranteeBGN").addEventListener("change", percDiff);
document.getElementById("guaranteeEUR").addEventListener("change", percDiff);
document.getElementById("guaranteeBGN").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        percDiff();
    }
});
document.getElementById("guaranteeEUR").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        percDiff();
    }
});

//document.getElementById("errCheck").addEventListener("click", duplicateCheck);

function showTP() {
    let tp = document.getElementById("branchesList").value;
    if (tp != "" && document.getElementById("procTP").checked) {
        let newURL = "https://auction.ucdp-smolian.com/au-admin/auctions?bid=" + tp + "&orderType=date&orderBy=desc";
        chrome.tabs.create({
            url: newURL
        });
    } else if (tp != "" && document.getElementById("refTP").checked) {
        let newURL = "https://auction.ucdp-smolian.com/au-admin/history?bid=" + tp + "&orderType=date&orderBy=desc";
        chrome.tabs.create({
            url: newURL
        });
    } else if (tp == "" && document.getElementById("procTP").checked) {
        let newURL = "https://auction.ucdp-smolian.com/au-admin/auctions?bid=&year=2022&orderType=date&orderBy=desc";
        chrome.tabs.create({
            url: newURL
        });
    } else if (tp == "" && document.getElementById("refTP").checked) {
        let newURL = "https://auction.ucdp-smolian.com/au-admin/history?bid=&orderType=date&orderBy=desc";
        chrome.tabs.create({
            url: newURL
        });
    }
}
	
	
function showET() {
    let et = document.getElementById("et").value;
    if (et != "" && document.getElementById("proc").checked) {
        let newURL = "https://auction.ucdp-smolian.com/au-admin/auctions/form/" + et;
        chrome.tabs.create({
            url: newURL
        });
    } else if (et != "" && document.getElementById("ref").checked) {
        let newURL = "https://auction.ucdp-smolian.com/au-admin/history/review/" + et;
        chrome.tabs.create({
            url: newURL
        });
    }
}

function calculateMoney() {
    var moneyInput = document.getElementById('priceBGN').value;
    var bidBGN = moneyInput * 0.01; // 1% of the input value
    var guaranteeBGN = Math.min(moneyInput * 0.05, moneyInput);
    var fivePBGN = moneyInput * 0.05;

    if (guaranteeBGN > 999) {
        guaranteeBGN = Math.floor(guaranteeBGN / 100) * 100; // round to the nearest hundred
    } else if (guaranteeBGN > 200 && guaranteeBGN < 999 ){
        guaranteeBGN = Math.floor(guaranteeBGN / 10) * 10; // round to the nearest ten
    } else {
        guaranteeBGN = Math.floor(guaranteeBGN/1)*1;
    }


    let exchangeRate = 1.95583; // Example exchange rate, adjust as needed
    let priceEUR = (moneyInput / exchangeRate);

    document.getElementById("priceEUR").value = priceEUR.toFixed(2);
    var bidEUR = priceEUR * 0.01; // 1% of the input value
    var guaranteeEUR = Math.min(priceEUR * 0.05, priceEUR);
    var fivePEUR = priceEUR * 0.05;

    if (guaranteeEUR > 999) {
        guaranteeEUR = Math.floor(guaranteeEUR / 100) * 100; // round to the nearest hundred
    } else if (guaranteeBGN > 200 && guaranteeEUR < 999 ){
        guaranteeEUR = Math.floor(guaranteeEUR / 10) * 10; // round to the nearest ten
    } else {
        guaranteeEUR = Math.floor(guaranteeEUR/1)*1;
    }

    document.getElementById('bidBGN').textContent = bidBGN.toFixed(2);
    document.getElementById('bidEUR').textContent = bidEUR.toFixed(2);
    document.getElementById('guaranteeBGN').value = guaranteeBGN.toFixed(2);
    document.getElementById('guaranteeEUR').value = guaranteeEUR.toFixed(2);
    document.getElementById('fivePBGN').textContent = fivePBGN.toFixed(2);
    document.getElementById('fivePEUR').textContent = fivePEUR.toFixed(2);
  console.log('🚀 ~ calculateMoney ~ priceEUR: LOADED\n', priceEUR.toFixed(2));
    percDiff();
}

function calculateEUR() {
    var priceEUR = document.getElementById('priceEUR').value;

    var bidEUR = priceEUR * 0.01; // 1% of the input value
    var guaranteeEUR = Math.min(priceEUR * 0.05, priceEUR);
    var fivePEUR = priceEUR * 0.05;

    if (guaranteeEUR > 999) {
        guaranteeEUR = Math.floor(guaranteeEUR / 100) * 100; // round to the nearest hundred
    } else if (guaranteeBGN > 200 && guaranteeEUR < 999 ){
        guaranteeEUR = Math.floor(guaranteeEUR / 10) * 10; // round to the nearest ten
    } else {
        guaranteeEUR = Math.floor(guaranteeEUR/1)*1;
    }

    document.getElementById('bidEUR').textContent = bidEUR.toFixed(2);
    document.getElementById('guaranteeEUR').value = guaranteeEUR.toFixed(2);
    document.getElementById('fivePEUR').textContent = fivePEUR.toFixed(2);
    percDiff();
}

function percDiff() {
    document.getElementById("percentageBGN").style.backgroundColor = "";

    let priceBGN = parseFloat(document.getElementById("priceBGN").value);
    let g2 = parseInt(document.getElementById("guaranteeBGN").value);
    let percDiffBGN = ((g2 / priceBGN) * 100).toFixed(3);
    console.log('🚀 ~ percDiff ~ percDiffBGN: LOADED\n', percDiffBGN + "%");
    document.getElementById("percentageBGN").innerHTML = " (" + percDiffBGN + "% )";
    if (percDiffBGN > 5) {
        document.getElementById("guaranteeBGN").style.backgroundColor = "red";
    } else if (percDiffBGN <= 5) {
        document.getElementById("guaranteeBGN").style.backgroundColor = "green";
    }

    let priceEUR= parseFloat(document.getElementById("priceEUR").value);
    let g2EUR = parseInt(document.getElementById("guaranteeEUR").value);
    let percDiffEUR = ((g2EUR / priceEUR) * 100).toFixed(3);
    document.getElementById("percentageEUR").innerHTML =" (" + percDiffEUR + "% )";
    if (percDiffEUR > 5) {
        document.getElementById("guaranteeEUR").style.backgroundColor = "red";
    } else if (percDiffEUR <= 5) {
        document.getElementById("guaranteeEUR").style.backgroundColor = "green";
    }
}


function bgnToEUR() {
    let priceEUR = parseFloat(document.getElementById("priceEUR").value);
    let exchangeRate = 1.95583; // Example exchange rate, adjust as needed
    let priceBGN = (priceEUR * exchangeRate).toFixed(2);
    document.getElementById("priceBGN").value = priceBGN;
    calculateMoney();  
}

function radioCheck() {
    if (document.getElementById("pro").checked) {
        document.getElementById("object").disabled = false;
        document.getElementById("et").disabled = false;
    } else if (document.getElementById("ref").checked) {
        document.getElementById("object").disabled = true;
        document.getElementById("et").disabled = false;
    }
}

function displayDate() {
    let date = dayjs(document.getElementById("date").value);
    let dayNumber = date.format("d");

    if (dayNumber == 1) { // mon
        output(20, 4, 3);
    } else if (dayNumber == 2) { //tue
        output(18, 2, 1);
    } else if (dayNumber == 3) { //wed
        output(19, 2, 1);
    } else if (dayNumber == 4) { //thu
        output(20, 2, 1);
    } else if (dayNumber == 5) { //fri
        output(18, 2, 1);
    } else if (dayNumber == 6 || dayNumber == 0) { //sun or sat
        document.getElementById("dateDOW").innerHTML = date.locale("bg").format("dddd");
        document.getElementById("pub").innerHTML = "";
        document.getElementById("pubDOW").innerHTML = "невалидна дата на провеждане";
        document.getElementById("offers").innerHTML = "";
        document.getElementById("offersDOW").innerHTML = "невалидна дата на провеждане";
        document.getElementById("commission").innerHTML = "";
        document.getElementById("commissionDOW").innerHTML = "невалидна дата на провеждане";

        document.getElementById("dateDOW").style.backgroundColor = "red";
        document.getElementById("dateDOW").style.color = "white";
        document.getElementById("pubDOW").style.backgroundColor = "red";
        document.getElementById("pubDOW").style.color = "white";
        document.getElementById("offersDOW").style.backgroundColor = "red";
        document.getElementById("offersDOW").style.color = "white";
        document.getElementById("commissionDOW").style.backgroundColor = "red";
        document.getElementById("commissionDOW").style.color = "white";
    }

    function output(p, o, c) {
        document.getElementById("pub").style.backgroundColor = "";
        document.getElementById("pub").style.color = "black";
        document.getElementById("pubDOW").style.backgroundColor = "";
        document.getElementById("pubDOW").style.color = "black";
        document.getElementById("dateDOW").style.backgroundColor = "";
        document.getElementById("dateDOW").style.color = "black";
        document.getElementById("pubDOW").style.backgroundColor = "black";
        document.getElementById("pubDOW").style.color = "black";
        document.getElementById("offersDOW").style.backgroundColor = "";
        document.getElementById("offersDOW").style.color = "black";
        document.getElementById("commissionDOW").style.backgroundColor = "";
        document.getElementById("commissionDOW").style.color = "black";
        let pDate = dayjs(date.subtract(p, "days").format("DD MMMM YYYY"));
        let oDate = dayjs(date.subtract(o, "days").format("DD MMMM YYYY"));
        let cDate = dayjs(date.subtract(c, "days").format("DD MMMM YYYY"));

        document.getElementById("dateDOW").innerHTML = date.locale("bg").format("dddd");

        document.getElementById("pub").innerHTML = date.subtract(p, "days").locale("bg").format("DD MMMM YYYY");
        document.getElementById("pubDOW").innerHTML = pDate.locale("bg").format("dddd");

        document.getElementById("offers").innerHTML = date.subtract(o, "days").locale("bg").format("DD MMMM YYYY");
        document.getElementById("offersDOW").innerHTML = oDate.locale("bg").format("dddd");

        document.getElementById("commission").innerHTML = date.subtract(c, "days").locale("bg").format("DD MMMM YYYY");
        document.getElementById("commissionDOW").innerHTML = cDate.locale("bg").format("dddd");

        if (pDate.isBefore(dayjs(), 'day')) {
            document.getElementById("pub").style.backgroundColor = "red";
            document.getElementById("pub").style.color = "white";
            document.getElementById("pubDOW").style.backgroundColor = "red";
            document.getElementById("pubDOW").style.color = "white";
        } else if (dayjs().isSame(pDate, 'day')) {
            document.getElementById("pub").style.backgroundColor = "orange";
            document.getElementById("pub").style.color = "white";
            document.getElementById("pubDOW").style.backgroundColor = "orange";
            document.getElementById("pubDOW").style.color = "white";
        } else {
            document.getElementById("pub").style.backgroundColor = "";
            document.getElementById("pub").style.color = "black";
            document.getElementById("pubDOW").style.backgroundColor = "";
            document.getElementById("pubDOW").style.color = "black";
        }

    }
}