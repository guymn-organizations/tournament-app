export interface Tournament {
    id: string;
    name: string;
    detail: string;
    reward: number;
    imageTourUrl: string;
    status: Status;
}

class Status{
    รอดำเนินการ = 'รอดำเนินการ' 
    เปิดรับสมัคร = 'เปิดรับสมัคร'
    ปิดรับสมัคร = 'ปิดรับสมัคร'
    กำลังแข่งขัน = 'กำลังแข่งขัน'
    จบการแข่งขัน = 'จบการแข่งขัน'
}
  