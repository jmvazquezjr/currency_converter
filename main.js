let rates = {
    apiKey: "7b809e97f24210ab69c18d3d",
    fetchRates(fromCurrency, toCurrency) {
        fetch("https://v6.exchangerate-api.com/v6/" + this.apiKey + "/pair/" + fromCurrency + "/" + toCurrency)
            .then((response) => response.json())
            .then((data) => this.displayRates(data));
    },
    displayRates(data) {
        const { base_code } = data;
        const { target_code } = data;
        const { conversion_rate } = data;
        let convertAmount = document.querySelector("#amount").value;
        let convertResult = convertAmount * conversion_rate;

        // Round convertResult to two decimal places
        let roundedResult = convertResult.toFixed(2);

        document.querySelector(".result").innerHTML = `${convertAmount} ${base_code} = ${roundedResult} ${target_code}`;
    },
    fetchCodes() {
        fetch("https://v6.exchangerate-api.com/v6/" + this.apiKey + "/codes")
            .then((response) => response.json())
            .then((data) => this.displayCodes(data));
    },
    displayCodes(data) {
        let fromMenu = document.querySelector(".convert-from");
        let toMenu = document.querySelector(".convert-to");
        let codesArray = [];
        const { supported_codes } = data;
        supported_codes.forEach(item => {
            codesArray.push(item.join(' - '));
        });
        for (let i = 0; i <= codesArray.length; i++) {
            let opt = codesArray[i];
            let element = document.createElement("option");
            element.textContent = opt;
            element.value = opt;
            fromMenu.appendChild(element);
        };
        for (let i = 0; i <= codesArray.length; i++) {
            let opt = codesArray[i];
            let element = document.createElement("option");
            element.textContent = opt;
            element.value = opt;
            toMenu.appendChild(element);
        };
    },
    search() {
        let selectedFrom = document.querySelector(".convert-from").value.substring(0, 3);
        let selectedTo = document.querySelector(".convert-to").value.substring(0, 3);
        this.fetchRates(selectedFrom, selectedTo);
    }
};

rates.fetchCodes();

// Event listener for click on 'Convert' button
document.querySelector(".convert").addEventListener("click", function() {
    let enteredAmount = document.querySelector("#amount").value;
    if (enteredAmount.length <= 0 || enteredAmount < 0) {
        alert("Please enter a valid amount.");
    } else rates.search();
});