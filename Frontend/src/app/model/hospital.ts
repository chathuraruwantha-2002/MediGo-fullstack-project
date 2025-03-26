export class Hospital {
    hospitalId: number;
    name: string;
    location: string;
    phone: string;
    email: string;
    description: string;
  
    constructor(
      hospitalId: number,
      name: string,
      location: string,
      phone: string,
      email: string,
      description: string
    ) {
      this.hospitalId = hospitalId;
      this.name = name;
      this.location = location;
      this.phone = phone;
      this.email = email;
      this.description = description;
    }
  }
  