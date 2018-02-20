

(function() {

    "use strict"

    // initialize application
    var app = {
        init: function() {
            api.init();
            routes.init();
            if ( window.location.hash.substring(1) == '' ) {
                window.location.href = '#start';
            }
        }
    }

    var api = {
        init: function() {
            this.request();
        },
        request: function() {
            // api_key=dbuOrGB7xoks2WobqPacpFP6fODFIU7gR0rStswa
            var self = this;
            var request = new XMLHttpRequest();
            request.open('GET', 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=1&api_key=dbuOrGB7xoks2WobqPacpFP6fODFIU7gR0rStswa', true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    var rawData = JSON.parse(request.responseText);
                    collection.init(rawData);
                } else { //console.log('Request niet toegestaan')
                    api.error();
                }
            };
            request.onerror = function() { //console.log('Geen response van de server')
                api.error();
            };

            request.send();
            
        },
        error: function(rawData) {

            var errorMessage = document.createElement('article');
            errorMessage.id = 'errorMessage';
            document.getElementById('start').appendChild(errorMessage);
            shaven.default(
                [document.getElementById('errorMessage'),
                    ['img', {src:'static/img/404.jpg'} ],
                    ['article',
                        ['h1', 'SERVER ERROR'],
                        ['p', 'De request kon niet worden voltooid'],
                        ['a', 'Probeer opnieuw', {href:'index.html'} ]
                    ]
                ]
            )
        }
    }

    var collection = {
        init: function(rawData) {
            this.clean(rawData);
        },
        clean: function(rawData) {
            //let dataArray = Object.values(rawData.photos)
            //let data = dataArray.filter(dataObject => dataObject.rover.status === 'inactive')
            var data = rawData;
            content.init(data);

        }
    }

    // handle routes & states
    var routes = {
        init: function() {
            this.handleEvent();
        },
        handleEvent: function() {
            var self = this;
            routie({
                ':id': function() {
                    var $this = this.params.id;
                    self.current($this);
                }
            });
        },
        current: function($this) {

            var routes = document.querySelectorAll('section.active')
            for (var i = 0; i < routes.length; i++) {
                routes[i].classList.remove('active');
            }
            var targetElement = document.getElementById($this);
            if ( targetElement ) {
                targetElement.classList.add('active');
            }

        }

    }

    var content = {

        init: function(data) {

            this.create(data)

        },
        create: function(data) {
            
            for (var i = 0; i < data.photos.length; i++) {
                var newEntry = document.createElement('a');
                newEntry.id = 'main_'+i;//data.photos[i].id;
                newEntry.href = '#detail';
                document.getElementById('start').appendChild(newEntry);
            }
            this.render(data)

        },
        render: function(data) {

            for (var i = 0; i < data.photos.length; i++) {
                shaven.default(
                    [document.getElementById('main_'+i),//data.photos[i].id
                        ['div', {
                            style: { 'background-image': 'url('+data.photos[i].img_src+')' },
                        }],
                        ['ul',    
                            ['li', 'Camera',
                                ['p',data.photos[i].camera.name]
                            ],
                            ['li', 'ID',
                                ['p',data.photos[i].id]
                            ],    
                        ]   
                    ]
                )
            }
            detail.init(data)
        }
    }

    var detail = {
        init: function(data) {

            this.create(data)

        },
        create: function(data) {

            var newEntry_detail = document.createElement('section');
            newEntry_detail.id = 'detail';
            document.getElementById('body').appendChild(newEntry_detail);

            this.render(data);
            
        },
        render: function(data) {

            shaven.default(
                [document.getElementById('detail'),
                    ['header',
                        ['h1',
                            ['a','home', {href:'index.html#start'}]],
                        ['p','>'],
                        ['p', 'detail' ]
                    ],
                    ['img', {id: 'detail_img'} ],
                    ['ul',    
                        ['li', 'ID',
                            ['p', {id: 'detail_id'} ]
                        ],
                        ['li', 'CAM',
                            ['p', {id: 'detail_cam'} ]
                        ],    
                    ]   
                ]
            )

            this.select(data);

        },
        select: function(data) {
            var self = this;
            var allElements = document.getElementById('start').getElementsByTagName('a');
            for (var i = 0; i < allElements.length; i++) {
                allElements[i].addEventListener("click", function() {
                    var aCurrent = this;
                    var aIndex = aCurrent.id.substr(-1);
                    console.log(aIndex)
                    self.update(data,aIndex);
                });    
            }
        },
        update: function(data,aIndex) {

            document.getElementById('detail_img').src       = data.photos[aIndex].img_src;
            document.getElementById('detail_id').innerHTML  = data.photos[aIndex].id;
            document.getElementById('detail_cam').innerHTML = data.photos[aIndex].camera.name;

        }
    }

    // roep de functie app.init aan
    app.init()

})()






