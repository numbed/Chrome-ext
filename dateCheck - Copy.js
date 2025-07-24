document.getElementById("date").addEventListener("change", displayDate);
document.getElementById("price").addEventListener("change", calcBid);
document.getElementById("price").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        calcBid();
    }
});
document.getElementById("guarantee").addEventListener("change", percDiff);
document.getElementById("guarantee").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        percDiff();
    }
});
document.getElementById("b1").addEventListener("click", showET);
document.getElementById("et").addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        showET();
    }
});
document.getElementById("b2").addEventListener("click", showTP);


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

function calcBid() {
    document.getElementById("percentage").innerHTML = "";

    let price = parseFloat(document.getElementById("price").value);
    let bid = (price / 100) * 1;
    document.getElementById("bid").innerHTML = bid.toFixed(2);

    let g = (price / 100) * 5;
    let guarantee = Math.round(g / 100) * 100;
    if (guarantee > g) {
        guarantee -= 100;
    }

    document.getElementById("guarantee").value = guarantee;
    document.getElementById("fiveP").innerHTML = "5%: " + g.toFixed(2);
    percDiff();
}

function percDiff() {
    document.getElementById("percentage").style.backgroundColor = "";

    let price = parseFloat(document.getElementById("price").value);
    let g2 = parseInt(document.getElementById("guarantee").value);
    let percDiff = ((g2 / price) * 100).toFixed(3);
    document.getElementById("percentage").innerHTML = percDiff + "%";
    if (percDiff > 5) {
        document.getElementById("percentage").style.backgroundColor = "red";
    } else if (percDiff <= 5) {
        document.getElementById("percentage").style.backgroundColor = "green";
    }
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