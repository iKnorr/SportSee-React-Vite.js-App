export class DataMapper {
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static transformMainUserData(response: any) {
    console.log(response.data);
  }
}
