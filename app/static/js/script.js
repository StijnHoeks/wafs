


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

            request.open('GET', 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=dbuOrGB7xoks2WobqPacpFP6fODFIU7gR0rStswa', true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var data = JSON.parse(request.responseText);
                    getData.cleanData(data);
                } else {
                    //console.log('Request niet toegestaan')
                }
            };
            request.onerror = function() {
                //console.log('Geen response van de server')
            };

            request.send();

            routes.init();
            
        },
        cleanData: function(data) {

            let dataArray = Object.values(data.photos)

            let schoon = dataArray.filter(dataObject => dataObject.rover.status === 'active')

            template.init(data)
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
                    routes.current($this);
                },
                'bestpractices': function() {
                    var $this = this;
                    routes.current($this);
                },
                'modular': function() {
                    var $this = this;
                    routes.current($this);
                },
                'modularder': function() {
                    var $this = this;
                    routes.current($this);
                },
                ':id': function() {
                    var $this = this;
                    routes.current($this);
                }
            });

        },
        current: function($this) {


            var routes = document.querySelectorAll('section.active')
            for (var i = 0; i < routes.length; i++) {
                routes[i].classList.remove('active');
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
            
            for (var i = 0; i < data.photos.length; i++) {

                var newEntry = document.createElement('a');
                newEntry.id = data.photos[i].id;
                newEntry.href = '#'+data.photos[i].id;
                document.getElementById('start').appendChild(newEntry);

                var newEntry_inner = document.createElement('article');
                newEntry_inner.id = data.photos[i].id;
                document.getElementById('start').appendChild(newEntry_inner);

            }

            this.render(data,randomIndex)

        },
        render: function(data,randomIndex) {


            for (var i = 0; i < data.photos.length; i++) {
            
                shaven.default(
                    [document.getElementById(data.photos[i].id),
                        ['div', {
                            style: {
                                'background-image': 'url('+data.photos[i].img_src+')',
                            },
                        }],
                        ['ul',    
                            ['li', 'Camera',
                                ['p',data.photos[i].camera.full_name]
                            ],
                            ['li', 'ID',
                                ['p',data.photos[i].id]
                            ],    
                        ]   
                    ]
                )
            }
        }
    




    }




    // roep de functie app.init aan
    app.init()

})()






