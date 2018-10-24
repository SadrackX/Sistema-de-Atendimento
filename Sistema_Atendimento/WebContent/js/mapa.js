var geocoder;
        var map;
        var marker;
        var directionsService = new google.maps.DirectionsService();

        function initialize() {
            directionsDisplay = new google.maps.DirectionsRenderer();
            var latlng = new google.maps.LatLng(-18.898123, -48.265920);
            var options = {
                zoom: 15,
                center: latlng,
                mapTypeIds: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById("mapa"), options);
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel(document.getElementById("trajeto-texto"));

            geocoder = new google.maps.Geocoder();

            marker = new google.maps.Marker({
                map: map,
                draggable: false,
                animation: google.maps.Animation.DROP
            });

            if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {

            pontoPadrao = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(pontoPadrao);
            
            var geocoder = new google.maps.Geocoder();
            
            geocoder.geocode({
                "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
            },
            function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    $("#txtEnderecoPartida").val(results[0].formatted_address);
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        map: map,
                        title: 'Sua localização atual!'
                    });
                }
            });
        });
    }

        }

        $(document).ready(function () {

            initialize();

                // CARREGANDO O MAPA
                function carregarNoMapa(endereco) {
                    geocoder.geocode({ 'address': endereco + ', Brasil', 'region': 'BR' }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {
                                var latitude = results[0].geometry.location.lat();
                                var longitude = results[0].geometry.location.lng();

                                $('#txtEndereco').val(results[0].formatted_address);
                                $('#txtLatitude').val(latitude);
                                $('#txtLongitude').val(longitude);

                                var location = new google.maps.LatLng(latitude, longitude);
                                marker.setPosition(location);
                                map.setCenter(location);
                                map.setZoom(16);
                            }
                        }
                    })
                }

                // CAPTURANDO AS POSIÇÕES E RESULTANDO
                google.maps.event.addListener(marker, 'drag', function () {
                    geocoder.geocode({ 'latLng': marker.getPosition() }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results[0]) {  
                                $('#txtEndereco').val(results[0].formatted_address);
                                $('#txtLatitude').val(marker.getPosition().lat());
                                $('#txtLongitude').val(marker.getPosition().lng());
                            }
                        }
                    });
                });

                $("#txtEndereco").autocomplete({
                    source: function (request, response) {
                        geocoder.geocode({ 'address': request.term + ', Brasil', 'region': 'BR' }, function (results, status) {
                            response($.map(results, function (item) {
                                return {
                                    label: item.formatted_address,
                                    value: item.formatted_address,
                                    latitude: item.geometry.location.lat(),
                                    longitude: item.geometry.location.lng()
                                }
                            }));
                        })
                    },
                    
                });

                 $("#btnEndereco").click(function(){
                    
                    var request = {
                        origin: $("#txtEnderecoPartida").val(),
                        destination:$("#txtEndereco").val(),
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    };

                    directionsService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                        }
                    });
                });
        });