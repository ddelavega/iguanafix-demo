jQuery(document).ready(function(){
    // This button will increment the value
    $('.qtyplus').click(function(e){
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        prdQuant(0,currentVal);
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            prdQuant(0,currentVal+1);
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            prdQuant(0,0);
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
    });
    // This button will decrement the value till 0
    $(".qtyminus").click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('field');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val());
        // If it isn't undefined or its greater than 0
        prdQuant(0,currentVal);
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            prdQuant(0,currentVal-1);
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            prdQuant(0,0);
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
    });
});
    function selecSld() {
        var text;
        var productId = document.getElementById("mySelect").value;
        var quant = document.getElementById("quant");

        switch(productId) {
            case "1":
            sldr(1);
            prdQuant(1,2);
            quant.min = "2";
            break;
            case "2":
            sldr(2);
            prdQuant(2,1);
            quant.min = "1";
            break;
            default:
            sldr(1);
        }
    }
selecSld(1)

/*
"id": "2",
"installationTypeId":1,
"description": "Entre 3000 y 4500 frigorías",
"minQuantity": 1,
"unit": "unidad/es",
"unitPriceInCents": 54900
*/


function prdQuant(cta,val){
  var xmlhttp;
  if (window.XMLHttpRequest){
    //Mozilla, Safari, etc
    xmlhttp = new XMLHttpRequest();
  }else if (window.ActiveXObject){
    //Nuestro querido IE
    try {
      xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try { //Version mas antigua
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {}
    }
  }
  if (!xmlhttp){
    alert("No ha sido posible crear un objeto de XMLHttpRequest");
  }
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var selArr = JSON.parse(this.responseText);
      selFunction(selArr);
    }
  };
  xmlhttp.open('GET', 'https://private-70cb45-aobara.apiary-mock.com/product/list', true);
  xmlhttp.send();
  function selFunction(selarr) {
    var i;
    var ssum;
    document.getElementById("price").innerHTML=0;
    for(i = 0; i < selarr.length; i++) {

        document.getElementById("price").innerHTML=(selarr[i].unitPriceInCents * val) /100;

      if(cta == selarr[i].id){

        ssum = document.getElementById("quant").value = selarr[i].minQuantity;
        document.getElementById("msgs").innerHTML='cantidad minima ' + selarr[i].minQuantity;
      }



    }
  }
}
prdQuant(2,1);
/*
Bucle multiplica el fromprice con el input segun el value o id que registre*/




    function sldr(productId){
      var xmlhttp;
      if (window.XMLHttpRequest){
        //Mozilla, Safari, etc
        xmlhttp = new XMLHttpRequest();
      }else if (window.ActiveXObject){
        //Nuestro querido IE
        try {
          xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          try { //Version mas antigua
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e) {}
        }
      }
      if (!xmlhttp){
        alert("No ha sido posible crear un objeto de XMLHttpRequest");
      }
      var url = 'https://private-70cb45-aobara.apiary-mock.com/product/' + productId + '/photos';
      var sldrCont = document.getElementById("sld");
      var thumbs = document.getElementById("thumbs");


      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var myArr = JSON.parse(this.responseText);
          sldrFunction(myArr);
        }
      };
      xmlhttp.open('GET', url, true);
      xmlhttp.send();
      function sldrFunction(arr) {
        var i;
        var out = '';
        for(i = 0; i < arr.length; i++) {
          out += '<div class="mySlides fade">';
          out += '<img alt="' + arr[i].url + '" src="' + arr[i].url + '" /><br />';
          out += '</div>';
          sldrCont.getElementsByClassName("mySlides")[i].getElementsByTagName("img")[0].src = arr[i].url;
          thumbs.getElementsByTagName("a")[i].getElementsByTagName("img")[0].src = arr[i].url;
        }
      }
    }
    // Muestra el slider y por defecto defino el primer array productId 1
    sldr(1);

    var slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }

    // Thumbnail image controls
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex-1].style.display = "block";
      dots[slideIndex-1].className += " active";
    }

    function selec(urls){
      var xmlhttp;
      if (window.XMLHttpRequest){
        //Mozilla, Safari, etc
        xmlhttp = new XMLHttpRequest();
      }else if (window.ActiveXObject){
        //Nuestro querido IE
        try {
          xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          try { //Version mas antigua
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e) {}
        }
      }
      if (!xmlhttp){
        alert("No ha sido posible crear un objeto de XMLHttpRequest");
      }
      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var selArr = JSON.parse(this.responseText);
          selFunction(selArr);
        }
      };
      xmlhttp.open('GET', urls, true);
      xmlhttp.send();
      function selFunction(selarr) {
        var i;
        var selects = '<option value="0">Seleccionar</option>';
        for(i = 0; i < selarr.length; i++) {
          selects += '<option value="'+ selarr[i].id +'">'+ selarr[i].description +'</option>';
          document.getElementById("mySelect").innerHTML=selects;
        }
      }
    }
    selec('https://private-70cb45-aobara.apiary-mock.com/product/list');
    function relac(urls){
      var xmlhttp = new XMLHttpRequest();


      xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var relArr = JSON.parse(this.responseText);
          relFunction(relArr);
        }
      };
      xmlhttp.open('GET', urls, true);
      xmlhttp.send();
      function relFunction(relarr) {
        var i;
        var relacionados = '';
        for(i = 0; i < relarr.length; i++) {
          relacionados += '<div class="related col-12 col-sm-3 col-md-4 px-2 mx-auto">';
          relacionados += '<div class="card">';
          relacionados += '<a href="#"><img src="' + relarr[i].pictureUrl + '" alt="'+ relarr[i].title +'" /></a>';
          relacionados += '<div class="desc">';
          relacionados += '<h5>' + relarr[i].title + ' [id:' + relarr[i].id + ']</h5>';
          relacionados += '<small><i class="far fa-credit-card"></i> desde ' + relarr[i].fromPrice + '</small>';
          relacionados += '<p>' + relarr[i].description + '</p>';
          relacionados += '<p class="text-right"><a class="btn btn-custom-outline">Contratar</a></p>';
          relacionados += '</div></div></div>';
          document.getElementById("relacionados").innerHTML = relacionados;
        }
      }
    }
    relac('https://private-70cb45-aobara.apiary-mock.com/related-product/list');

    // Tabs
    var tabIndex = 1;
    showTabs(tabIndex);

    function currentTab(n) {
      showTabs(tabIndex = n);
    }

    function showTabs(n) {
      var i;
      var tabs = document.getElementsByClassName("myTabs");
      var tlinks = document.getElementsByClassName("tlinks");
      if (n > tabs.length) {tabIndex = 1}
      if (n < 1) {tabIndex = tabs.length}
      for (i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
      }
      for (i = 0; i < tlinks.length; i++) {
          tlinks[i].className = tlinks[i].className.replace(" activo", "");
      }
      tabs[tabIndex-1].style.display = "block";
      tlinks[tabIndex-1].className += " activo";
    }
