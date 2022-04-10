/*!
* Start Bootstrap - Simple Sidebar v6.0.3 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/
// 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    //Get a reference to the link on the page
    // with an id of "mylink"
    let score = parseInt(localStorage.getItem("Score"))
    if (score == null) { localStorage.setItem("Score", 0); score = 0; }
    var buttons = document.getElementsByClassName('dialog-choice');
    
    for (var i=0; i < buttons.length; i++) {
        if (parseInt(buttons[i].getAttribute('data-cost')) > score) {
            buttons[i].style.display = "none"
        } else {
            let scoreadd = parseInt(buttons[i].getAttribute('data-points'));
            buttons[i].onclick = function() {
                localStorage.setItem("Score", parseInt(localStorage.getItem("Score")) + scoreadd);
                
                return true;
            }
        }
        
    }
     
    let resetB = document.getElementById('resetbutton');
    resetB.onclick = function() {
        localStorage.setItem("Score", 0)
        return true;
    }

});
