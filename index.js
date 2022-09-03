const BirthdayStore = [];
let sortedList;
const divContainer = document.querySelector(".TableContainer");
const Spinner = document.querySelector(".spinner");
const ErrorDisplay = document.querySelector(".error");


const url = 'https://api.npoint.io/3954f8778c55f8b63617';
const fetchData = async () => {
    try {
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                startAPP(data);
                Spinner.style.display = "none";


            });

    } catch (error) {
        console.log(error);
        ErrorDisplay.innerHTML = error;
    }
}


const startAPP = (data) => {

    const birthDates = data;

    const birthdayCalculate = (month, day) => {

        let date = new Date(),
            fullYear = date.getFullYear(),
            next = new Date(fullYear, month - 1, day);

        date.setHours(0, 0, 0, 0);

        if (date > next) next.setFullYear(fullYear + 1);

        return Math.round((next - date) / 8.64e7);
    }



    birthDates.forEach(element => {
        let BDT = birthdayCalculate.apply(null, (element.dob).split(','));
        BDT += "-" + element.name;
        BirthdayStore.push(BDT);

    });



    const customSort = (a, b) => {
        return (Number(a.match(/(\d+)/g)[0]) - Number((b.match(/(\d+)/g)[0])));

    }

    sortedList = BirthdayStore.sort(customSort);

    const createItem = (name, days, index) => {
        let tr = document.createElement('tr');
        tr.innerHTML += `<th scope="row">${index + 1}</th><td>${name}</td><td class="b_days">${days == 0 ? 'Today is his BirthDay! 🎂' : days} ${days > 1 ? "Days" : ""}</td>`
        return tr;

    }

    sortedList.forEach((element, index) => {
        const NameDobSplit = element.split('-');
        const name = NameDobSplit[1];
        const days = parseInt(NameDobSplit[0]);
        console.log(typeof (days));
        divContainer.appendChild(createItem(name, days, index));
    });

}



fetchData();

