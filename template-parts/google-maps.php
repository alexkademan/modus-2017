<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAjSYHksW_I7X6v0hEBtJP-VetxfGIRbFM&callback=initMap"></script>
<script>
  var bittersMap = (function () {
    // var myLatlng = new google.maps.LatLng(43.177400, -87.963785),
    var myLatlng = new google.maps.LatLng(43.177177, -87.964136),
        mapCanvas = document.getElementById('map_canvas'),
        mapOptions = {
          center: myLatlng,
          zoom: 15,
          scrollwheel: false,
          mapTypeControl: false,
          scaleControl: false,
          draggable: false,
          disableDefaultUI: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        },
        map = new google.maps.Map(mapCanvas, mapOptions),
        contentString =
          '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">Modus Design, Inc.</h1>'+
          '<div id="bodyContent"'+
          '<p>8759 N Deerwood Drive</p>'+
          '</div>'+
          '</div>',
        infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 300,
        }),
        marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Modus Design, Inc.',
          icon: '<?php echo get_bloginfo('template_url') ?>/images/map-icon.png',
        });

    return {
      init: function () {
        map.set('styles', [{
          featureType: 'landscape',
          elementType: 'all',
          stylers: [
            { hue: '#F4F4F4' },
            { saturation: -100 },
            { lightness: 61 },
            { visibility: 'on' }
          ]
        },{
          featureType: 'road',
          elementType: 'all',
          stylers: [
            { hue: '#999999' },
            { saturation: -100 },
            { lightness: -6 },
            { visibility: 'on' }
          ]
        },{
          featureType: 'poi',
          elementType: 'all',
          stylers: [
            { hue: '#999999' },
            { saturation: -100 },
            { lightness: -23 },
            { visibility: 'on' }
          ]
        },{
          featureType: 'poi.business',
          stylers: [
            {visibility: 'off'}
          ]
        },{
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [
            {visibility: 'off'}
          ]
        }]);

        google.maps.event.addListener(marker, 'click', function () {
          infowindow.open(map,marker);
        });
      }
    };
  }());

  bittersMap.init();
</script>
