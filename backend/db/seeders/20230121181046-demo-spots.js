'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Spots";
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "1464 La Playa St",
          city: "San Francisco",
          state: "CA",
          country: "United States",
          lat: 37.759172,
          lng: -122.509087,
          name: "Entire Apartment",
          description:
            "Elegant and newly remodeled this 1 bedroom 1 bathroom apartment is perfectly located in one of San Francisco's most sought-after neighborhoods: Pacific Heights. ",
          price: 334.0,
        },
        {
          ownerId: 2,
          address: "3790 South Las Vegas Blvd",
          city: "Las Vegas",
          state: "NV",
          country: "United States",
          lat: 36.102086,
          lng: -115.173178,
          name: "Full House",
          description:
            "Live the life of luxury in this beautiful environment friendly Vegas home. ",
          price: 255.0,
        },
        {
          ownerId: 1,
          address: "123 Main St",
          city: "New York",
          state: "NY",
          country: "United States",
          lat: 40.722907,
          lng: -73.995914,
          name: "Luxury Downtown Loft",
          description:
            "Dream in a luxury haven in the heart of Times Square. Elevated on the 23rd floor, marvel at the breathtaking Manhattan skyline.",
          price: 324.0,
        },
        {
          ownerId: 3,
          address: "26 Belveere St",
          city: "Los Angeles",
          state: "CA",
          country: "United States",
          lat: 34.071684,
          lng: -118.227025,
          name: "Entire Villa",
          description:
            "Nestled atop a lush hillside in the coveted Beverly Hills area, The Residence is a quiet nature retreat for the discerning traveler. ",
          price: 679.0,
        },
        {
          ownerId: 1,
          address: "246 54th St",
          city: "Miami",
          state: "FL",
          country: "United States",
          lat: 25.777747,
          lng: -80.131272,
          name: "High-Rise Condo",
          description:
            "Take a break from the fast life and rejuvenate in these adorable One Bedroom apartment suites right on Miami Beach. ",
          price: 223.0,
        },
        {
          ownerId: 3,
          address: "369 Calle Cordoba",
          city: "Mexico City",
          state: "Ciudad de Mexico",
          country: "Mexico",
          lat: 19.421879,
          lng: -99.159459,
          name: "Downtown Loft",
          description:
            "Este 3BR se encuentra en el hermoso distrito de Condesa, hogar de clases de yoga, parejas jóvenes y adolescentes de skate, es el corazón del elegante pero relajante Hipódromo.",
          price: 153.0,
        },
        {
          ownerId: 2,
          address: "159 Top St",
          city: "Paris",
          state: "Île-de-France",
          country: "France",
          lat: 48.867776,
          lng: 2.361111,
          name: "Elegant Estate",
          description:
            "Sublime appartement d'exception de 100m² en Duplex, luxueux, moderne, lumineux, situé en face du Musée du Louvre, du Jardin du Palais Royal et de la rue Saint Honoré.",
          price: 545.0,
        },
        {
          ownerId: 1,
          address: "753 Park St",
          city: "La Paz",
          state: "Baja Sur",
          country: "Mexico",
          lat: 24.172453,
          lng: -110.30078,
          name: "Beach Villa",
          description:
            "Casa Royce Villa is a unique property located in the Maravia Country Club Estates community, 20 minutes drive from La Paz. Spectacular views of the ocean and Espíritu Santo island, a private infinity pool, Mini Golf.",
          price: 212.0,
        },
        {
          ownerId: 2,
          address: "369 Calle Cordoba",
          city: "Mexico City",
          state: "Ciudad de Mexico",
          country: "Mexico",
          lat: 19.421879,
          lng: -99.259459,
          name: "Entire Bungalow",
          description:
            "A scenic tea estate on ninety-eight acres of land in fascinating Ella, Bandarawela, Sri Lanka. The colonial era in Ceylon saw this tea estate being larger in extent.",
          price: 324.0,
        },
        {
          ownerId: 2,
          address: "753 Park St",
          city: "Las Vegas",
          state: "NV",
          country: "United States",
          lat: 36.159466,
          lng: -115.131413,
          name: "Cozy Cottage",
          description:
            "This studio apartment has a 615 sq ft indoor and oversized dryer with - oversized double beds and a double sofa bed, suitable for individuals, couples, families, and groups of up to 4 people.",
          price: 155.0,
        },
        {
          ownerId: 2,
          address: "753 Park St",
          city: "San Francisco",
          state: "CA",
          country: "United States",
          lat: 37.805971,
          lng: -122.440006,
          name: "Cozy Cottage",
          description:
            "Leave your worries behind as you step into this exquisite beach-front sanctuary just minutes from San Francisco. This designer penthouse is built around breathtaking panoramic Pacific views. ",
          price: 233.0,
        },
        {
          ownerId: 2,
          address: "369 Calle Durango",
          city: "Mexico City",
          state: "Ciudad de Mexico",
          country: "Mexico",
          lat: 19.521879,
          lng: -99.159459,
          name: "Downtown Apartment",
          description:
            "Este 3BR se encuentra en el hermoso distrito de Condesa, hogar de clases de yoga, parejas jóvenes y adolescentes de skate, es el corazón del elegante pero relajante Hipódromo. Este 3BR se encuentra en el hermoso distrito de Condesa, hogar de clases de yoga, parejas jóvenes y adolescentes de skate, es el corazón del elegante pero relajante Hipódromo. Este 3BR se encuentra en el hermoso distrito de Condesa, hogar de clases de yoga, parejas jóvenes y adolescentes de skate, es el corazón del elegante pero relajante Hipódromo.",
          price: 345.0,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        country: {
          [Op.in]: ["United States", "Mexico", "France"],
        },
      },
      {}
    );
  },
};
