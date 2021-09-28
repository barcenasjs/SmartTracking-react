import feathers from "@feathersjs/feathers";
import feathersRest from "@feathersjs/rest-client";

const URL = "http://localhost:3030";
export const client = feathers();
client.configure(feathersRest(URL).fetch(fetch));
