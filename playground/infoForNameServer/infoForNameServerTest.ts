const expect = require("chai").expect;
import app from "./infoForNameServer";
const request = require("supertest")(app);
import nock from "nock";

    describe("What to do endpoint", function () {
      before(() => {
            nock('URL')
              .get("?name-donald")
              .reply(200, {
                "gender": "male", 
                "country":"US", 
                "age":61
              })
        })

    it("Should eventually provide 'info about donald'", async function () {
      const response = await request.get("/nameinfo/donald")
      expect(response.body.gender).to.be.equal("male");
      expect(response.body.country).to.be.equal("US");
      expect(response.body.age).to.be.equal(61);
    })
  })