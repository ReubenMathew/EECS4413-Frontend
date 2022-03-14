import { data } from "./dummyData";

export const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  email: "",
  username: "",
  cart: [],
  catalogData: [
    {
      id: 0,
      productName: "IKEA Exhaust hood",
      category: "IKEA",
      description: "Its a Exhaust hood.",
      color: "Purple",
      price: 204,
      quantity: 44,
    },
    {
      id: 1,
      productName: "Fagor Air ioniser",
      category: "Fagor",
      description: "Its a Air ioniser.",
      color: "Blue",
      price: 57,
      quantity: 76,
    },
    {
      id: 2,
      productName: "Admiral Oil heater",
      category: "Admiral",
      description: "Its a Oil heater.",
      color: "Green",
      price: 318,
      quantity: 42,
    },
    {
      id: 3,
      productName: "Amana Fan heater",
      category: "Amana",
      description: "Its a Fan heater.",
      color: "Green",
      price: 390,
      quantity: 6,
    },
    {
      id: 4,
      productName: "Siemens Box mangle",
      category: "Siemens",
      description: "Its a Box mangle.",
      color: "White",
      price: 428,
      quantity: 90,
    },
    {
      id: 5,
      productName: "KitchenAid Back boiler",
      category: "KitchenAid",
      description: "Its a Back boiler.",
      color: "Green",
      price: 131,
      quantity: 66,
    },
    {
      id: 6,
      productName: "Sharp Window fan",
      category: "Sharp",
      description: "Its a Window fan.",
      color: "Orange",
      price: 205,
      quantity: 14,
    },
    {
      id: 7,
      productName: "IKEA Solar water heater",
      category: "IKEA",
      description: "Its a Solar water heater.",
      color: "Red",
      price: 122,
      quantity: 24,
    },
    {
      id: 8,
      productName: "Samsung Hair iron",
      category: "Samsung",
      description: "Its a Hair iron.",
      color: "Orange",
      price: 450,
      quantity: 57,
    },
    {
      id: 9,
      productName: "Sharp Gas appliance",
      category: "Sharp",
      description: "Its a Gas appliance.",
      color: "Orange",
      price: 337,
      quantity: 40,
    },
    {
      id: 10,
      productName: "Sharp Humidifier",
      category: "Sharp",
      description: "Its a Humidifier.",
      color: "Purple",
      price: 478,
      quantity: 67,
    },
    {
      id: 11,
      productName: "IKEA Water heater",
      category: "IKEA",
      description: "Its a Water heater.",
      color: "Blue",
      price: 45,
      quantity: 71,
    },
    {
      id: 12,
      productName: "Franke Hair iron",
      category: "Franke",
      description: "Its a Hair iron.",
      color: "Orange",
      price: 249,
      quantity: 80,
    },
    {
      id: 13,
      productName: "IKEA Icebox",
      category: "IKEA",
      description: "Its a Icebox.",
      color: "Black",
      price: 83,
      quantity: 94,
    },
    {
      id: 14,
      productName: "Whirlpool Vacuum cleaner",
      category: "Whirlpool",
      description: "Its a Vacuum cleaner.",
      color: "Purple",
      price: 373,
      quantity: 4,
    },
    {
      id: 15,
      productName: "Amana Central vacuum cleaner",
      category: "Amana",
      description: "Its a Central vacuum cleaner.",
      color: "Blue",
      price: 190,
      quantity: 2,
    },
    {
      id: 16,
      productName: "Electrolux Trouser press",
      category: "Electrolux",
      description: "Its a Trouser press.",
      color: "Orange",
      price: 487,
      quantity: 5,
    },
    {
      id: 17,
      productName: "Fagor Paper shredder",
      category: "Fagor",
      description: "Its a Paper shredder.",
      color: "White",
      price: 423,
      quantity: 36,
    },
    {
      id: 18,
      productName: "Amana Gas appliance",
      category: "Amana",
      description: "Its a Gas appliance.",
      color: "Purple",
      price: 205,
      quantity: 68,
    },
    {
      id: 19,
      productName: "Bosch Electric water boiler",
      category: "Bosch",
      description: "Its a Electric water boiler.",
      color: "Black",
      price: 26,
      quantity: 34,
    },
    {
      id: 20,
      productName: "KitchenAid Home server",
      category: "KitchenAid",
      description: "Its a Home server.",
      color: "Blue",
      price: 345,
      quantity: 53,
    },
    {
      id: 21,
      productName: "Bosch Drawer dishwasher",
      category: "Bosch",
      description: "Its a Drawer dishwasher.",
      color: "Blue",
      price: 406,
      quantity: 33,
    },
    {
      id: 22,
      productName: "IKEA Paper shredder",
      category: "IKEA",
      description: "Its a Paper shredder.",
      color: "Green",
      price: 467,
      quantity: 19,
    },
    {
      id: 23,
      productName: "Fagor Can opener",
      category: "Fagor",
      description: "Its a Can opener.",
      color: "White",
      price: 228,
      quantity: 65,
    },
    {
      id: 24,
      productName: "Siemens Water purifier",
      category: "Siemens",
      description: "Its a Water purifier.",
      color: "White",
      price: 482,
      quantity: 74,
    },
    {
      id: 25,
      productName: "Bosch Beverage opener",
      category: "Bosch",
      description: "Its a Beverage opener.",
      color: "Blue",
      price: 69,
      quantity: 60,
    },
    {
      id: 26,
      productName: "Amana Domestic robot",
      category: "Amana",
      description: "Its a Domestic robot.",
      color: "Orange",
      price: 303,
      quantity: 57,
    },
    {
      id: 27,
      productName: "Franke Ceiling fan",
      category: "Franke",
      description: "Its a Ceiling fan.",
      color: "Purple",
      price: 473,
      quantity: 2,
    },
    {
      id: 28,
      productName: "Admiral Aroma lamp",
      category: "Admiral",
      description: "Its a Aroma lamp.",
      color: "Green",
      price: 194,
      quantity: 92,
    },
    {
      id: 29,
      productName: "KitchenAid Clothes iron",
      category: "KitchenAid",
      description: "Its a Clothes iron.",
      color: "Black",
      price: 255,
      quantity: 7,
    },
    {
      id: 30,
      productName: "Sharp Go-to-bed matchbox",
      category: "Sharp",
      description: "Its a Go-to-bed matchbox.",
      color: "Purple",
      price: 418,
      quantity: 93,
    },
    {
      id: 31,
      productName: "Whirlpool Steam mop",
      category: "Whirlpool",
      description: "Its a Steam mop.",
      color: "Purple",
      price: 29,
      quantity: 11,
    },
    {
      id: 32,
      productName: "Bosch Dish draining closet",
      category: "Bosch",
      description: "Its a Dish draining closet.",
      color: "Green",
      price: 424,
      quantity: 44,
    },
    {
      id: 33,
      productName: "Samsung Go-to-bed matchbox",
      category: "Samsung",
      description: "Its a Go-to-bed matchbox.",
      color: "White",
      price: 101,
      quantity: 82,
    },
    {
      id: 34,
      productName: "Fagor Bachelor griller",
      category: "Fagor",
      description: "Its a Bachelor griller.",
      color: "White",
      price: 354,
      quantity: 98,
    },
    {
      id: 35,
      productName: "KitchenAid Refrigerator",
      category: "KitchenAid",
      description: "Its a Refrigerator.",
      color: "Blue",
      price: 213,
      quantity: 95,
    },
    {
      id: 36,
      productName: "Whirlpool Exhaust hood",
      category: "Whirlpool",
      description: "Its a Exhaust hood.",
      color: "White",
      price: 289,
      quantity: 49,
    },
    {
      id: 37,
      productName: "Amana HVAC",
      category: "Amana",
      description: "Its a HVAC.",
      color: "Purple",
      price: 61,
      quantity: 94,
    },
    {
      id: 38,
      productName: "Samsung Air purifier",
      category: "Samsung",
      description: "Its a Air purifier.",
      color: "Orange",
      price: 20,
      quantity: 18,
    },
    {
      id: 39,
      productName: "LG Hob (hearth)",
      category: "LG",
      description: "Its a Hob (hearth).",
      color: "Black",
      price: 296,
      quantity: 75,
    },
    {
      id: 40,
      productName: "Bosch Electric water boiler",
      category: "Bosch",
      description: "Its a Electric water boiler.",
      color: "Black",
      price: 114,
      quantity: 90,
    },
    {
      id: 41,
      productName: "Sharp Bachelor griller",
      category: "Sharp",
      description: "Its a Bachelor griller.",
      color: "Red",
      price: 188,
      quantity: 6,
    },
    {
      id: 42,
      productName: "KitchenAid Garbage disposal unit",
      category: "KitchenAid",
      description: "Its a Garbage disposal unit.",
      color: "Green",
      price: 159,
      quantity: 4,
    },
    {
      id: 43,
      productName: "Bosch Trouser press",
      category: "Bosch",
      description: "Its a Trouser press.",
      color: "Blue",
      price: 93,
      quantity: 89,
    },
    {
      id: 44,
      productName: "LG Micathermic heater",
      category: "LG",
      description: "Its a Micathermic heater.",
      color: "Orange",
      price: 159,
      quantity: 72,
    },
    {
      id: 45,
      productName: "Sharp Sewing machine",
      category: "Sharp",
      description: "Its a Sewing machine.",
      color: "Purple",
      price: 150,
      quantity: 98,
    },
    {
      id: 46,
      productName: "Blue Star Paper shredder",
      category: "Blue Star",
      description: "Its a Paper shredder.",
      color: "Black",
      price: 340,
      quantity: 90,
    },
    {
      id: 47,
      productName: "Bosch Dishwasher",
      category: "Bosch",
      description: "Its a Dishwasher.",
      color: "Red",
      price: 277,
      quantity: 42,
    },
    {
      id: 48,
      productName: "Sharp Fan heater",
      category: "Sharp",
      description: "Its a Fan heater.",
      color: "Blue",
      price: 193,
      quantity: 83,
    },
    {
      id: 49,
      productName: "Sharp Mangle (machine)",
      category: "Sharp",
      description: "Its a Mangle (machine).",
      color: "Blue",
      price: 30,
      quantity: 20,
    },
  ],
  searchParams: { productName: "", brand: "", category: "" },
};

export const storageReducer = (state, action) => {
  switch (action.type) {
    case "INIT_STORED": {
      return action.data;
    }
    case "SET_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: true,
      };
    case "SET_LOGGED_OUT":
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        email: "",
        username: "",
        cart: [],
        catalogData: data(),
      };
    case "SET_IS_ADMIN":
      return {
        ...state,
        isAdmin: true,
      };
    case "SET_NOT_ADMIN":
      return {
        ...state,
        isAdmin: false,
      };
    case "SET_USERNAME":
      return {
        ...state,
        username: action.data,
      };
    case "SET_EMAIL":
      return {
        ...state,
        email: action.data,
      };
    case "SET_SEARCH_PARAMS":
      return {
        ...state,
        searchParams: action.data,
      };
    case "SET_CATALOG_PRODUCTS":
      return {
        ...state,
        catalogData: action.data,
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cart: state.cart.concat(action.data),
      };
    case "CART_QUANT_CHANGE":
      return {
        ...state,
        cart: action.data,
      };

    default:
      return state;
  }
};
