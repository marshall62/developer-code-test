export class FieldUtil {

  static abbreviateCreators (creator_list) {
    if (creator_list.length > 2)
      return creator_list[0] + "," + creator_list[1] + ", et al";
    else return creator_list;
  }

  static capitalize (name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }
}