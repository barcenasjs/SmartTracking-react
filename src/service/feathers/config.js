import feathers from "@feathersjs/feathers";
import feathersRest from "@feathersjs/rest-client";

const URL = "https://santi-tracking-api.bahoque.com/";
export const client = feathers();
client.configure(feathersRest(URL).fetch(fetch));
