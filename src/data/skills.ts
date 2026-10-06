import type { SkillCategory } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'devops-cloud',
    categoryNumber: '01',
    title: 'DEVOPS & CLOUD',
    description: 'Primary core focus: Linux administration, container virtualization, AWS infrastructure, and pipeline automation.',
    skills: [
      { name: 'Linux', proficiency: 'Strong', highlight: true, note: 'System admin, bash scripting, file systems, permissions' },
      { name: 'AWS', proficiency: 'Working Knowledge', highlight: true, note: 'EC2, IAM, S3, VPC, Security Groups' },
      { name: 'Docker', proficiency: 'Working Knowledge', highlight: true, note: 'Containerization, Dockerfile, multi-stage builds' },
      { name: 'CI/CD', proficiency: 'Working Knowledge', highlight: true, note: 'Automated deployment workflows, GitHub Actions' },
      { name: 'Git', proficiency: 'Strong', highlight: true, note: 'Branching strategies, merge conflict resolution, rebase' },
      { name: 'GitHub', proficiency: 'Strong', highlight: true, note: 'Repo management, webhooks, actions, collaboration' },
    ],
  },
  {
    id: 'networking',
    categoryNumber: '02',
    title: 'NETWORKING',
    description: 'In-depth networking fundamentals essential for cloud topology, troubleshooting, and infrastructure security.',
    skills: [
      { name: 'TCP/IP', proficiency: 'Working Knowledge', highlight: true, note: 'Layer model, handshake, transmission mechanics' },
      { name: 'DNS', proficiency: 'Working Knowledge', highlight: true, note: 'Resolution flow, record types (A, CNAME, MX), TTL' },
      { name: 'HTTP/HTTPS', proficiency: 'Working Knowledge', highlight: true, note: 'Headers, status codes, SSL/TLS handshake' },
      { name: 'SSH', proficiency: 'Strong', highlight: true, note: 'Key-based auth, tunneling, server access management' },
      { name: 'Routing', proficiency: 'Working Knowledge', note: 'Static routing, default gateways, subnets' },
      { name: 'NAT', proficiency: 'Working Knowledge', note: 'Network address translation, port forwarding' },
      { name: 'Firewalls', proficiency: 'Working Knowledge', note: 'Security groups, iptables rules, network ACLs' },
      { name: 'Reverse Proxy', proficiency: 'Working Knowledge', note: 'Traffic proxying, edge routing, SSL offloading' },
      { name: 'Load Balancing', proficiency: 'Learning', note: 'Round-robin, health checks, traffic distribution' },
      { name: 'Wireshark', proficiency: 'Working Knowledge', note: 'Packet capture, protocol dissection, inspection' },
      { name: 'tcpdump', proficiency: 'Working Knowledge', note: 'CLI packet sniffing, CLI network diagnostics' },
    ],
  },
  {
    id: 'development',
    categoryNumber: '03',
    title: 'DEVELOPMENT',
    description: 'Practical engineering and software development across modern web stacks and systems.',
    skills: [
      { name: 'React', proficiency: 'Strong', highlight: true, note: 'Single-page apps, hooks, component architecture' },
      { name: 'TypeScript', proficiency: 'Working Knowledge', highlight: true, note: 'Type safety, interfaces, strict mode' },
      { name: 'Node.js', proficiency: 'Working Knowledge', note: 'Runtime execution, async I/O, REST APIs' },
      { name: 'Express', proficiency: 'Working Knowledge', note: 'Backend routing, middleware, controllers' },
      { name: 'MongoDB', proficiency: 'Working Knowledge', note: 'NoSQL document modeling, Atlas cloud cluster' },
      { name: 'C#', proficiency: 'Working Knowledge', note: 'Object-oriented programming, game scripting' },
      { name: 'Unity', proficiency: 'Working Knowledge', note: '3D physics, scene management, game logic' },
    ],
  },
];
