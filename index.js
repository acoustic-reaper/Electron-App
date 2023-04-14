document.addEventListener('DOMContentLoaded', function () {
    let variable = document.querySelector('.ACCESS_CODE');
    variable.addEventListener('click', function () {

        let string1 = variable.innerHTML;
        let string2 = "Click here for Dark mode";

        if (string1.localeCompare(string2) == 0) {
            document.querySelector('.header1').style.backgroundColor = "#033f47";
            let q = document.querySelectorAll('.nav-link');
            for (let i = 0; i < q.length; i++) {
                q[i].style.color = "white";
            }
            q = document.querySelector('#sec1');
            q.style.backgroundColor = "#022a30";
            q.style.color = "#b6cbce";
            variable.innerHTML = "Click here for Light mode";
            variable.style.backgroundColor = "#b7b9b1";
            document.querySelector('.myname').style.color = "#eef3db";

        }

        else {
            document.querySelector('.header1').style.backgroundColor = "rgb(0, 204, 255)";
            let q = document.querySelectorAll('.nav-link');
            for (let i = 0; i < q.length; i++) {
                q[i].style.color = "black";
            }
            variable.style.backgroundColor = "#dee2e6";
            variable.innerHTML = "Click here for Dark mode";
            q = document.querySelector('#sec1');
            q.style.backgroundColor = "#edf7f6";
            q.style.color = "black";
            document.querySelector('.myname').style.color = "black";
        }

    }
    )
});