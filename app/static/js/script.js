

(function() {


    // initialize application
    var app = {
        init: function() {

            routes.init()
            /*document.getElementById('startscherm').classList.add('active')*/
        }
    }

    // handle routes & states
    var routes = {
        init: function() {

            window.addEventListener("hashchange", function(event) {
                var route = document.getElementById(window.location.hash.substr(1));
                var urlOld = event.oldURL;
                var routeOld = document.getElementById(urlOld.substring(urlOld.lastIndexOf('#') + 1));
                console.log(routeOld)
                sections.toggle(route,routeOld)



            })
        }
    }

    // render / toggle sections
    var sections = {
        toggle: function(route,routeOld) {

            route.classList.add('active')
            routeOld.classList.remove('active')

        }
    }

    app.init()

})()






