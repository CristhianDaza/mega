import {
  mdiInstagram,
  mdiFacebook,
  mdiGmail,
  mdiWhatsapp,
} from '@mdi/js';

const redes = [
  {
    id: 1,
    clase: 'instagram',
    nombre: 'Instagram',
    http: 'https://www.instagram.com/megapromocional/',
    icono: mdiInstagram,
    url: '@megapromocional',
    style: 'background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',
  }, {
    id: 2,
    clase: 'facebook',
    nombre: 'Facebook',
    http: 'https://www.facebook.com/Mega-Promocionales-242144370051788/',
    icono: mdiFacebook,
    url: 'Mega Promocionales',
    style: 'background-color: #4267B2 !important',
  }, {
    id: 3,
    clase: 'gmail',
    nombre: 'Gmail',
    http: 'mailto:megapromocional@gmail.com',
    icono: mdiGmail,
    url: 'megapromocional@gmail.com',
    style: 'background: linear-gradient(0deg, #4285F4 20%, #BB001B 40%, #EA4335 60%, #FBBC05 80%, #34A853 100%)',
  }, {
    id: 4,
    clase: 'whatsapp',
    nombre: 'WhatsApp',
    http: 'https://api.whatsapp.com/send?phone=573159274144&text=Hola%20quisiera%20informaci%c3%b3n&source=&data=&app_absent=',
    icono: mdiWhatsapp,
    url: '315 927 4144',
    style: 'background-color: #4AC959 !important',
  },
];

export default redes;
