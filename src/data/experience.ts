import type { ExperienceItem } from '../types';

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'kala-lead',
    role: 'Co-Founder / Technology & Web Lead',
    organization: 'KALA Sportswear',
    period: '2026 – Present',
    type: 'Work',
    isCurrent: true,
    highlights: [
      'Co-founded a live print-on-demand athletic apparel venture operating in production.',
      'Developed and continuously manage the production e-commerce web platform, handling 400–500 customer orders.',
      'Configured hosting, Vercel frontend deployments, Render API services, and MongoDB Atlas database clusters.',
      'Lead cross-functional operations spanning technology, payment gateway integration, digital marketing, and customer support.',
    ],
  },
  {
    id: 'gfg-lead',
    role: 'Lead — Game Development Team',
    organization: 'GeeksforGeeks Student Chapter · GGV',
    period: 'Dec 2025 – Present',
    type: 'Leadership',
    isCurrent: true,
    highlights: [
      'Lead the campus game development division, conducting hands-on sessions in game design principles and C# scripting.',
      'Organize technical workshops, peer code reviews, and project collaboration sprints for aspiring developers.',
      'Previously served as Co-Lead — Game Development Team (Dec 2024 – Aug 2025), mentoring junior members.',
    ],
  },
  {
    id: 'gdg-colead',
    role: 'Game Development Co-Lead',
    organization: 'Google Developer Groups on Campus (GDG) · GGV',
    period: 'Dec 2025 – Present',
    type: 'Leadership',
    isCurrent: true,
    highlights: [
      'Collaborate on community technology initiatives, developer meetups, and student hackathons.',
      'Facilitate interactive sessions exploring game mechanics, graphics pipelines, and logic implementation.',
    ],
  },
];
