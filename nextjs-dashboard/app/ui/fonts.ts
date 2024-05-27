import {Vampiro_One} from 'next/font/google' //Mirar otras fuentes
import {Aladin} from 'next/font/google'

export const aladin = Aladin({subsets: ['latin'],weight:"400"});

export const vampiro = Vampiro_One({weight: '400', subsets: ['latin']}) //Documentar que next.js puede importar fuentes directamente desde una bliblioteca interna que tiene, ya que la descarga, optimiza y la sirve