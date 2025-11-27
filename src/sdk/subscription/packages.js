import { ServiceBlocks } from "./services";

const robi = [
  {
    id: "1",
    title: "দৈনিক-২ টাকা(+এসসি,ভ্যাট,এসডি)",
    renewable: "প্রতিদিন নবায়নযোগ্য",
    type: "daily",
    validity: 1,
    description: [""],
    charge: 2,
    link: "",
    service: ServiceBlocks.auto,
  },
  {
    id: "2",
    title: "দৈনিক-২ টাকা(+এসসি,ভ্যাট,এসডি)",
    renewable: "অ-নবায়নযোগ্য",
    type: "daily",
    validity: 1,
    description: [""],
    charge: 2,
    link: "",
    service: ServiceBlocks.dailyNonAuto,
  },
  {
    id: "3",
    title: "সাপ্তাহিক-৭ টাকা(+এসসি,ভ্যাট,এসডি)",
    renewable: "অ-নবায়নযোগ্য",
    type: "weekly",
    validity: 7,
    description: [""],
    charge: 7,
    link: "",
    service: ServiceBlocks.weeklyNonAuto,
  },
  {
    id: "4",
    title: "পাক্ষিক-১৪ টাকা(+এসসি,ভ্যাট,এসডি)",
    renewable: "অ-নবায়নযোগ্য",
    type: "bi-weekly",
    validity: 15,
    description: [""],
    charge: 14,
    link: "",
    service: ServiceBlocks.biWeeklyNonAuto,
  },
  {
    id: "5",
    title: "মাসিক-২৮ টাকা(+এসসি,ভ্যাট,এসডি)",
    renewable: "অ-নবায়নযোগ্য",
    type: "monthly",
    validity: 30,
    description: [""],
    charge: 28,
    link: "",
    service: ServiceBlocks.monthlyNonAuto,
  },
];

const clone = (obj) => JSON.parse(JSON.stringify(obj));

export const PACKAGES = {
  robi,
  gp: clone(robi),
  bl: clone(robi),
};
