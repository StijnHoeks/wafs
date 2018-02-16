


// geld voor alle geladen (ook externe) scripts
// "use strict"

(function() {

    // geld alleen voor dit script
    /*"use strict"*/

    // initialize application
    var app = {
        init: function() {

            collection.init();
            
        }
    }

    var collection = {
        init: function() {
            this.get();
        },
        get: function() {
            // dbuOrGB7xoks2WobqPacpFP6fODFIU7gR0rStswa
            var self = this;

            var request = new XMLHttpRequest();

            request.open('GET', 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=dbuOrGB7xoks2WobqPacpFP6fODFIU7gR0rStswa', true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var data = JSON.parse(request.responseText);
                    self.clean(data);
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
        clean: function(data) {

            let dataArray = Object.values(data.photos)

            let newArray = dataArray.filter(dataObject => dataObject.rover.status === 'inactive')

            content.init(data)
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
                    var $this = this.path;
                    routes.current($this);
                },
                'bestpractices': function() {
                    var $this = this.path;
                    routes.current($this);
                },
                'modular': function() {
                    var $this = this.path;
                    routes.current($this);
                },
                'modularder': function() {
                    var $this = this.path;
                    routes.current($this);
                },
                ':id': function() {
                    var $this = this.params.id;
                    routes.current($this);
                }
            });

        },
        current: function($this) {


            var routes = document.querySelectorAll('section.active')
            for (var i = 0; i < routes.length; i++) {
                routes[i].classList.remove('active');
            }

            var targetElement = document.getElementById($this);
            targetElement.classList.add('active');

        }

    }

    var content = {

        init: function(data) {

            this.create(data)

        },
        create: function(data) {
            
            for (var i = 0; i < data.photos.length; i++) {

                var newEntry = document.createElement('a');
                newEntry.id = 'main_'+data.photos[i].id;
                newEntry.href = '#detail_'+data.photos[i].id;
                document.getElementById('start').appendChild(newEntry);

                var newEntry_inner = document.createElement('section');
                newEntry_inner.id = 'detail_'+data.photos[i].id;
                document.getElementById('body').appendChild(newEntry_inner);

            }

            this.render(data)

        },
        render: function(data) {


            for (var i = 0; i < data.photos.length; i++) {
            
                shaven.default(
                    [document.getElementById('main_'+data.photos[i].id),
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
            this.detail(data)
        },
        detail: function(data) {

            for (var i = 0; i < data.photos.length; i++) {
            
                shaven.default(
                    [document.getElementById('detail_'+data.photos[i].id),
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






