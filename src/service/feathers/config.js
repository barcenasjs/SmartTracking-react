import feathers from "@feathersjs/feathers";
import feathersRest from "@feathersjs/rest-client";

const URL = "http://192.168.20.22:3030";
export const client = feathers();
client.configure(feathersRest(URL).fetch(fetch));
