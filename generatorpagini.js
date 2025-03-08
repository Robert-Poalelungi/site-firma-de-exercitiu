console.info("Rouge et Noir - Generator Pagini")

// Incarcam lista de produse.
var lista_produse = get_produse();

function build_checkout(){
    console.info("Rouge et Noir - Generator Pagini - Checkout")
    // Element produs in cos HTML
    var produs_in_cos = `
			      <div class="product">
              <div class="image-box">
                <img src="./img/produse/%PRODUS_ID%.png" class="product-img" />
              </div>
              <div class="details">
                <h4 class="product-name">%PRODUS_NUME%</h4>
                <div class="product-qty">
                  <button type="button" id="decrease" onclick="add_item_to_cart(%PRODUS_ID%, -1); document.location.reload();">
                    <ion-icon name="remove-outline"></ion-icon>
                  </button>
                  <span id="quantity">%QUANTITY%</span>
                  <button type="button" id="increase" onclick="add_item_to_cart(%PRODUS_ID%, 1); document.location.reload();">
                    <ion-icon name="add-outline"></ion-icon>
                  </button>
                </div>
                <div class="price">LEI&nbsp;<span id="price">%PRODUS_PRET%</span></div>
              </div>
              <button type="button" class="product-close-btn" onclick="remove_item_from_cart(%PRODUS_ID%); document.location.reload();">
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>
            <!-- END PRODUCTS -->
			`;

    // Generam pagina de checkout.
    var cos_de_cumparaturi = get_produse_in_cos();
    var pret_total = 0;

    // Pentru fiecare produs din cos
    cos_de_cumparaturi.forEach(element => {
        console.log("Adaugam produs " + element.id + "(Nume: " + lista_produse[element.id].nume + " Pret: " + lista_produse[element.id].pret + ") in lista.")

        var cart_element = produs_in_cos

        // Generam un obiect HTML.
        cart_element = cart_element.replaceAll("%PRODUS_ID%", element.id);
        cart_element = cart_element.replaceAll("%PRODUS_NUME%", lista_produse[element.id].nume);
        cart_element = cart_element.replaceAll("%PRODUS_PRET%", (lista_produse[element.id].pret * element.quantity));
        cart_element = cart_element.replaceAll("%QUANTITY%", element.quantity);

        pret_total = pret_total + (lista_produse[element.id].pret * element.quantity);

        document.getElementById("products-list").innerHTML = document.getElementById("products-list").innerHTML.replace("<!-- END PRODUCTS -->", cart_element);
    });

    // Pretul total al cosului.
    document.getElementById("total").innerHTML = pret_total
}

function build_pagina_de_produs(){
  console.info("Rouge et Noir - Generator Pagini - Pagina de produs")

    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get("id");

    document.getElementById("produs-imagine").src = document.getElementById("produs-imagine").src.replaceAll("%PRODUCT_ID%", id);
    document.getElementById("produs-titlu").innerHTML = lista_produse[id].nume;
    document.getElementById("produs-descriere").innerHTML = lista_produse[id].descriere;
    document.getElementById("produs-pret").innerHTML = lista_produse[id].pret + " Lei";
    document.getElementById("produs-cod").innerHTML = "COD PRODUS: " + id;
    //console.log( document.getElementById("buton_add_to_cart").innerHTML);

    document.getElementById("buton_add_to_cart").onclick = function() {
      var cantitate = document.getElementById("quantity").selectedIndex + 1;
      add_item_to_cart(id, parseInt(cantitate)); 
      document.getElementById("boughtAlert").hidden=false; 
      document.getElementById("cantitateText").innerText = cantitate;
      document.getElementById("navIcon").scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
}

function build_produse_barbati(){
  var produs_in_lista = `
         <div class="product-element">
          <div class="product">
            <div class="product-img">
              <a href="/produs.html?id=%PRODUS_ID%">
                <img
                  class="p-img"
                  src="./img/produse/%PRODUS_ID%.png"
                  alt=""
                />
              </a>
            </div>
            <div class="product-details">
              <h3>
                <a href="/produs.html?id=%PRODUS_ID%">%PRODUS_NUME%</a>
              </h3>
              <div class="product-price">
                <span>LEI %PRODUS_PRET%</span>
              </div>
            </div>
          </div>
        </div>
        <!-- END PRODUCT -->`;
  
  lista_produse.forEach(element => {
    if(element.gender == "barbati"){
      console.log("Adaugam produs " + element.id + "(Nume: " + lista_produse[element.id].nume + " Pret: " + lista_produse[element.id].pret + ") in lista.")

      var cart_element = produs_in_lista

      // Generam un obiect HTML.
      cart_element = cart_element.replaceAll("%PRODUS_ID%", element.id);
      cart_element = cart_element.replaceAll("%PRODUS_NUME%", element.nume);
      cart_element = cart_element.replaceAll("%PRODUS_PRET%", element.pret);

      document.getElementById("products-list").innerHTML = document.getElementById("products-list").innerHTML.replace("<!-- END PRODUCT -->", cart_element);
    }
  });
}

function build_produse_femei(){
  var produs_in_lista = `
         <div class="product-element">
          <div class="product">
            <div class="product-img">
              <a href="/produs.html?id=%PRODUS_ID%">
                <img
                  class="p-img"
                  src="./img/produse/%PRODUS_ID%.png"
                  alt=""
                />
              </a>
            </div>
            <div class="product-details">
              <h3>
                <a href="/produs.html?id=%PRODUS_ID%">%PRODUS_NUME%</a>
              </h3>
              <div class="product-price">
                <span>LEI %PRODUS_PRET%</span>
              </div>
            </div>
          </div>
        </div>
        <!-- END PRODUCT -->`;
  
  lista_produse.forEach(element => {
    if(element.gender == "femei"){
      console.log("Adaugam produs " + element.id + "(Nume: " + lista_produse[element.id].nume + " Pret: " + lista_produse[element.id].pret + ") in lista.")

      var cart_element = produs_in_lista

      // Generam un obiect HTML.
      cart_element = cart_element.replaceAll("%PRODUS_ID%", element.id);
      cart_element = cart_element.replaceAll("%PRODUS_NUME%", element.nume);
      cart_element = cart_element.replaceAll("%PRODUS_PRET%", element.pret);

      document.getElementById("products-list").innerHTML = document.getElementById("products-list").innerHTML.replace("<!-- END PRODUCT -->", cart_element);
    }
  });
}

window.onload = function(){
    if(window.location.href.includes("checkout")){
        build_checkout();
    }

    if(window.location.href.includes("produs") && !window.location.href.includes("produse") ){
        build_pagina_de_produs();
    }

    if(window.location.href.includes("produse") && window.location.href.includes("barbati")){
      build_produse_barbati();
    }

    if(window.location.href.includes("produse") && window.location.href.includes("femei")){
      build_produse_femei();
    }
  }