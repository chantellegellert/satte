export interface ISatteCoordinates {
  z: number;
  y: number;
}

export interface ISatte {
  name: string;
  coord: ISatteCoordinates;
}

class DataBaseService {
  private satteliteLoc: { [key: string]: ISatte } = {}; // this will all be in data base
  constructor() {}

  created() {
    this.satteliteLoc["kitchener"] = {
      name: "SATTEFI-US-117",
      coord: {
        z: 190.3,
        y: 30
      }
    };

    this.satteliteLoc["austin"] = {
      name: "SATTEFI-US-117",
      coord: {
        z: 211.1,
        y: 30
      }
    };
  }

  // I am assuming I do a DB call with the long and lat of where I am at
  // The data base would then come back with the name of satellite I am
  // Looking for and z / y axis of where I need to go
  // This should have its own DB service
  public async getSatteNameDB(long: number, lat: number) {
    return new Promise<ISatte>((resolve, reject) => {
      setTimeout(() => {
        // Kitchener 190.3, Austin 211.1
        // Kitchener Long: -80.4777 lat: 43.4343
        // Assume Kitchener long is between -80.00 and -81.00
        // Assume Kitchener lat is between 43.00 and 44.00
        // Assume anything else is Austin since only 2 locations to consider
        // Data base would do look up tables based on long and lat better than this
        if (long < -80 && long > -81 && lat > 43 && lat < 44) {
          var selectLoc = this.satteliteLoc["kitchener"];
        } else {
          var selectLoc = this.satteliteLoc["austin"];
        }

        resolve(selectLoc);
      }, 3000); // artificial delay
    });
  }
}

export const dataBaseService = new DataBaseService();
