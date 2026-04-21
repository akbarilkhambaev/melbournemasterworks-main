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
        title: 'Expert Roof Repairs',
        desc: 'Whether it’s leaks, broken tiles, or damaged metal roofing, we fix it fast and efficiently.',
        link: '/',
    },
    {
      icon: HomeBoltIcon,
      title: 'Weatherproofing & Protection',
      desc: 'Melbourne’s weather is unpredictable—our coatings and sealants provide extra protection against rain, wind, and UV damage.',
      link: '/',
    },
    {
        icon: HomeEditIcon,
        title: 'Full Roof Restoration',
        desc: 'Extend your roof’s lifespan with our restoration services, including cleaning, painting, and resealing.',
        link: '/',
    },

]


/*-- Pricing Page --*/
/*-- Pricing Page --*/
import img1 from '/images/corporate/silver.png';
import img2 from '/images/corporate/bronze.png';
import img3 from '/images/corporate/gold.png';
const pricing: pricingType[] = [
    {
        tagtext: false,
        caption: 'Silver',
        image: img1,
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
        image: img2,
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
        image: img3,
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
import s5 from '/images/works/5.jpg';
import s6 from '/images/works/6.jpg';
import s7 from '/images/works/7.jpg';
import s8 from '/images/works/8.jpg';
import s9 from '/images/works/9.jpg';
import s10 from '/images/works/10.jpg';
import s11 from '/images/works/11.jpg';
import s12 from '/images/works/12.jpg';
import s13 from '/images/works/13.jpg';
import s14 from '/images/works/14.jpg';
import s15 from '/images/works/15.jpg';
import s16 from '/images/works/16.jpg';
import s17 from '/images/works/17.jpg';
import s18 from '/images/works/18.jpg';
import s19 from '/images/works/19.jpg';
import s20 from '/images/works/20.jpg';
import s21 from '/images/works/21.jpg';
import s22 from '/images/works/22.jpg';
import s23 from '/images/works/23.jpg';
import s24 from '/images/works/24.jpg';
import s25 from '/images/works/25.jpg';
import s26 from '/images/works/26.jpg';
import s27 from '/images/works/27.jpg';





const Portfolio: PortfolioSection[] = [
    {
        imgs: [s1, s2, s3, s4],
        title: 'White Theming Background',
        desc: '3D Render',

    },
    {
        imgs: [s15, s17, s24, s25, s26],
        title: 'The Heritage',
        desc: 'Illustration',
    },
    {
        imgs: [s19, s18, s6, s7, s12],
        title: 'Belforte Fall',
        desc: 'Photography',
    },
    {
        imgs: [s20, s21, s22],
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

import blog1 from '/images/blog-grid/grid-LP.jpg';
import blog2 from '/images/blog-grid/grid-uxdesign.jpg';
import blog3 from '/images/blog-grid/grid-search.jpg';

const Blog: BlogSection[] = [
    {
        img: blog1,
        badge:'UX Design',
        date:'Apr 16, 2023',
        view:'27,567 Views',
        title: '5 Bad Landing Page Examples How We Would Fix Them',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        name:'Mark R. Freeman'
    },
    {
        img: blog2,
        badge:'Digital',
        date:'Apr 16, 2023',
        view:'29,567 Views',
        title: 'Why UX Design Matters and How it Affects Ranking',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        name:'James Robert'
    },
    {
        img: blog3,
        badge:'Html',
        date:'Apr 16, 2023',
        view:'28,567 Views',
        title: 'This Week in Search: New Limits and Exciting Features',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
        name:'David William'
    },
  {
    img: blog3,
    badge:'Html',
    date:'Apr 16, 2023',
    view:'28,567 Views',
    title: 'This Week in Search: New Limits and Exciting Features',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    name:'David William'
  },
  {
    img: blog2,
    badge:'Html',
    date:'Apr 16, 2023',
    view:'28,567 Views',
    title: 'This Week in Search: New Limits and Exciting Features',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    name:'David William'
  },
  {
    img: blog1,
    badge:'Html',
    date:'Apr 16, 2023',
    view:'28,567 Views',
    title: 'This Week in Search: New Limits and Exciting Features',
    desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    name:'David William'
  },


];


//Team

import team1 from '/images/team/team-1.jpg';
import team2 from '/images/team/team-2.jpg';
import team3 from '/images/team/team-3.jpg';
import team4 from '/images/team/team-4.jpg';

const Team: TeamSection[] = [
    {
        img: team1,
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
        img: team2,
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
        img:team3,
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
        img: team4,
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

import profile1 from '/images/blog/cyrus.jpg';
import profile2 from '/images/blog/kriss.jpg';
import profile3 from '/images/blog/sara.jpg';


const TestimonialsData: Testimonials[] = [
    {
        img: profile1,
        testimonial:"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras venene veliel vestibulum.",
        name: "MICHELLE ANDERSON",
        rating:5
       
      },
      {
        img: profile2,
        testimonial:"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras venene veliel vestibulum.",
        name: "MARK MESTY",
        rating:4
       
      },
      {
        img: profile3,
        testimonial:"Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras venene veliel vestibulum.",
        name: "LIMPSY ADAM",
        rating:5
      },

  
];


export { ServicesData,BuildFeaturesData,pricing,Portfolio,Blog,Team,TestimonialsData};