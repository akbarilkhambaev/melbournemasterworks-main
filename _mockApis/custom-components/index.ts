import type { Services, BuildFeatures,pricingType,PortfolioSection,BlogSection,TeamSection,Testimonials} from "@/types/custom-components";

/*import tabler icons*/
import {
  CheckIcon,
  XIcon,
  UserCircleIcon,
  BriefcaseIcon,
  StarIcon,
  AssemblyIcon,
  LayersIntersect2Icon,
  TriangleSquareCircleIcon,
  HomeShieldIcon,
  HomeBoltIcon, HomeStarIcon, HomeEditIcon
} from 'vue-tabler-icons';

//Services
const ServicesData: Services[] = [
    {
        img: StarIcon,
        title: '4.86',
        desc: 'Out of 5 stars from 3896 reviews on google platform',
    },
    {
        img: UserCircleIcon,
        title: '364',
        desc: 'Client testimonials received in year 2023',
    },
    {
        img: BriefcaseIcon,
        title: '45M+',
        desc: 'Revenue generated through new projects & marketing',
    },
]

//Build Features

const BuildFeaturesData: BuildFeatures[] = [
  {
    icon: HomeShieldIcon,
    title: 'Roof Restorations',
    desc: 'Renew your roof with our comprehensive restoration services including cleaning, painting, and resealing to extend its life and enhance its appearance.',
    link: '/services/restorations',
  },
  {
    icon: HomeBoltIcon,
    title: 'Roof Repairs',
    desc: 'From leaks to broken tiles and damaged metal roofing, our expert team swiftly addresses all your roof repair needs.',
    link: '/services/repairs',
  },
  {
    icon: HomeEditIcon,
    title: 'Gutter Replacements',
    desc: 'Ensure effective water management with our professional gutter replacements designed to protect your property from weather-related damages.',
    link: '/services/gutters',
  },
];



const pricing: pricingType[] = [
    {
        tagtext: false,
        caption: 'Silver',
        image: 'img1',
        free: true,
        price: 10.99,
        yearlyprice: 10.99 * 12,
        buttontext: 'Choose Silver',
        list: [
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: '3 Members',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Single Device',
                status:false,
            },
            {
                icon: XIcon,
                iconcolor: 'inputBorder',
                listtitle: '50GB Storage',
                status:true,
            },
            {
                icon: XIcon,
                iconcolor: 'inputBorder',
                listtitle: 'Monthly Backups',
                status:true,
            },
            {
                icon: XIcon,
                iconcolor: 'inputBorder',
                listtitle: 'Permissions & workflows',
                status:true,
            }
        ]
    },
    {
        tagtext: true,
        caption: 'bronze',
        image: 'img2',
        free: false,
        price: 10.99,
        yearlyprice: 10.99 * 12,
        buttontext: 'Choose Bronze',
        list: [
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: '5 Members',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Multiple Device',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: '80GB Storage',
                status:false,
            },
            {
                icon: XIcon,
                iconcolor: 'inputBorder',
                listtitle: 'Monthly Backups',
                status:true,
            },
            {
                icon: XIcon,
                iconcolor: 'inputBorder',
                listtitle: 'Permissions & workflows',
                status:true,
            }
        ]
    },
    {
        tagtext: false,
        caption: 'gold',
        image: 'img3',
        free: false,
        price: 22.99,
        yearlyprice: 22.99 * 12,
        buttontext: 'Choose Gold',
        list: [
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: '15 Members',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Multiple Device',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: '150GB Storage',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Monthly Backups',
                status:false,
            },
            {
                icon: CheckIcon,
                iconcolor: 'primary',
                listtitle: 'Permissions & workflows',
                status:false,
            }
        ]
    }

];


//Portfolio

import s1 from '/images/works/1.jpg';
import s2 from '/images/works/2.jpg';
import s3 from '/images/works/3.jpg';
import s4 from '/images/works/4.jpg';
import s6 from '/images/works/6.jpg';
import s7 from '/images/works/7.jpg';
import s12 from '/images/works/12.jpg';

import s28 from '/images/works/section3-2.jpg';
import s29 from '/images/works/section3-3.jpg';
import s30 from '/images/works/section3-4.jpg';
import s31 from '/images/works/section3-5.jpg';

import s32 from '/images/works/section4-1.jpg';
import s33 from '/images/works/section4-2.jpg';
import s34 from '/images/works/section4-3.jpg';
import s35 from '/images/works/section4-4.jpg';
import s36 from '/images/works/section4-5.jpg';
import s37 from '/images/works/section4-6.jpg';
import s38 from '/images/works/section4-7.jpg';





const Portfolio: PortfolioSection[] = [
    {
        imgs: [s1, s2, s3, s4],
        title: 'White Theming Background',
        desc: '3D Render',

    },
    {
        imgs: [s29, s31,  s28, s30],
        title: 'The Heritage',
        desc: 'Illustration',
    },
    {
        imgs: [s6, s7, s12],
        title: 'Belforte Fall',
        desc: 'Photography',
    },
    {
        imgs: [s32, s33, s38, s34, s35, s36, s37, ],
        title: 'Ipsum neque libero',
        desc: 'React',
    },
    // {
    //      imgs: [s6, s7, s12],
    //     title: 'White Theming',
    //     desc: 'Graphics Design',
    // },
    // {
    //     imgs: [s24, s25, s26],
    //     title: 'luctus neque purus',
    //     desc: 'Html',
    // },
    
];


//Blog



const Blog: BlogSection[] = [
    {
        img: 'blog1',
        badge:'UX Design',
        date:'Apr 16, 2023',
        view:'27,567 Views',
        title: '5 Bad Landing Page Examples How We Would Fix Them',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        name:'Mark R. Freeman'
    },
    {
        img: 'blog2',
        badge:'Digital',
        date:'Apr 16, 2023',
        view:'29,567 Views',
        title: 'Why UX Design Matters and How it Affects Ranking',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        name:'James Robert'
    },
    {
        img: 'blog3',
        badge:'Html',
        date:'Apr 16, 2023',
        view:'28,567 Views',
        title: 'This Week in Search: New Limits and Exciting Features',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        name:'David William'
    },
  {
    img: 'blog3',
    badge:'Html',
    date:'Apr 16, 2023',
    view:'28,567 Views',
    title: 'This Week in Search: New Limits and Exciting Features',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    name:'David William'
  },
  {
    img: 'blog2',
    badge:'Html',
    date:'Apr 16, 2023',
    view:'28,567 Views',
    title: 'This Week in Search: New Limits and Exciting Features',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    name:'David William'
  },
  {
    img: 'blog1',
    badge:'Html',
    date:'Apr 16, 2023',
    view:'28,567 Views',
    title: 'This Week in Search: New Limits and Exciting Features',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    name:'David William'
  },


];


//Team



const Team: TeamSection[] = [
    {
        img: 'team1',
        title: "Michael Doe",
        subtitle: "Property Specialist",
        desc: "You can relay on our amazing features list and also our customer services will be great experience.",
        socialicon: [
          {
            url: "/",
            icon: "mdi mdi-facebook",
          },
          {
            url: "/",
            icon: "mdi mdi-twitter",
          },
          {
            url: "/",
            icon: "mdi mdi-instagram",
          },
          {
            url: "/",
            icon: "mdi mdi-youtube",
          },
        ],
      },
      {
        img: 'team2',
        title: "Michael Doe",
        subtitle: "Property Specialist",
        desc: "You can relay on our amazing features list and also our customer services will be great experience.",
        socialicon: [
          {
            url: "/",
            icon: "mdi mdi-facebook",
          },
          {
            url: "/",
            icon: "mdi mdi-twitter",
          },
          {
            url: "/",
            icon: "mdi mdi-instagram",
          },
          {
            url: "/",
            icon: "mdi mdi-youtube",
          },
        ],
      },
      {
        img:'team3',
        title: "Michael Doe",
        subtitle: "Property Specialist",
        desc: "You can relay on our amazing features list and also our customer services will be great experience.",
        socialicon: [
          {
            url: "/",
            icon: "mdi mdi-facebook",
          },
          {
            url: "/",
            icon: "mdi mdi-twitter",
          },
          {
            url: "/",
            icon: "mdi mdi-instagram",
          },
          {
            url: "/",
            icon: "mdi mdi-youtube",
          },
        ],
      },
      {
        img: 'team4',
        title: "Michael Doe",
        subtitle: "Property Specialist",
        desc: "You can relay on our amazing features list and also our customer services will be great experience.",
        socialicon: [
          {
            url: "/",
            icon: "mdi mdi-facebook",
          },
          {
            url: "/",
            icon: "mdi mdi-twitter",
          },
          {
            url: "/",
            icon: "mdi mdi-instagram",
          },
          {
            url: "/",
            icon: "mdi mdi-youtube",
          },
        ],
      },
]

//Testimonial 




const TestimonialsData: Testimonials[] = [
    {
        img: 'profile1',
        testimonial:"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras venene veliel vestibulum.",
        name: "MICHELLE ANDERSON",
        rating:5
       
      },
      {
        img: 'profile2',
        testimonial:"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras venene veliel vestibulum.",
        name: "MARK MESTY",
        rating:4
       
      },
      {
        img: 'profile3',
        testimonial:"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras venene veliel vestibulum.",
        name: "LIMPSY ADAM",
        rating:5
      },

  
];


export { ServicesData,BuildFeaturesData,pricing,Portfolio,Blog,Team,TestimonialsData};