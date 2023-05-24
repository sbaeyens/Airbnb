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
            "Elegant and newly remodeled this 1 bedroom 1 bathroom apartment is perfectly located in one of San Francisco's most sought-after neighborhoods: Pacific Heights. Centrally located, great restaurants on Union Street are just two blocks away, shopping on Fillmore St. is a 15 min walk, and the water and marina is a short 10 min walk!",
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
            "Live the life of luxury in this beautiful environment friendly Vegas home. Max 8 adults + 4 kids under 12 YO, dog friendly (fee). Conveniently located near the attractions, the ultra-modern home is equipped with impressive amenities for the perfect retreat. It features 4 large bedrooms, expansive outdoor entertainment, a game room, a basketball court, a pool with a waterslide, a hot tub, a sauna, EV Charger and more.",
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
            "Dream in a luxury haven in the heart of Times Square. Elevated on the 23rd floor, marvel at the breathtaking Manhattan skyline. Step onto the 80 sqm private terrace. Cook in a gourmet kitchen, equipped with top-tier appliances and luxury dishes. Stay connected with high-speed internet everywhere.",
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
            "Nestled atop a lush hillside in the coveted Beverly Hills area, The Residence is a quiet nature retreat for the discerning traveler. There are three floors and over 4800 square feet of indoor living space, plus a beautiful outdoor space with a private pool, spa, and breathtaking views of the city below.",
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
            "Take a break from the fast life and rejuvenate in these adorable One Bedroom apartment suites right on Miami Beach. At these furnished apartments, you can enjoy a home cooked meal while you watch the sunset from the balcony and listen to the rhythm of the ocean. Stay fresh all week long and do your own laundry inside the apartment. The stainless steel appliances and ultra modern kitchens and bathroom will not disappoint you.",
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
            "Este 3BR se encuentra en el hermoso distrito de Condesa, hogar de clases de yoga, parejas jóvenes y adolescentes de skate, es el corazón del elegante pero relajante Hipódromo. Los edificios de apartamentos de estilo art déco y el vibrante arte callejero definen las sinuosas calles arboladas del vecindario. ",
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
            "Sublime appartement d'exception de 100m² en Duplex, luxueux, moderne, lumineux, situé en face du Musée du Louvre, du Jardin du Palais Royal et de la rue Saint Honoré. Vivez une expérience incroyable dans l'immeuble de Emily in Paris! Idéal pour les couples, amis, familles ou pour voyages d'affaires. Un service professionnel de grand standing vous attend avec serviettes de bain et draps de qualité hôtelière.",
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
            "Casa Royce Villa is a unique property located in the Maravia Country Club Estates community, 20 minutes drive from La Paz. Spectacular views of the ocean and Espíritu Santo island, a private infinity pool, Mini Golf.minutes from La Paz’s best beaches Balandra and Tecolote. This is one of those places you will boast about visiting. Starlink WIFI, 24/7 security, peaceful and quiet surroundings..",
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
            "A scenic tea estate on ninety-eight acres of land in fascinating Ella, Bandarawela, Sri Lanka. The colonial era in Ceylon saw this tea estate being larger in extent, owned and managed by a Britisher and famously known as the ‘Southerland tea estate’. Estate ownership eventually moved to the UHE Group and was renamed ‘Uva Greenlands’.The plantation, while continuing to produce fine quality Uva, medium elevation Pure Ceylon Tea showed promise as an ideal location for an eco-friendly boutique hotel..",
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
            "This studio apartment has a 615 sq ft indoor and oversized dryer with - oversized double beds and a double sofa bed, suitable for individuals, couples, families, and groups of up to 4 people who want to taste a real las vegas experience.The apartment has a kitchenette, a coffee maker and a working table, a dining area where you can feel at home - life and have a beautiful night view of las vegas avenue!",
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
            "Leave your worries behind as you step into this exquisite beach-front sanctuary just minutes from San Francisco. This designer penthouse is built around breathtaking panoramic Pacific views via 10' floor to ceiling glass. A gas fireplace and huge terrace ensure your views are always comfortable.",
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
            "Este 3BR se encuentra en el hermoso distrito de Condesa, hogar de clases de yoga, parejas jóvenes y adolescentes de skate, es el corazón del elegante pero relajante Hipódromo. Los edificios de apartamentos de estilo art déco y el vibrante arte callejero definen las sinuosas calles arboladas del vecindario.",
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
          [Op.in]: ["United States of America"],
        },
      },
      {}
    );
  },
};
