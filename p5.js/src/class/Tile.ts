// class of tile of the map
class Tile {
  event: Function;

  constructor(event: Function = () => {}) {
    this.event = event;
  }
}

export { Tile };
