export  function TypeEffectiveness(primaryType, secondaryType) {
    const typeChart = {
      normal: { weak: ["fighting"], resistant: [], immune: ['ghost'] },
      fire: { weak: ['water', 'rock', 'ground'], resistant: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'] },
      water: { weak: ['electric', 'grass'], resistant: ['fire', 'water', 'ice', 'steel'] },
      electric: { weak: ['ground'], resistant: ['electric', 'flying', 'steel'] },
      grass: { weak: ['fire', 'ice', 'poison', 'flying', 'bug'], resistant: ['water', 'electric', 'grass', 'ground'] },
      ice: { weak: ['fire', 'fighting', 'rock', 'steel'], resistant: ['ice'] },
      fighting: { weak: ['flying', 'psychic', 'fairy'], resistant: ['bug', 'rock', 'dark'] },
      poison: { weak: ['ground', 'psychic'], resistant: ['fighting', 'poison', 'grass', 'fairy'] },
      ground: { weak: ['water', 'ice', 'grass'], resistant: ['poison', 'rock'], immune: ['electric'] },
      flying: { weak: ['electric', 'ice', 'rock'], resistant: ['fighting', 'bug', 'grass'] , immune: ['ground'] },
      psychic: { weak: ['bug', 'ghost', 'dark'], resistant: ['fighting', 'psychic'] },
      bug: { weak: ['fire', 'flying', 'rock'], resistant: ['fighting', 'ground', 'grass'] },
      rock: { weak: ['water', 'grass', 'fighting', 'ground', 'steel'], resistant: ['normal', 'fire', 'poison', 'flying'] },
      ghost: { weak: ['ghost', 'dark'], resistant: ['poison', 'bug'], immune: ['normal', 'fighting'] },
      dragon: { weak: ['ice', 'dragon', 'fairy'], resistant: ['fire', 'water', 'grass', 'electric'] },
      dark: { weak: ['fighting', 'bug', 'fairy'], resistant: ['ghost', 'dark'] },
      steel: { weak: ['fire', 'fighting', 'ground'], resistant: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'], immune: ["poison"] },
      fairy: { weak: ['poison', 'steel'], resistant: ['fighting', 'bug', 'dark'], immune: ['dragon'] },
    };
  
     const types = secondaryType ? [primaryType, secondaryType] : [primaryType];
  
      const obj = {};
      types.forEach((type) => {
        const typeEntry = typeChart[type];
  
        typeEntry.weak.forEach((weakType) => {
          if (!obj[weakType]) {
            obj[weakType] = 2;
          } else {
            obj[weakType]*=2;
          }
        });
        typeEntry.resistant.forEach((resistantType) => {
          if (!obj[resistantType]) {
            obj[resistantType] = (0.5)
          } else {
            obj[resistantType]*=0.5
          }
        });
        typeEntry.immune && typeEntry.immune.forEach((immuneType) => {
          if (!obj[immuneType]) {
            console.log("yeaaah")
            obj[immuneType] = 0;
          } else {
            console.log("babay")
            obj[immuneType]*=0;
          }
        });
        
      });
  
      return obj
    }
  
    const typeColorMap = {
        poison: '#934397',
        grass: '#72c232',
        water: '#3198f5',
        fire: '#c71b00',
        electric: '#f7c53c',
        rock: '#9e853a',
        ground: '#cdad50',
        steel: '#9292a2',
        flying: '#6982dd',
        fighting: '#5c1f0e',
        psychic: '#df2f69',
        bug: '#8a9703',
        dark: '#36291c',
        ghost: '#434494',
        fairy: '#f0b1f3',
        ice: '#6ed4f5',
        dragon: '#41318a',
        normal: '#8f8b80',
      };
    
      export const getTypeColor = (type) => type ? typeColorMap[type.toLowerCase()] || '#ffffff' :'#ffffff' 
