/* import * as IPFS from "ipfs";
import OrbitDB from "orbit-db";
import Identities from "orbit-db-identity-provider";
import { loadLocalInstance } from './connection'

// optional settings for the ipfs instance
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true,
  },
};

const options = { id: "test1" };

async function main() {
  const ipfs = await IPFS.create(ipfsOptions);
  const identity = await Identities.createIdentity(options);
  const orbitdb = await OrbitDB.createInstance(ipfs, { identity: identity });
  const optionsToWrite = {
    accessController: {
      type: "orbitdb", //OrbitDBAccessController
      write: [
        orbitdb.identity.id,
        "04ad4d2a7812cac1f0e6331edf22cec1a74b9694de6ad222b7cead06f79ec44a95e14b002ee7a0f6f03921fcf2ff646724175d1d31de4876c99dcc582cde835b4c",
      ],
    },
  };
  const db = await orbitdb.docs("products", optionsToWrite);
  await db.put({ _id: "1", name: "Google Pixel 3a", category: "1" });
  await db.put({ _id: "2", name: "Google Pixel 4xl", category: "1" });
  await db.put({ _id: "3", name: "JetBrains Licence", category: "2" });
  const address = db.address.toString();
 */
 /*  await db.access.grant(
    "write",
    "04ad4d2a7812cac1f0e6331edf22cec1a74b9694de6ad222b7cead06f79ec44a95e14b002ee7a0f6f03921fcf2ff646724175d1d31de4876c99dcc582cde835b4c"
  ); // grant access to identity2
 */
  /* const db2 = await orbitdb.docs("category", optionsToWrite);

  await db2.load();

  const address2 = db2.address.toString();

  // const remoteDb = await orbitdb.open("/orbitdb/zdpuAtLkuk6a2cGTkUX1Bg5LM6AnCd47EZphVRVkedWAy7Y4f/Lit-JS-SDK", { type: "keyvalue" });
  // const remoteDb = await orbitdb.open('/orbitdb/Qmd8TmZrWASypEp4Er9tgWP4kCNQnW4ncSnvjvyHQ3EVSU/first-database')
  // await remoteDb.load();

  // const res = remoteDb.get("");
  
  
  const identitydb2 = db2.identity;
  console.log(identitydb2.toJSON(), "identity for database 2");

  console.log(address2, "peer2 database address");

  let product_schema = {
    _id: 0,
    name: "",
    description: "",
    comments: [],
  };

  await db2.put({ _id: true, name: "numeric", description: "This category represents numeric products such as licence keys" });
  await db2.put({ _id: 2, name: "smart_phone", description: "This category represents smart phones (Android, IOS)" });
  await db2.put({ _id: [""], name: "electorics", description: "This category represents electronic appliances" });
  await db2.put({ _id: "4", name: "books", description: "This category represents books" });

  const saveToOrbit = async (db, data) => {
    return await db.put(data);
  }

  console.log("peer1 database identity", identity.toJSON());

  console.log("public key", identity.publicKey);
  
  console.log("peer1 database address", address);
  
  const value = db.get('')
  console.log('value from peer 1', value)
  
  const value2 = db2.get("");
  const value3 = db.query((doc) => doc.category === "1")
  console.log("value from peer 2", value2);
  console.log("value from peer 3", value3);

  // console.log("remote db", res);
}

main(); */

module.exports = {
  Connection: require('./connection'),
  ProductRepository: require('./repository/product-repository'),
}
