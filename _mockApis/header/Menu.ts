
export interface menu {
    header?: string;
    title?: string;
    children?: menu[];
    to?: string;
}

const sidebarItem: menu[] = [
    {
        title: 'Home',
        to: '/'
    },
    {
        title: 'Services',
        to: '/services'
    },
    {
        title: 'About us',
        to: '/about'
    },

    // {
    //     title: 'Gallery',
    //     to: '/basic-components'
    // },
    // {
    //     title: 'Areas',
    //     to: '/basic-components'
    // },
    // {
    //     title: 'Contact us',
    //     to: '/basic-components'
    // },
];

export default sidebarItem;
