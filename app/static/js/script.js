
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

            request.open('GET', 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=dbuOrGB7xoks2WobqPacpFP6fODFIU7gR0rStswa', true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var data = JSON.parse(request.responseText);
                    template.init(data)
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
        init: function() {
            this.handleEvent();
        },
        handleEvent: function() {

            routie({
                '': function() {
                },
                'start': function() {
                    var $this = this;
                    sections.init($this);
                },
                'bestpractices': function() {
                    var $this = this;
                    sections.init($this);
                },
                'modular': function() {
                    var $this = this;
                    sections.init($this);
                },
                'modularder': function() {
                    var $this = this;
                    sections.init($this);
                },
                'entry_inner': function() {
                    var $this = this;
                    sections.init($this);
                }
            });


        }

    }

    // render / toggle sections
    var sections = {
        init: function($this) {
            sections.toggle($this);
        },
        toggle: function($this) {

            var sections = document.querySelectorAll('section.active')
            for (var i = 0; i < sections.length; i++) {
                sections[i].classList.remove('active');
            }

            var targetElement = document.getElementById($this.path);
            targetElement.classList.add('active');

        }

    }




    var template = {

        init: function(data) {

            var randomIndex = parseInt(Math.random()*data.photos.length);
            this.create(data,randomIndex)

        },
        create: function(data,randomIndex) {

            var newEntry = document.createElement('a');
            newEntry.id = 'entry';
            newEntry.href = '#entry_inner';
            
            document.getElementById('start').appendChild(newEntry);
        
            this.render(data,randomIndex)

        },
        render: function(data,randomIndex) {


            shaven.default(
                [document.getElementById('entry'),
                    ['div', {
                        style: {
                            'background-image': 'url('+data.photos[randomIndex].img_src+')',
                        },
                    }],
                    ['ul',    
                        ['li', 'Camera',
                            ['p',data.photos[randomIndex].camera.full_name]
                        ],
                        ['li', 'ID',
                            ['p',data.photos[randomIndex].id]
                        ],    
                    ]   
                ]
            )


        
        }


    }




    // roep de functie app.init aan
    app.init()

})()






