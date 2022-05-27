export class Patient {

  public names: any[] = [];

  public gender: string = 'N/A';

  public birthDate: any = false;

  public locations: any[] = [];

  public contact: any[] = [];

  constructor(params: any) {
    // Store names
    if ('name' in params && params.name.length) {
      params.name.forEach((name: any) => {
        this.names.push({
          type: ('use' in name ? name.use : 'on record'),
          given: ('given' in name ? name.given : ['N/A']),
          family: ('family' in name ? name.family : ['N/A'])
        })
      })
    }

    // Store gender
    if ('gender' in params) {
      this.gender = String(params.gender);
    }

    // Store the birth date
    if ('birthDate' in params) {
      // Attempt to cast to date
      const date = new Date(params.birthDate);
      // If successful, store the birthdate
      if (date) {
        this.birthDate = date;
      }
    }

    // Store the addresses
    if ('address' in params && params.address.length) {

      params.address.forEach((loc: any) => {
        this.locations.push({
          type: ('use' in loc ? loc.use : 'on record'),
          street: ('line' in loc ? loc.line : []),
          city: ('city' in loc ? loc.city : ''),
          country: ('country' in loc ? loc.country : ''),
          postalCode: ('postalCode' in loc ? loc.postalCode : '')
        })
      })
    }

    // Store the phone numbers / contact information
    if ('telecom' in params && params.telecom.length) {
      params.telecom.forEach((phone: any) => {
        if ('value' in phone) {
          this.contact.push({
            type: ('use' in phone ? phone.use : 'on record'),
            value: phone.value
          })
        }
      })
    }
  }




}