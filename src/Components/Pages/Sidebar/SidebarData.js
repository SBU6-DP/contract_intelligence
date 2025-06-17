import dahboardIcon from '../../../images/icons/dashboard.png'
import patientsIcon from '../../../images/icons/patients.png'
import filterIcon from '../../../images/icons/filters.png'
import search from '../../../images/icons/search.png'
import home from '../../../images/sidebar_icons/home-line.svg'
import fileCheck from '../../../images/sidebar_icons/file-check-02.svg'
import searchFile from '../../../images/sidebar_icons/searchFile.svg'
import aiChat from '../../../images/sidebar_icons/ai-chat.svg'

export const SidebarData =[
    // {
    //     navItem: 'Dashboard',
    //     id: 'dashboard',
    //     // show: false,
    //     img: dahboardIcon,
    //     // imgSelected: learningSupportSelected,
    //     link: '/dashboard',
    //     bgShade: 'linear-gradient(to right, #f3fffa, #f3fffa)',
    //   },
      // {
      //   navItem: '',
      //   id: 'hcp',
      //   // show: false,
      //   img: home,
      //   // imgSelected: learningSupportSelected,
      //   link: '/hcp',
      //   bgShade: 'linear-gradient(to right,rgb(0, 137, 249),rgb(0, 55, 255))',
      // },
      {
        navItem: '',
        id: 'contract',
        // show: false,
        img: searchFile,
        // imgSelected: learningSupportSelected,
        link: '/contract',
        bgShade: 'linear-gradient(to right,rgb(0, 137, 249),rgb(0, 55, 255))',
      },
      {
        navItem: '',
        id: 'list',
        // show: false,
        img: fileCheck,
        // imgSelected: learningSupportSelected,
        link: '/list',
        bgShade: 'linear-gradient(to right,rgb(0, 137, 249),rgb(0, 55, 255))',
      },
      {
        navItem: '',
        id: 'chat',
        // show: false,
        img: aiChat,
        // imgSelected: learningSupportSelected,
        link: '/chat',
        bgShade: 'linear-gradient(to right,rgb(0, 137, 249),rgb(0, 55, 255))',
      },
     
]