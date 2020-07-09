export class URLs {
  static host = "/api/";
  static artwork = URLs.host + "artwork";
  static artwork_search = URLs.artwork + "/search";

  static search_artwork(searchString) {
    return  URLs.artwork_search + "?search_string=" + searchString;
  }

  static get = (url) => {
    return fetch(url, {
      method: 'get'
      // mode: 'cors'
    });
  }

}