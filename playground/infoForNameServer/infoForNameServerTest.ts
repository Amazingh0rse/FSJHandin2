const expect = require("chai").expect;
import app from "./infoForNameServer";
const request = require("supertest")(app);
import nock from "nock";

/*describe("Info for name, age, country endpoint", function () {
  before(() => {
        nock('https://api.genderize.io?name=Morten')
        nock('https://api.nationalize.io?name=Morten')
        nock('https://api.agify.io?name=Morten')
        .get("/nameinfo/Morten")
        .reply(200, {
         "gender":"Male",
         "country": "DK",
         "age":"24"
        })
    })*/

    describe("What to do endpoint", function () {
      before(() => {
            nock('https://www.boredapi.com')
            .get("/api/activity")
            .reply(200, {
              "activity": "Go for a run",
              "type": "recreational",
              "participants": 1,
              "price": 0,
              "link": "",
              "key": "6852505",
              "accessibility": 0.9
            })
        })

    it("Should eventually provide 'Go for a run'", async function () {
      const response = await request.get("/whattodo")
      expect(response.body.activity).to.be.equal("Go for a run");
    })
  })