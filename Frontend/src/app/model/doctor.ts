export class Doctor {
    doctorId: number;
    name: string;
    gender: string;
    phone: string;
    email: string;
    specialization: string;
    qualification: string;
    experience: string;
    location: string;
    availability: string;
    consultationFee: number;
    userId: number;
    hospitalId: number;
  
    constructor(
      doctorId: number,
      name: string,
      gender: string,
      phone: string,
      email: string,
      specialization: string,
      qualification: string,
      experience: string,
      location: string,
      availability: string,
      consultationFee: number,
      userId: number,
      hospitalId: number
    ) {
      this.doctorId = doctorId;
      this.name = name;
      this.gender = gender;
      this.phone = phone;
      this.email = email;
      this.specialization = specialization;
      this.qualification = qualification;
      this.experience = experience;
      this.location = location;
      this.availability = availability;
      this.consultationFee = consultationFee;
      this.userId = userId;
      this.hospitalId = hospitalId;
    }
  }
  