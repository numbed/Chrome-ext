(function () {
    // Prompt the user to enter auction CSV data
    const csvData = prompt("Enter auction CSV", "Кричим,К,02.09.2025,10:30,149733.03,2001,бб/см,1,2.00,3.00,4.00,5.00");
    const data = csvData.split(",");


    // Branch name to ID mapping
    const branchMapping = {
        "Кричим": "38", "Хайтов": "37", "Алабак": "1", "Ардино": "2", "Асеновград": "3", "Батак": "4",
        "Борино": "5", "Доспат": "6", "Златоград": "7", "Карлово": "8", "Кирково": "9", "Клисура": "10",
        "Крумовград": "11", "Михалково": "12", "Момчилград": "13", "Пазарджик": "14", "Панагюрище": "15",
        "Пещера": "16", "Пловдив": "17", "Първомай": "18", "Ракитово": "19", "Родопи": "20", "Селище": "21",
        "Славейно": "22", "Смилян": "23", "Смолян": "24", "Триград": "25", "Хвойна (до.30.10.2019)": "26",
        "Хисар": "27", "Широка лъка": "28", "Борово": "29", "Женда": "30", "Извора": "31", "Кормисош": "32",
        "Тракия": "33", "Чепино": "34", "Широка поляна": "35", "ЦУ": "36"
    };

    // Branch name to order prefix mapping
    const orderMapping = {
        "Кричим": "З-37-", "Хайтов": "З-02-", "Алабак": "З-03-", "Ардино": "З-04-", "Асеновград": "З-05-",
        "Батак": "З-06-", "Борино": "З-07-", "Доспат": "З-08-", "Златоград": "З-09-", "Карлово": "З-10-",
        "Кирково": "З-11-", "Клисура": "З-12-", "Крумовград": "З-13-", "Михалково": "З-14-", "Момчилград": "З-15",
        "Пазарджик": "З-16-", "Панагюрище": "З-17-", "Пещера": "З-18-", "Пловдив": "З-19-", "Първомай": "З-20-",
        "Ракитово": "З-21-", "Родопи": "З-22-", "Селище": "З-23-", "Славейно": "З-24-", "Смилян": "З-25-",
        "Смолян": "З-26-", "Триград": "З-27-", "Хисар": "З-28-", "Широка лъка": "З-29-", "Борово": "З-30-",
        "Женда": "З-31-", "Извора": "З-32-", "Кормисош": "З-33-", "Тракия": "З-34-", "Чепино": "З-35-",
        "Широка поляна": "З-36-", "ЦУ": "З-01-"
    };

    // Subject code to form value mapping
    const subjectMapping = {
        "ДД": "etHarvested",
        "ПК": "etForecast",
        "К": "etRoots"
    };

    // Fill auction branch
    const branchKey = data[0];
    console.log('🚀 ~ branchKey: LOADED\n', branchKey);
    const auctionBranchEl = document.getElementById("auctionBranch");
    if (auctionBranchEl) auctionBranchEl.value = branchMapping[branchKey] || "";

    // Fill auction subject
    const subjectKey = data[1];
    console.log('🚀 ~ subjectKey: LOADED\n', subjectKey);
    const auctionSubjectEl = document.getElementById("auctionSubject");
    if (auctionSubjectEl) auctionSubjectEl.value = subjectMapping[subjectKey] || "";

    // Set order prefix based on branch name
    let orderPrefix = "";
    for (const key in orderMapping) {
        if (branchKey.includes(key)) {
            orderPrefix = orderMapping[key];
            console.log('🚀 ~ orderPrefix: LOADED\n', orderPrefix);
            break;
        }
    }

    // Fill order number fields
    const ooNumberEl = document.getElementById("ooNumber");
    if (ooNumberEl) ooNumberEl.value = orderPrefix;

    const coNumberEl = document.getElementById("coNumber");
    if (coNumberEl) coNumberEl.value = orderPrefix;

    // Fill date fields
    let firstDate = data[2];
    let firstTime = data[3];

    document.getElementById("auctionDueDate").value = firstDate;
    document.getElementById("auctionDueTime").value = firstTime;
    document.getElementById("auctionConfirmDueDateStart").value = firstDate + " " + firstTime;
    document.getElementById("auctionConfirmDueDateEnd").value = firstDate + " " + addMinutes(firstTime);
    document.getElementById("auctionSecondDueDate").value = getNextWorkday(firstDate);
    document.getElementById("auctionSecondDueTime").value = firstTime;
    document.getElementById("auctionConfirmSecondDueDateStart").value = getNextWorkday(firstDate) + " " + firstTime;
    document.getElementById("auctionConfirmSecondDueDateEnd").value = getNextWorkday(firstDate) + " " + addMinutes(firstTime);
    document.getElementById("auctionApplicationsDueDate").value = getPreviousWorkdays(firstDate) + " 23:59:59";

    // fill prices fields
    startPriceBGN = data[4];
    console.log('🚀 ~ startPriceBGN: LOADED\n', (startPriceBGN * 0.01).toFixed(2));
    document.getElementById("auctionStartPrice").value = startPriceBGN;
    document.getElementById("аuctionBidStep").value = (startPriceBGN * 0.01).toFixed(2);
    document.getElementById("аuctionGuarantee").value = calculateGuarantee(startPriceBGN);
    document.getElementsByName("data[startPriceEUR]")[0].value = (startPriceBGN / 1.95583).toFixed(2);
    document.getElementsByName("data[bidStepEUR]")[0].value = ((startPriceBGN * 0.01) / 1.95583).toFixed(2);
    document.getElementsByName("data[guaranteeEUR]")[0].value = (calculateGuarantee(startPriceBGN) / 1.95583).toFixed(2);

    function calculateGuarantee(startPrice) {
        startPrice = parseFloat(startPrice);
        if (isNaN(startPrice)) return "";

        let guarantee = Math.min(startPrice * 0.05, startPrice);
        if (guarantee > 999) {
            return Math.floor(guarantee / 100) * 100; // round to the nearest hundred
        } else if (guarantee > 200 && guarantee < 999) {
            return Math.floor(guarantee / 10) * 10; // round to the nearest ten
        } else {
            return Math.floor(guarantee / 1) * 1; // round to the nearest unit
        }
    }

    function getNextWorkday(dateStr) {
        const [day, month, year] = dateStr.split('.').map(Number);

        // Create date object
        const date = new Date(year, month - 1, day);

        // Add 1 day until it's a weekday (Mon–Fri)
        do {
            date.setDate(date.getDate() + 1);
        } while (date.getDay() === 0 || date.getDay() === 6); // 0 = Sunday, 6 = Saturday

        // Format back to DD.MM.YYYY
        const nextDay = String(date.getDate()).padStart(2, '0');
        const nextMonth = String(date.getMonth() + 1).padStart(2, '0');
        const nextYear = date.getFullYear();

        return `${nextDay}.${nextMonth}.${nextYear}`;
    }

    function getPreviousWorkdays(dateStr) {
        const [day, month, year] = dateStr.split('.').map(Number);
        const date = new Date(year, month - 1, day);

        const dayOfWeek = date.getDay(); // 0=Sun, 1=Mon, ... 6=Sat

        if (dayOfWeek === 1) {
            // Monday → go back 4 days (to Thursday)
            date.setDate(date.getDate() - 4);
        } else {
            // Any other weekday → go back exactly 2 days
            date.setDate(date.getDate() - 2);
        }

        const prevDay = String(date.getDate()).padStart(2, '0');
        const prevMonth = String(date.getMonth() + 1).padStart(2, '0');
        const prevYear = date.getFullYear();

        return `${prevDay}.${prevMonth}.${prevYear}`;
    }


    function addMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(':').map(Number);
        const date = new Date();

        // Set the time from the string
        date.setHours(hours);
        date.setMinutes(minutes);

        // Add the minutes
        date.setMinutes(date.getMinutes() + 59);

        // Format result as HH:mm
        const newHours = String(date.getHours()).padStart(2, '0');
        const newMinutes = String(date.getMinutes()).padStart(2, '0');

        return `${newHours}:${newMinutes}`;
    }



    // Fill woods info fields
    const woodNames = [
        "data[woodInfo][number][0]", "data[woodInfo][type][0][]", "data[woodInfo][big][0]",
        "data[woodInfo][mid][0]", "data[woodInfo][small][0]", "data[woodInfo][ozm][0]",
        "data[woodInfo][firewood][0]", "data[woodInfo][total][0]"
    ];

    document.getElementsByName("data[woodInfo][number][0]")[0].value = data[5]; // Wood number
    let woodsTotal = parseFloat(data[7]) + parseFloat(data[8]) + parseFloat(data[9]) + parseFloat(data[10]) + parseFloat(data[11]);


    woodNames.forEach((name, index) => {
        console.log('🚀 ~ index: LOADED\n', name, index + " " + data[index + 5]);
        if (name !== "data[woodInfo][type][0][]") {
            const el = document.getElementsByName(name)[0];
            if (el) el.value = data[index + 5];
            if (name === "data[woodInfo][total][0]") el.value = woodsTotal.toFixed(2); // Skip wood number field
        }
    });

    // Select wood types in multi-select dropdown
    (function selectMultiple(valuesString, selectName) {
        let valuesArray = valuesString.split("/").map(value => value.trim());
        let selectElement = document.getElementsByName(selectName)[0];

        if (selectElement && selectElement.tagName.toLowerCase() === "select") {
            valuesArray.forEach(value => {
                let option = Array.from(selectElement.options).find(opt => opt.text.trim() === value);
                if (option) option.selected = true;
            });
            $(selectElement).trigger("chosen:updated"); // trigger chosen.js update
        }
    })(data[6], "data[woodInfo][type][0][]");

    // Click buttons to trigger frontend behavior
    document.querySelectorAll(".form-group.has-feedback button").forEach(el => el.click());

    // Click green save button
    document.querySelector("button.btn.btn-success").click();

    // After delay, go to next auction ID
    setTimeout(() => {
        const currentUrl = window.location.href;
        const parts = currentUrl.split("/");
        const lastPart = parts.pop() || parts.pop();
        const lastNumber = parseInt(lastPart, 10);

        if (!isNaN(lastNumber)) {
            parts.push(lastNumber + 1);
            const nextUrl = parts.join("/");
            window.location.href = nextUrl;
        } else {
            alert("Could not detect a numeric ID at the end of the URL.");
        }
    }, 200);
})();
