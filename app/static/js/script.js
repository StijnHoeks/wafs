
// geld voor alle geladen (ook externe) scripts
// "use strict"

(function() {

    // geld alleen voor dit script
    /*"use strict"*/

    // initialize application
    var app = {
        init: function() {

            getData.init();
            
        }
    }

    var getData = {
        init: function() {
            // dbuOrGB7xoks2WobqPacpFP6fODFIU7gR0rStswa

            var request = new XMLHttpRequest();

            request.open('GET', 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=fhaz&api_key=dbuOrGB7xoks2WobqPacpFP6fODFIU7gR0rStswa', true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var data = JSON.parse(request.responseText);
                    template.init(data)
                    //console.log('Success!')
                } else {
                    //console.log('Request niet toegestaan')
                }
            };
            request.onerror = function() {
                //console.log('Geen response van de server')
            };

            request.send();

            // roep de functie routes.init aan
            routes.init();
        }
    }
    // handle routes & states
    var routes = {
        init: function(data) {
            this.handleEvent();
        },
        handleEvent: function() {

            routie({
                '': function() {
                },
                'start': function() {
                    var $this = this;
                    var oldUrl = window.location.hash.substr(1);
                    var oldTargetEl = document.getElementById( oldUrl );
                    sections.toggle($this,oldTargetEl);
                },
                'bestpractices': function() {
                    var $this = this;
                    var oldUrl = window.location.hash.substr(1);
                    var oldTargetEl = document.getElementById( oldUrl );
                    sections.toggle($this,oldTargetEl);
                },
                'modular': function() {
                    var $this = this;
                    var oldUrl = window.location.hash.substr(1);
                    var oldTargetEl = document.getElementById( oldUrl );
                    sections.toggle($this,oldTargetEl);
                },
                'modularder': function() {
                    var $this = this;
                    var oldUrl = window.location.hash.substr(1);
                    var oldTargetEl = document.getElementById( oldUrl );
                    sections.toggle($this,oldTargetEl);
                }
            });


        }
    }

    // render / toggle sections
    var sections = {
        init: function() {

        },
        toggle: function($this,oldTargetEl) {

            var targetElement = document.getElementById($this.path);
            targetElement.classList.add('active');
            oldTargetEl.classList.remove('active');

            template.init();

        },
        scroll: function() {

        }
    }


    var template = {
        init: function(data) {

            var activities = [
                {activity: data.photos[0].id},
                {activity: data.photos[0].sol},
                {activity: data.photos[0].img_src}
            ];

            template.render(activities);

        },
        render: function(activities) {

            Transparency.render(document.getElementById('activities'), activities);

        }
    }




        

    // roep de functie app.init aan
    app.init()

})()






