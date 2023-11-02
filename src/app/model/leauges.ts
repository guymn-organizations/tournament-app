export interface Leauges {
    id: string;
    name: string;
    detail: string;
    reward: number;
    startRegisterDate: string; // คุณอาจต้องแปลงจาก LocalDate
    endRegisterDate: string; // คุณอาจต้องแปลงจาก LocalDate
    startTourDate: string; // คุณอาจต้องแปลงจาก LocalDate
    imageTourUrl: string;
    tournamenType: string; // หรือสร้าง enum สำหรับประเภทการแข่งขัน
    BOqualifyingRound: number;
    BOfinalRound: number;
    teamJoin: any[]; // คุณอาจต้องสร้าง interface/class สำหรับ TeamInTournament
    status: any; // คุณอาจต้องสร้าง interface/class สำหรับ Status
    matchList: any[]; // คุณอาจต้องสร้าง interface/class สำหรับ Match

  }