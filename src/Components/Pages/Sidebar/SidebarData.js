import dahboardIcon from '../../../images/icons/dashboard.png'
import patientsIcon from '../../../images/icons/patients.png'
import filterIcon from '../../../images/icons/filters.png'
import search from '../../../images/icons/search.png'
import home from '../../../images/sidebar_icons/home-line.svg'
import fileCheck from '../../../images/sidebar_icons/upload-ico.svg'
import fileCheckDark from '../../../images/sidebar_icons/upload-dark.svg'
import searchFile from '../../../images/sidebar_icons/graph-ico.svg'
import searchFileDark from '../../../images/sidebar_icons/graph_dark.svg'
import aiChat from '../../../images/sidebar_icons/ai-chat.svg'
import aiChatDark from '../../../images/sidebar_icons/chat_dark.svg'
import graphlight from './../../../images/sidebar_icons/Lines-Light.svg'
import graphdark from './../../../images/sidebar_icons/Lines-dark.svg'
import graphlightsel from './../../../images/sidebar_icons/Line-light-selected.svg'
import uploadlight from './../../../images/sidebar_icons/Upload-light.svg'
import uploadlightsel from'./../../../images/sidebar_icons/Upload-light-selected.svg'
import ailight from './../../../images/sidebar_icons/Stars-light.svg'
import ailightsel from './../../../images/sidebar_icons/stars-chat.svg'
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
        imgLight:graphlight,
        imgSelected: searchFileDark,
        imgLightSelected: graphlightsel,
        link: '/contract',
        bgShade: 'linear-gradient(to right,rgb(0, 137, 249),rgb(0, 55, 255))',
      },
      {
        navItem: '',
        id: 'list',
        // show: false,
        img: fileCheck,
        imgLight:uploadlight,
        imgSelected: fileCheckDark,
        imgLightSelected:uploadlightsel,
        link: '/list',
        bgShade: 'linear-gradient(to right,rgb(0, 137, 249),rgb(0, 55, 255))',
      },
      {
        navItem: '',
        id: 'chat',
        // show: false,
        img: aiChat,
        imgLight:ailight,
        imgSelected: aiChatDark,
        imgLightSelected:ailightsel,
        link: '/chat',
        bgShade: 'linear-gradient(to right,rgb(0, 137, 249),rgb(0, 55, 255))',
      },
     
]