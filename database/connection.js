/* import * as IPFS from "ipfs";
import OrbitDB from "orbit-db";
import Identities from "orbit-db-identity-provider";

class Connection {

  constructor() {
    this.db = new Database();
    this.ipfsOptions = {
      EXPERIMENTAL: {
        pubsub: true,
      },
    };
    this._localInstance;
    this._database;
    this.products = [];
  }

  async loadLocalInstance() {
    if (!this._localInstance) {
      const ipfs = await IPFS.create(ipfsOptions);

      const identity = await Identities.createIdentity(options);
      console.log(identity.toJSON(), "identity");
      this._localInstance = await OrbitDB.createInstance(ipfs, {
        identity: identity,
      });
      const optionsToWrite = {
        accessController: {
          type: "orbitdb", //OrbitDBAccessController
          write: [_localInstance.identity.id],
        },
      };
    }
    return this._localInstance;
  };

  async createDatabase(name) {
    let peerId = await this._localInstance.identity.id;
    const orbitdb = await loadLocalInstance();
    this._database = await orbitdb.docs(name + peerId, {
      accessController: {
        type: "orbitdb", //OrbitDBAccessController
        write: [orbitdb.identity.id],
        locaOnly: true,
        overwrite: true,
        replicate: true,
      },
    });

    this._database.events.on("replicated", () => {
      this.updateProducts();
    });

    this._database.events.on("ready", () => {
      this.updateProducts();
    });

    this._database.events.on("write", (address, entry, heads) => {
      this.updateProducts();
    });

    await _database.load();

    const address = await this._database.id;

    return address.id;
  };

  async connectToDatabase(address) {
    try {
      if (this._database) {
        await this._database.close();

        this._database = await this._localInstance.open(address);

        this._database.events.on("replicated", () => {
          updateMessages();
        });

        this._database.events.on("ready", () => {
          updateProducts();
        });

        this._database.events.on("write", (address, entry, heads) => {
          updateMessages();
        });

        await this._database.load();
      } else {
        createDatabase(address.toString().strip(0, 58));
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateProducts() {
    const items = this._database
      .iterator({ limit: -1 })
      .collect()
      .map((e) => e.payload.value);
    let i = 0;
    items.forEach((e) => {
      if (i < this.products.length) {
        this.products[i] = e;
      } else {
        this.products.push(e);
      }
      i++;
    });
  };

  async addProduct(message) {
    if (this._database) {
      await this._database.add(message);
    }
  };
}

export default Connection;
 */

import * as IPFS from "ipfs";
import OrbitDB from "orbit-db";
import Identities from "orbit-db-identity-provider";

// optional settings for the ipfs instance
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true,
  },
  /* config: {
    Addresses: {
      Swarm: [
        "/ip4/127.0.0.1/tcp/4002/p2p/12D3KooWN9NvyhpKPG6DgoNQDwbk6YPdrwMxpkVgdCeqGz5LnMmB",
        "/ip4/192.168.100.193/tcp/4002/p2p/12D3KooWN9NvyhpKPG6DgoNQDwbk6YPdrwMxpkVgdCeqGz5LnMmB",
        "/ip4/127.0.0.1/tcp/4003/ws/p2p/12D3KooWN9NvyhpKPG6DgoNQDwbk6YPdrwMxpkVgdCeqGz5LnMmB",
      ],
    },
  }, */
};

const options = { id: "test1" };

class Connection {
  async main() {
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

    console.log("peer1 database identity", identity.toJSON());

    console.log("public key", identity.publicKey);

    console.log("peer1 database address", address);

    const value = db.get("");
    console.log("value from peer 1", value);

    return db;
  }

  async getAllProduct() {
    const DB = await this.main();
    console.log("DB instance:", DB);
    return DB.get("");
  }
}

export default Connection;
