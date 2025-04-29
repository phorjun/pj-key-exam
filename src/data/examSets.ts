export interface ExamSet {
  id: string;
  name: string;
  description: string;
}

export const examSets: ExamSet[] = [
  {
    id: 'new-card',
    name: 'เเนวข้อสอบ E-Learning (ขอบัตรใหม่)',
    description: 'ผู้ควบคุม/ช่างตรอ'
  },
  {
    id: 'continute-card',
    name: 'เเนวข้อสอบ E-Learning (แบบต่ออายุ)',
      description: 'ผู้ควบคุม/ช่างตรอ'
  }
];