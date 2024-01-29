import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.get('api/user/infos', async (req) => {
    await delay(50);
    
    return new HttpResponse(
      JSON.stringify( {
        identifier:'Chauncey',
        orgName:"Tyria's heroes",
        email:'chauncey.vonsnuffles@divinitysreach.tyria',
        projectsNbr:'8', 
        timeZone:'America/New_York',
        Language:'en',
        Fullname:'@chauncey.vonsnuffles',
        JobTitle:'Developers'
      }),
      {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        
      },
    });
  }),

 

  // Vous pouvez ajouter d'autres handlers pour différentes routes API ici
];
