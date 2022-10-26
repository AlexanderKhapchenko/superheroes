import { Superhero } from '@prisma/client';

export const heroes: Superhero[] = [
  {
    id: 'c08c8770-6072-4618-b485-e0c0e5079122',
    nickname: 'Superman',
    real_name: 'Clark Kent',
    origin_description:
      "he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction...",
    superpowers:
      'solar energy absorption and healing factor, solar flare and heat vision,\n' +
      'solar invulnerability, flight...',
    catch_phrase:
      "Look, up in the sky, it's a bird, it's a plane, it's Superman!",
    createdAt: new Date('2022-10-26 20:15:20.008'),
    updatedAt: new Date('2022-10-26 20:15:20.008'),
  },
  {
    id: '5bbac4a1-b8d6-4be8-868b-03a8a2a4d395',
    nickname: 'Ryu',
    real_name: 'Ryu',
    origin_description:
      'Ryu has been the protagonist of the Street Fighter series since the first game and has appeared as a playable character in several crossover games involving the franchise',
    superpowers: 'fight in head, one shot, strong heart',
    catch_phrase: 'Let\'s team up! Ugh! · "Go for it!',
    createdAt: new Date('2022-10-26 20:15:20.008'),
    updatedAt: new Date('2022-10-26 20:15:20.008'),
  },
  {
    id: '50352569-7dcc-4e54-95d2-d2f8a0489fed',
    nickname: 'Sonic',
    real_name: 'Sonic',
    origin_description:
      'Sonic was created without the ability to swim because of a mistaken assumption by Yuji Naka that all hedgehogs could not do so',
    superpowers: 'speed, more speed, be cool',
    catch_phrase: 'Go go go!',
    createdAt: new Date('2022-10-26 20:15:20.008'),
    updatedAt: new Date('2022-10-26 20:15:20.008'),
  },
  {
    id: '3deba182-4766-4aa4-8a91-2478282dfa2e',
    nickname: 'Batmen',
    real_name: 'Bruce Wayne',
    origin_description:
      'After witnessing the murder of his parents Dr. Thomas Wayne and Martha Wayne as a child, he swore vengeance against criminals, an oath tempered by a sense of justice...',
    superpowers:
      "Omnipotence, Bane's Venom, Various Lantern Power Rings,Super Strength, Genie Magic, Echolocation",
    catch_phrase: "I'm Batman.",
    createdAt: new Date('2022-10-26 20:15:20.008'),
    updatedAt: new Date('2022-10-26 20:15:20.008'),
  },
  {
    id: 'd1a9523f-43c0-4eff-8232-c1f977d40aaa',
    nickname: 'Doctor Strange',
    real_name: 'Stephen',
    origin_description:
      "he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton's destruction...",
    superpowers:
      'Mastery of magic Utilizes mystical artifacts, such as the Cloak of Levitation and the Eye of Agamotto Genius-level intellect Skilled martial artist Gifted physician and surgeon',
    catch_phrase:
      'We Never Lose Our Demons, Mordo. We Only Learn To Live Above Them.',
    createdAt: new Date('2022-10-26 20:15:20.008'),
    updatedAt: new Date('2022-10-26 20:15:20.008'),
  },
  {
    id: 'f74f1bca-c70f-40eb-9245-2ed9b58bb003',
    nickname: 'Wanda',
    real_name: 'Scarlet',
    origin_description:
      'Wanda Maximoff was born in 1989 in Sokovia, Eastern Europe, unaware that she was born a witch and unknowingly engaging in basic hex magic...',
    superpowers: 'Magic',
    catch_phrase: 'You will',
    createdAt: new Date('2022-10-26 20:15:20.008'),
    updatedAt: new Date('2022-10-26 20:15:20.008'),
  },
];
