import { Rocket, Shield, Star, LineChart,RefreshCcw, Users } from 'lucide-react';

import user1 from "../assets/user1.jpg";
import user2 from "../assets/user2.jpg";
import user3 from "../assets/user3.jpg";
import user4 from "../assets/user4.jpg";
import user5 from "../assets/user5.jpg";
import user6 from "../assets/user6.jpg";

export const navItems = [
  { label: "Features", href: "#" },
  { label: "Workflow", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Testimonials", href: "#" },
];
export const testimonials = [
    {
      user: "John Doe",
      company: "Stellar Solutions",
      image: user1,
      text: "I am extremely satisfied with the service. The team was responsive and professional, delivering results beyond my expectations. I couldn't thank them enough.",
    },
    {
      user: "Jane Smith",
      company: "Blue Horizon Technologies",
      image: user2,
      text: "I couldn’t be happier with the outcome. The team's creativity and problem-solving skills were essential in realizing our vision. We are extremely happy with the results.",
    },
    {
      user: "David Johnson",
      company: "Quantum Innovations",
      image: user3,
      text: "Working with this company was a pleasure. Their attention to detail and excellence were commendable. I highly recommend their services and expertise.",
    },
    {
      user: "Ronee Brown",
      company: "Fusion Dynamics",
      image: user4,
      text: "The team at XYZ Company transformed our project. Their detailed attention and innovative solutions helped us meet our goals quickly. We are thankful.",
    },
    {
      user: "Michael Wilson",
      company: "Visionary Creations",
      image: user5,
      text: "I am impressed by the professionalism and dedication shown. They exceeded expectations and delivered outstanding results for our project.",
    },
    {
      user: "Emily Davis",
      company: "Synergy Systems",
      image: user6,
      text: "The team went above and beyond for our project. Their unmatched expertise and dedication were crucial for our success. Looking forward to more.",
    },
  ];
  

export const features = [
  {
    icon: <Rocket />,
    text: "Crypto Rewards",
    description:
      "Earn Diamante crypto with every purchase and watch your rewards grow as you shop.",
  },
  {
    icon: <Shield />,
    text: "Secure Transactions",
    description:
      "Enjoy peace of mind with robust security protocols that protect your transactions and personal data.",
  },
  {
    icon: <Star />,
    text: "Loyalty Program",
    description:
      "Unlock exclusive rewards and benefits through our integrated loyalty program designed to maximize your shopping experience.",
  },
  {
    icon: <RefreshCcw />,
    text: "Seamless Integration",
    description:
      "Experience effortless integration with your existing systems and platforms, ensuring a smooth transition to crypto-based transactions.",
  },
  {
    icon: <LineChart />,
    text: "Real-Time Analytics",
    description:
      "Track your earnings and transactions with real-time analytics, providing you with valuable insights and helping you optimize your crypto rewards.",
  },
  {
    icon: <Users />,
    text: "Community Support",
    description:
      "Join a thriving community and gain access to support and resources that enhance your experience and engagement with our platform.",
  },
];


export const checklistItems = [
    {
        title: "Sign Up",
        description:
          "Create account to earn Diamante crypto with every purchase.",
      }, 
    {
      title: "Connect Your Wallet",
      description:
        "Link your digital wallet to InnoWallet and start earning Diamante crypto with every purchase.",
    },
    {
      title: "Browse and Shop",
      description:
        "Explore our range of products and services, enjoying our crypto rewards system.",
    },
    {
      title: "Earn Diamante Crypto",
      description:
        "Automatically earn Diamante crypto with every transaction or referral and watch your rewards grow.",
    },
    {
      title: "Redeem and Enjoy",
      description:
        "Use your earned Diamante crypto to enjoy exclusive benefits.",
    },
  ];
  

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];