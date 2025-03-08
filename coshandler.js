console.info("Rouge et Noir - Cart Handler")

function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    // Return null if not found
    return null;
}

function setCookie(name, value, daysToLive) {
    // Encode value in order to escape semicolons, commas, and whitespace
    var cookie = name + "=" + encodeURIComponent(value);
    
    if(typeof daysToLive === "number") {
        /* Sets the max-age attribute so that the cookie expires
        after the specified number of days */
        cookie += "; max-age=" + (daysToLive*24*60*60);
        
        document.cookie = cookie;
    }
}

// Variabila de cart.
var cart = [];

// Obiect-ul unui produs in cos. Cosul este o lista de acest tip de obiecte.
function produs_in_cart(product_id, product_quantity){
	this.id = product_id;
	this.quantity = product_quantity;
}

// Functia de incarcat cosul
function read_cart_cookie(){
	console.info("Incarcam cart-ul...")
	
	// Citim cookie-ul cart
	var cart_raw = getCookie("cart");

    // Daca nu avem nimic, nu returnam
	if(cart_raw == null) return;

	// Daca avem in cart, dam parse la JSON.
	cart = JSON.parse(cart_raw);
}

// Functia de salvat cosul
function save_cart_cookie(){
    console.info("Salvam cart-ul...")

	// Transformam cart-ul in JSON.
	var cart_raw = JSON.stringify(cart);

	// Salvam cart-ul in cookie.
	setCookie("cart", cart_raw, 7)
}

// Functia de stergere a unui produs din cos.
function remove_item_from_cart(id){
    // Cautam produsul in cart.

    cart.forEach(element => {
          if(element.id == id){
              console.log("Am updatat cart-ul.")
              // Daca il gasim in cart, il stergem
        cart.splice(cart.indexOf(element), 1);
          }
      });	
    save_cart_cookie();
}

// Functia de adaugare a unui produs in cos.
function add_item_to_cart(product_id, product_quantity){
	var gasit_produs = false;
	
	// Cautam produsul in cart.
	cart.forEach(element => {
		if(element.id == product_id){
			console.log("Am updatat cart-ul.")
			// Daca il gasim in cart, schimbal cantitatea.
			element.quantity += product_quantity;
			gasit_produs = true;
      if(element.quantity <= 0){
        element.quantity = 1;
      }
		}
	});	
	
	if(gasit_produs == false){
		// Nu am gasit item-ul in cart. Cream unul nou.
		console.log("Item nou in cart.")
		cart_obj = new produs_in_cart(product_id, product_quantity);
		cart.push(cart_obj);
	}	
	// Salvam cart-ul.
	save_cart_cookie();
}

read_cart_cookie();

function get_produse_in_cos(){
    return cart;
}