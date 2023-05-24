'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-704995305925496272/original/c7605da4-fbe0-45df-b3ba-e4314bde6b13.jpeg?im_w=960",
          preview: true,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-704995305925496272/original/fd58b617-d2bd-4fdd-a0f7-b8c8c4bcec10.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-704995305925496272/original/6d0ffc27-8386-4b4d-89f8-bb711c862e0a.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-704995305925496272/original/3509c0a1-8b57-4384-ae1a-c754ad514c19.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 1,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-704995305925496272/original/28598c14-2b06-4315-965e-be6badb445dc.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-894368185789160324/original/63ec8153-1590-4f4f-9a73-ffb69a9d7b0e.png?im_w=960",
          preview: true,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-894368185789160324/original/5223ff1b-f76c-49fe-ac35-8cc99a352283.png?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-894368185789160324/original/c951d8b8-904e-4471-80d2-5f698be30231.png?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-894368185789160324/original/bab17ef0-a681-4579-a055-cdb9619c5048.png?im_w=720",
          preview: false,
        },
        {
          spotId: 2,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-894368185789160324/original/0d817ffc-4252-4c52-9bc2-bba78c64c831.png?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-890431857107940707/original/a058dea9-609f-4f25-a30b-da6e469aae78.jpeg?im_w=960",
          preview: true,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/4eae08b4-5796-49c6-bfc0-edce94310772.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/bb6522c8-c999-452d-96af-2d7c3367ce31.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/0f252644-542e-41c4-8b43-f6b1efccbafd.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 3,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-890431857107940707/original/3f9512a7-71ea-483b-a929-f49b90c61cf9.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-696199818482026210/original/726dbbe8-ba22-4c54-8c78-ae8b425190eb.jpeg?im_w=960",
          preview: true,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-696199818482026210/original/227b82a0-8af4-4d6c-b96f-ee9d3fe66736.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-696199818482026210/original/00b36425-1f76-4f9c-9a16-3f19a964158f.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-696199818482026210/original/6d4cd816-6998-4f0b-81e9-b05a7137664c.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 4,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-696199818482026210/original/606ee141-0410-4a9b-a70e-15979b30cc50.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-46795994/original/14b5ca4e-04ad-40aa-990c-59efd1cea41a.jpeg?im_w=960",
          preview: true,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/af1fe4ac-9623-4ae0-ad0f-fb9511f637a1.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-46795994/original/ccd0047e-3481-4401-9ec8-b5f8acfddb0a.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-46795994/original/e5bc72eb-e5c0-4afb-a633-649a46da2653.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 5,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-46795994/original/2e6eecaf-dc06-4fa2-852d-410e58e24efc.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-842629477987377190/original/4f08b997-ae81-4b3e-a77c-fc1527926a43.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-842629477987377190/original/7637fded-e285-4aea-83fb-792a6d18e85b.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-842629477987377190/original/d14851d4-1597-4bd7-912f-15ead055d7e6.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-842629477987377190/original/f2438479-71be-4c7d-9035-37b7e9e11591.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 6,
          url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-842629477987377190/original/037687d8-2e84-4ac2-9340-134733889576.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-625097026034975535/original/b2758272-900d-4e8b-b35b-f58b7c93fd14.jpeg?im_w=1200",
          preview: true,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-625097026034975535/original/0020242d-cde9-4851-a87a-f679091ab0fe.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-625097026034975535/original/18f852a3-ab06-4394-87e9-082d27fd80e2.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-625097026034975535/original/c6675caa-7622-407e-b039-c41bb606f7bc.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 7,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-625097026034975535/original/54d57b18-b7d6-4124-9f96-c2378e1aa4d2.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-729674218037518507/original/a51ebceb-8bc7-4bf8-ba58-00eb54df77d1.jpeg?im_w=960",
          preview: true,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/efd72341-d36d-463e-baae-e36a81a0c837.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/82373883-cfc7-4bae-9b89-e011e1be1fa0.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-729674218037518507/original/38392c24-597b-4351-9363-528614562970.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 8,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-729674218037518507/original/233664ce-b652-4f4a-8c1d-ab166c5ed6f4.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/566c689f-19c4-4e12-b6c0-b5f110543fa1.jpg?im_w=960",
          preview: true,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/d16a2b7d-0ef1-46a6-9967-2492969b1ff6.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/56b12434-6788-4570-bb79-4d86f931f253.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/38674175/1d3b5733_original.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 9,
          url: "https://a0.muscache.com/im/pictures/5cc2e611-ad5c-44ec-898a-f42ed8ba7831.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-19028982/original/874e3c68-9e2a-4a30-877b-fdd550494e63.jpeg?im_w=960",
          preview: true,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/1bdf4668-4f2a-438c-82dc-e1dd4960a2fa.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-19028982/original/219f677d-7f71-4faf-ab99-44bf5185c9c1.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/4e4cb1b7-381d-42b1-b656-382c0710cdb8.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 10,
          url: "https://a0.muscache.com/im/pictures/c3845d68-2749-4fd3-8459-e15c796e4fc3.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/64724267/fe35dfaa_original.jpg?im_w=960",
          preview: true,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/02a1b6b9-a2bd-4422-b70a-ef9f488652f3.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/8c3564b7-406d-4da9-9149-68817248e990.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/434ec610-626e-4e4f-bf25-6e1d88f3da4e.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 11,
          url: "https://a0.muscache.com/im/pictures/556a1c40-2307-499b-946c-435e477a2aed.jpg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/6a3b4523-bb6d-4b3e-867c-823abf8ca506.jpg?im_w=1200",
          preview: true,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-875960345714291564/original/9ceb353e-e419-444f-a84e-c7975c4655a1.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-875960345714291564/original/918130d4-765b-425f-ac7c-5366bb87db6a.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/miso/Hosting-875960345714291564/original/6252e899-b887-4acc-b8f7-db16ab98b6d3.jpeg?im_w=720",
          preview: false,
        },
        {
          spotId: 12,
          url: "https://a0.muscache.com/im/pictures/387aa8e9-587f-4436-8690-6f26ede90d8c.jpg?im_w=720",
          preview: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        preview: {
          [Op.in]: [true, false],
        },
      },
      {}
    );
  },
};
